# Dnevnik razvoja - Cro-Stem

## 2026-01-31 (Verzija 0.1.7 RC - NLP Integrations)
- **Tantivy Integracija**:
    - Razvijen `CroStemFilter` i `CroStemTokenizer` za Tantivy ekosustav.
    - Implementiran `TokenStream` omotač koji podržava stemiranje u realnom vremenu unutar search pipelinea (Tantivy API v0.3).
- **Napredna Normalizacija**:
    - Implementiran PHF-bazirani normalizator za vraćanje dijakritika (`zivot` -> `život`).
    - Dodana podrška za mapiranje dijalekata (Ekavica/Ikavica -> Ijekavica).
    - Identificiran problem skalabilnosti statičkih mapa i kreiran **hibridni plan (Mapa + Pravila)**.
- **Demo Platforma**:
    - Izrađen moderni React Playground (WASM + Tailwind).
    - Implementirana real-time vizualizacija procesa: Original -> Normalized -> Stem.
    - Dodana statistika performansi u mikrosekundama (us).
- **Verzija**: Bump na **v0.1.7 RC** i push na `feat/nlp-integrations`.

## 2026-01-31 (Verzija 0.1.6)
- **Validacija na 10k korpusu**:
    - Uspješno testirano na korpusu od 1350 najtežih lingvističkih primjera.
    - Postignuta impresivna točnost od **97.41%** (Aggressive Mode).
- **Optimizacija algoritma**:
    - Podrška za aorist i imperfekt.
    - Riješeni rubni slučajevi za nepostojano 'a' (vrabac -> vrapca).
- **Objava**: Objavljena verzija 0.1.6 na Crates.io i PyPI.

## 2026-01-30
- **Plan poboljšanja v0.1.5+**: Kreiran detaljan plan za povećanje točnosti.
- **Dokumentacija**: Uspostavljen `docs` folder.
- **v0.1.5 Implementacija**: Proširen popis iznimaka i glasovnih pravila.
