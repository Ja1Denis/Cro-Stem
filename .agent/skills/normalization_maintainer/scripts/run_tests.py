
import json
import ctypes
import os
import sys

# Define base paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__)) # .agent/skills/normalization_maintainer/scripts
PROJECT_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, '../../../../')) # E:\G\GeminiCLI\ai-test-project\CroStem_v012

def run_tests():
    # DLL Path
    dll_path = os.path.join(PROJECT_ROOT, 'cro-normalize', 'target', 'release', 'cro_normalize.dll')
    
    if not os.path.exists(dll_path):
        print(f"Error: DLL not found at {dll_path}")
        print("Please compile: cd cro-normalize && cargo build --release")
        return False

    lib = ctypes.CDLL(dll_path)
    lib.normalize_c.argtypes = [ctypes.c_char_p]
    lib.normalize_c.restype = ctypes.c_void_p
    lib.free_string.argtypes = [ctypes.c_void_p]
    lib.free_string.restype = None
    
    # Corpus Path
    corpus_path = os.path.join(PROJECT_ROOT, 'normalization_corpus.json')
    if not os.path.exists(corpus_path):
        print(f"Error: Corpus not found at {corpus_path}")
        return False

    with open(corpus_path, 'r', encoding='utf-8') as f:
        corpus = json.load(f)

    correct = 0
    failed = []

    for item in corpus:
        inp = item['input']
        expected = item['expected']
        
        res_ptr = lib.normalize_c(inp.encode('utf-8'))
        res_str = ctypes.cast(res_ptr, ctypes.c_char_p).value.decode('utf-8')
        lib.free_string(res_ptr)

        if res_str == expected:
            correct += 1
        else:
            failed.append({'input': inp, 'expected': expected, 'got': res_str})

    total = len(corpus)
    acc = (correct / total) * 100 if total > 0 else 0
    print(f"Normalization Accuracy: {acc:.2f}% ({correct}/{total})")
    
    if failed:
        print("Failed Examples:")
        for f in failed:
            print(f"  {f['input']} -> Expected: {f['expected']}, Got: {f['got']}")
        return False
    
    print("All tests passed!")
    return True

if __name__ == "__main__":
    success = run_tests()
    if not success:
        sys.exit(1)
