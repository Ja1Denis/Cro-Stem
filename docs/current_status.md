# Trenutni status - Cro-Stem

## Projektni podaci
- **Verzija**: 0.1.6
- **Jezik**: Rust (s Python vezivima via PyO3)
- **Točnost**: **97.41%** (Aggressive Mode, 10k corpus subset)
- **Licenca**: MIT OR Apache-2.0

## Ključne značajke
- **Ekstremna brzina**: Rust implementacija bez vanjskih ovisnosti (osim `lazy_static`).
- **Visoka preciznost**:
    - **99.0%** na glagolima (uključujući aorist i imperfekt).
    - **95.0%** na imenicama (podrška za nepostojano 'a', sibilarizaciju).
- **Dual-Mode**:
    - `Aggressive`: Za tražilice (maksimalno skraćivanje).
    - `Conservative`: Za lingvističku analizu (čuvanje značenja).
- **Dostupnost**:
    - **Crates.io**: `cargo add cro_stem`
    - **PyPI**: `pip install cro-stem`
    - **Web**: WASM demo na GitHub Pages.

## Zadaci u tijeku
- [x] Validacija na 1350 najtežih lingvističkih primjera.
- [x] Optimizacija za aorist i pluskvamperfekt.
- [ ] Implementacija napredne lematizacije za Conservative mode (trenutno ~64%).
- [ ] Ažuriranje WASM portala s novim 0.1.6 engineom.

## Postignuto (v0.1.6)
- **Dominacija na teškim primjerima**: Riješeni lingvistički "kamen spoticanja" kao što su `vrapca` <-> `vrabac`, `momka` <-> `momak`, `rekoh` <-> `reći`.
- **Integrirani HUD vizuali**: Dokumentacija sada jasno komunicira vrijednost kroz vizualni "Grand Slam Offer" stil.
- **Objavljeno svugdje**: Sinhronizirana objava na Rust i Python repozitorijima.

## Sljedeći koraci
1. **Conservative Mode Lematizacija**: Fokus na podizanje točnosti "Conservative" moda sa trenutnih 64% na >85% dodavanjem rječnika lema.
2. **WASM Update**: Kompajlirati novu verziju u WASM i pushati na `gh-pages` granu za live demo.
