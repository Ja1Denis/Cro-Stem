# Dnevnik razvoja - Cro-Stem

## 2026-01-31 (Verzija 0.1.6)
- **Validacija na 10k korpusu**:
    - Uspješno testirano na korpusu od 1350 najtežih lingvističkih primjera (izvučeno iz većeg 10k seta).
    - Postignuta impresivna točnost od **97.41%** (Aggressive Mode).
    - Preciznost po kategorijama:
        - **Glagoli (Verbs)**: 99.0%
        - **Imenice (Nouns)**: 95.0%
        - **Pridjevi (Adjectives)**: 97.7%
- **Optimizacija algoritma**:
    - Dodana podrška za aorist i imperfekt (sufiksi `-osmo`, `-este`, `-oše`).
    - Riješeni rubni slučajevi za nepostojano 'a' (`vrabac` <-> `vrapca`, `momak` <-> `momka`).
    - Usavršena pravila sibilarizacije i palatalizacije.
    - Implementirana zaštita korijena za specifične riječi (`snijeg`, `misao`).
- **Dokumentacija i Marketing**:
    - Redizajniran `README.md` koristeći "Grand Slam Offer" pristup.
    - Generirana nova naslovna slika s HUD elementima koji prikazuju statistiku preciznosti.
    - Dodane značke (badges) za preuzimanja s PyPI i Crates.io.
- **Objava**:
    - Objavljena verzija **0.1.6** na **Crates.io** i **PyPI**.

## 2026-01-30
- **Plan poboljšanja v0.1.5+**: Kreiran detaljan plan za povećanje točnosti bez povećanja kompleksnosti.
- **Dokumentacija**: Uspostavljen `docs` folder sa `current_status.md`, `development_log.md` i `improvement_plan.md`.
- **v0.1.5 Implementacija**:
    - Dodan opsežan popis iznimaka u `src/lib.rs` (preko 50 novih riječi).
    - Implementirani zaštitni uvjeti za sufiks `-stvo` i superlative `naj-...-iji`.
    - Proširen `VOICE_RULES` s podrškom za nepostojano 'a' i vokalizaciju (topao, dobar, tjedan).
    - Uspješna validacija: Aggressive score na mješovitom korpusu (200 riječi) porastao za 31% relativno (sa 100 na 131).
    - **Validacija (1k korpus)**: Postignuta točnost od **96.5%** (Aggressive) nakon finog podešavanja glasovnih pravila i iznimaka.
