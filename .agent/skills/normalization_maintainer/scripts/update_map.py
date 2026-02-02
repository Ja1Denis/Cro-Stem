
import json
import os
import sys

# Define base paths relative to the script location
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__)) # .agent/skills/normalization_maintainer/scripts
PROJECT_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, '../../../../')) # E:\G\GeminiCLI\ai-test-project\CroStem_v012

def remove_diacritics(text):
    mapping = {
        'č': 'c', 'ć': 'c', 'š': 's', 'ž': 'z', 'đ': 'd',
        'Č': 'C', 'Ć': 'C', 'Š': 'S', 'Ž': 'Z', 'Đ': 'D'
    }
    result = ""
    for char in text:
        result += mapping.get(char, char)
    return result

def load_json(path):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Warning: {path} not found.")
        return []

def generate_rust_code():
    # 1. Load Data
    main_corpus_path = os.path.join(PROJECT_ROOT, 'croatian_stemming_corpus_10_tisuca.json')
    manual_corpus_path = os.path.join(PROJECT_ROOT, 'normalization_corpus.json')
    
    main_data = load_json(main_corpus_path)
    manual_data = load_json(manual_corpus_path)
    
    map_entries = {}
    
    # Process Main Corpus
    corpus_list = main_data.get('test_corpus', []) if isinstance(main_data, dict) else main_data
    for item in corpus_list:
        original = item.get('original', '').strip()
        if not original: continue
        if any(c in "čćšžđČĆŠŽĐ" for c in original):
            ascii_version = remove_diacritics(original).lower()
            target = original.lower()
            map_entries[ascii_version] = target

    # Process Manual Corpus (Overrides)
    for item in manual_data:
        inp = item['input'].lower()
        expected = item['expected'].lower()
        if inp != expected:
            map_entries[inp] = expected
            
    sorted_keys = sorted(map_entries.keys())
    
    rust_code = "static DIACRITIC_MAP: phf::Map<&'static str, &'static str> = phf_map! {\n"
    for key in sorted_keys:
        rust_code += f'    "{key}" => "{map_entries[key]}",\n'
    rust_code += "};\n"
    
    return rust_code

def update_normalizer_file(new_map_block):
    target_path = os.path.join(PROJECT_ROOT, 'cro-normalize', 'src', 'normalizer.rs')
    
    try:
        with open(target_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except FileNotFoundError:
        print(f"Error: Could not find {target_path}")
        return

    # Stitching logic
    # Find Header (up to usage of phf_map)
    header = "".join(lines[:4]) # Keep the imports and comments at top
    
    # Find Footer (start of DIALECT_MAP)
    footer_start_idx = -1
    for i, line in enumerate(lines):
        if "static DIALECT_MAP" in line:
            # Look back for comments
            footer_start_idx = i
            if i > 0 and "// Mapa za preslikavanje" in lines[i-1]:
                footer_start_idx = i - 1
                if i > 1 and lines[i-2].strip() == "":
                    footer_start_idx = i - 2
            break
            
    if footer_start_idx == -1:
        print("Error: Could not find DIALECT_MAP in normalizer.rs. Cannot safely stitch.")
        return

    footer = "".join(lines[footer_start_idx:])
    
    new_content = header + "\n" + new_map_block + "\n" + footer
    
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated {target_path} with {new_map_block.count('=>')} rules.")

if __name__ == "__main__":
    print("Generating map from corpus...")
    new_map = generate_rust_code()
    print("Updating Rust source...")
    update_normalizer_file(new_map)
