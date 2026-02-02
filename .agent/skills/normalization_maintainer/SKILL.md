---
name: Normalization Maintainer
description: Agent responsible for maintaining implementation and testing of the Normalization module.
---

# Normalization Maintainer Skill

This skill allows you to autonomously maintain the accuracy of the Cro-Stem normalization module. It manages the corpus, updates the Rust maps, and verifies changes.

## Capabilities

1.  **Add New Word**: Adds a new (input -> expected) pair to the test corpus.
2.  **Verify Accuracy**: Runs the test suite against the corpus.
3.  **Auto-Fix**: Automatically regenerates the Rust `DIACRITIC_MAP` from the corpus to fix regressions or missing coverage.

## Operations

### 1. Add Word & Fix
To add a new word to the normalization logic (e.g., user reported "cesalj" -> "češalj"):

1.  Read `normalization_corpus.json` in the project root.
2.  Append the new JSON object `{"input": "cesalj", "expected": "češalj"}`.
3.  Execute `python .agent/skills/normalization_maintainer/scripts/update_map.py` to regenerate `normalizer.rs`.
4.  Execute `python .agent/skills/normalization_maintainer/scripts/run_tests.py` to verify 100% accuracy.
5.  Rebuild: `cargo build --release` in `cro-normalize` and `wasm-pack build --target web --out-dir playground/cro_stem` in `cro_stem`.

### 2. Verify Status
To just check if everything is working:

1.  Run `python .agent/skills/normalization_maintainer/scripts/run_tests.py`

## File Structure

- `scripts/update_map.py`: Reads `normalization_corpus.json` and updates `cro-normalize/src/normalizer.rs`.
- `scripts/run_tests.py`: Python script wrapping the Rust DLL to run tests.
