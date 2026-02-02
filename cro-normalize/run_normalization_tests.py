
import json
import ctypes
import os

def run_tests():
    # Putanja do DLL-a - relativno od skripte
    script_dir = os.path.dirname(os.path.abspath(__file__))
    dll_path = os.path.join(script_dir, 'target', 'release', 'cro_normalize.dll')
    
    # Provjera postoji li DLL
    if not os.path.exists(dll_path):
        print(f"Error: DLL not found at {dll_path}")
        print("Please compile the Rust library first using 'cargo build --release'")
        return

    # Učitavanje DLL-a
    lib = ctypes.CDLL(dll_path)

    # Definiranje argumenata i povratnih vrijednosti funkcija
    # normalize_c(word: *const c_char) -> *mut c_char
    lib.normalize_c.argtypes = [ctypes.c_char_p]
    lib.normalize_c.restype = ctypes.c_void_p  # Vraćamo pointer

    # free_string(s: *mut c_char)
    lib.free_string.argtypes = [ctypes.c_void_p]
    lib.free_string.restype = None

    # Putanja do corpusa - relativno od skripte, ali idemo jedan direktorij gore
    corpus_path = os.path.join(script_dir, '..', 'normalization_corpus.json')
    
    if not os.path.exists(corpus_path):
        print(f"Error: Corpus file not found at {corpus_path}")
        return

    with open(corpus_path, 'r', encoding='utf-8') as f:
        corpus = json.load(f)

    correct_predictions = 0
    failed_examples = []

    for item in corpus:
        input_word = item['input']
        expected_word = item['expected']

        # Pretvaranje u bytes za C
        input_bytes = input_word.encode('utf-8')

        # Pozivanje C funkcije
        result_ptr = lib.normalize_c(input_bytes)
        
        # Pretvaranje rezultata (pointera) natrag u Python string
        result_str = ctypes.cast(result_ptr, ctypes.c_char_p).value.decode('utf-8')

        if result_str == expected_word:
            correct_predictions += 1
        else:
            failed_examples.append({
                "input": input_word,
                "expected": expected_word,
                "got": result_str
            })

        # OSLOBAĐANJE MEMORIJE!
        lib.free_string(result_ptr)

    total_items = len(corpus)
    accuracy = (correct_predictions / total_items) * 100 if total_items > 0 else 0

    print(f"Točnost normalizacije: {accuracy:.2f}% ({correct_predictions}/{total_items})")

    if failed_examples:
        print("\nNeuspjeli primjeri:")
        for example in failed_examples:
            print(f"  - Ulaz: '{example['input']}', Očekivano: '{example['expected']}', Dobiveno: '{example['got']}'")

if __name__ == "__main__":
    run_tests()
