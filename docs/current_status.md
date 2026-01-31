# Trenutni status - Cro-Stem

## Projektni podaci
- **Verzija**: 0.1.7 (Release Candidate)
- **Jezik**: Rust (s Python vezivima via PyO3)
- **Točnost**: **97.41%** (Aggressive Mode, 10k corpus subset)
- **Licenca**: MIT OR Apache-2.0

## Ključne značajke
- **Ekstremna brzina**: Rust implementacija bez vanjskih ovisnosti (osim `lazy_static` i `phf`).
- **NLP Integracija**:
    - **Tantivy**: Izvorni `TokenFilter` za jedan od najbržih Rust search enginea.
    - **Normalizer**: Vraćanje dijakritika ("šišana" latinica) i mapiranje dijalekata (ekavica/ikavica).
- **Visoka preciznost**:
    - **99.0%** na glagolima (uključujući aorist i imperfekt).
    - **95.0%** na imenicama (podrška za nepostojano 'a', sibilarizaciju).
- **Dostupnost**: WASM Playground s real-time vizualizacijom obrade.

## Zadaci u tijeku (v0.1.7 NLP Integrations)
- [x] Tantivy TokenFilter integracija.
- [x] PHF Normalizer (dijakritici + dijalekti).
- [x] Cro-Stem 2.0 Playground (React + WASM).
- [ ] Implementacija **Hibridne Normalizacije** (Mapa + Pravila) prema [planu](./hybrid_normalization_plan.md).

## Postignuto u ovoj sesiji
- **Tantivy Ready**: Cro-Stem se sada može koristiti kao nativni filter u Tantivy tražilicama.
- **WASM 2.0**: Potpuno funkcionalan web demo sa statistikom brzine u mikrosekundama.
- **NLP Pipeline**: Postavljen temelj za normalizaciju unosa prije stemiranja.

## Sljedeći koraci
1. **Hibridna Normalizacija**: Zamjena statičke mape hibridnim sustavom (Mapa + Pravila) za >90% pokrivenost jezika uz minimalnu veličinu WASM-a.
2. **PyPI/Crates v0.1.7 Release**: Objava stabilne verzije s NLP podrškom.
