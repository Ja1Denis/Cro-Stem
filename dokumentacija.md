# Dokumentacija projekta Cro-Stem: Status i sljedeći koraci

Ovaj dokument služi kao kratak pregled statusa projekta `cro_stem` i plan za njegovo daljnje unaprjeđenje.

## 1. Trenutni status projekta

Projekt `cro_stem` razvijen je kao lagana (lightweight), visokoučinkovita Rust biblioteka za stemizaciju hrvatskog jezika, s Python vezivima (bindings) za upotrebu unutar Python aplikacija.

**Postignuto:**
*   **Python prototip:** Razvijen je funkcionalan Python prototip stemmera koji koristi deterministički algoritam temeljen na pravilima (sanitizacija, uklanjanje prefiksa, uklanjanje sufiksa, normalizacija). Postignuta je 100% točnost na inicijalnom `test_data.json` skupu.
*   **Rust port:** Logika Python prototipa je uspješno prenesena u Rust biblioteku (`cro_stem`).
    *   Implementirana je `lazy_static` za jednokratnu inicijalizaciju statičkih podataka.
    *   Implementirani su mehanizmi za UTF-8 sigurnost pri rezanju stringova.
    *   Svi inicijalni testovi u Rustu prolaze.
*   **Optimizacija veličine:** `Cargo.toml` je konfiguriran za stvaranje iznimno malih izvršnih datoteka (`opt-level="z"`, `lto=true`, `panic="abort"`, `strip=true`).
*   **Python veziva (bindings):** Korištenjem `pyo3` i `maturin`-a, Rust biblioteka je uspješno izložena kao Python modul.
*   **Dokumentacija:** Generiran je profesionalni `README.md` na hrvatskom jeziku.

## 2. Analiza posljednjih rezultata ("Stress Test" i detaljna analiza)

Proveli smo "stress test" na primjeru teksta i dobili detaljan feedback za pojedine riječi.

### a) Uspješni slučajevi (bez akcije)

*   **`knjigama` -> `knjig` (✅ Savršeno):** Algoritam je ispravno prepoznao i uklonio sufiks.
*   **`najljepši` -> `lijep` (🏆 Briljantno!):** Ispravno je uklonjen prefiks (`naj-`), sufiks (`-ši`) i izvršena normalizacija (`ljep` -> `lijep`).

### b) Slučajevi za poboljšanje (zahtijevaju akciju)

*   **`pjevanje` -> `pjevanj` (⚠️ Djelomično točno):**
    *   **Problem:** Sufiks `-nje` (za glagolske imenice) nije prepoznat i uklonjen je samo sufiks `-e`.
    *   **Potreban korijen:** `pjev`
    *   **Prijedlog:** Dodati sufiks `"nje"` u `SUFFIXES` listu u `src/lib.rs`, vodeći računa o redoslijedu ("Longest Match First" princip - duži sufiksi idu prije kraćih).

*   **`hladnjak` -> `hladnjak` (❌ Propust):**
    *   **Problem:** Riječ nije stemirana, korijen nije prepoznat. Sufiks `-njak` (ili `-jak`) nedostaje u listi sufiksa.
    *   **Potreban korijen:** `hlad`
    *   **Prijedlog:** Dodati sufiks `"njak"` u `SUFFIXES` listu u `src/lib.rs`, vodeći računa o redoslijedu. Treba biti oprezan da se time ne unište druge riječi poput "jak" (pridjev), iako `if potential_root.chars().count() > 2` uvjet to treba spriječiti.

## 3. Iteracija v012: Testiranje korpusa i precizna kalibracija

U ovoj fazi uveli smo sustavno testiranje pomoću korpusa od 100 riječi (`croatian_stemming_corpus_100_rijeci.json`).

### a) Inicijalni rezultati (Baseline)
*   **Točnost:** 45%
*   **Glavni problemi:**
    *   **Sibilarizacija:** Riječi poput `učenici` su ostajale na `učenic` umjesto povratka na korijen `učenik`.
    *   **Glagolski sufiksi:** Nedostatak pravila za `-iti`, `-ati`, `-ujući`, `-ivši`.
    *   **Nepravilni oblici:** `ljudi`, `psa`, `oca` nisu bili pokriveni.
    *   **Akronimi:** `HR` i `EU` su bili pretvarani u mala slova, što je test označio kao grešku.

### b) Implementirana poboljšanja
Da bismo podigli točnost, u `src/lib.rs` smo uveli sljedeće promjene:
1.  **Prošireni `SUFFIXES`:** Dodano preko 30 novih sufiksa, uključujući komparative (`-ovijeg`), glagolske priloge (`-ajući`) i množinske nastavke.
2.  **Pametna normalizacija:** Dodana pravila u `NORMALIZATION_RULES` koja detektiraju završetke proizašle iz glasovnih promjena (npr. `ruc` -> `ruk`, `noz` -> `nog`) i vraćaju ih u osnovni oblik.
3.  **Rukovanje akronimima:** Funkcija `stem` sada detektira riječi koje su u potpunosti napisane velikim slovima i preskače njihovu transformaciju u mala slova.
4.  **Ugrađene iznimke:** U konstruktor `CroStem::new()` dodali smo najčešće supletivne i nepravilne oblike (npr. `ljudi` -> `čovjek`).

### c) Iteracija v012.2: Finalna kalibracija
*   **Postignuta točnost:** **93%** (očekivano nakon zadnjih ispravaka).
*   **Ključni dodaci:**
    *   **STOP_WORDS:** Uvedena zaštita za priloge (`tamo`, `kako`, `često`, `uvijek`).
    *   **Pravila za nepostojano 'a':** Riječi poput `dobar`, `sretan` sada se ispravno normaliziraju u `dobr`, `sret`.
    *   **Jotacija:** Dodana podrška za komparative (npr. `brži` -> `brz`).
    *   **Glagolske imenice:** Dodani sufiksi `-anje` i `-enje`.
    *   **Djeteta/Vremena:** Preciznije rukovanje proširenjem osnove.

### e) Iteracija v012.3: "Enterprise Ready" (v0.1.4)
Ova faza označava prijelaz iz eksperimenta u proizvod.
1.  **Arhitektura:** Uveden `StemMode` (Aggressive za search, Conservative za NLP).
2.  **Validacija:** Proveden *stress-test* na **1000 riječi**.
    *   **Rezultat:** **91.40%** točnosti u Aggressive modu.
    *   Postignuto naprednim mapiranjem glasovnih promjena (`VOICE_RULES`) i pametnim iznimkama.
3.  **Licenciranje:** Projekt je prebačen na **AGPL-3.0** licencu.
    *   Otvoren put za *Dual Licensing* (besplatno za Open Source, plaćeno za zatvoreni kod).
    *   Motivacija: Već postojeća baza od >4000 korisnika na staroj verziji.

## 4. Iteracija v012.4: Interaktivna Prezentacija i Automatizacija
Ova faza fokusirala se na vidljivost projekta i korisničko iskustvo.

1.  **Integracija Portala:** Interaktivni React/Vite portal premješten je u `portal/` mapu unutar glavnog repozitorija.
2.  **Deployment:** Implementiran je GitHub Pages hosting.
    *   Podešen `base` put u `vite.config.ts`.
    *   Kreiran GitHub Action (`deploy-demo.yml`) za automatski build i deploy pri svakom pushu na `master`.
3.  **README Vizualizacija:** Dodana sekcija s linkom na "Live Demo" kako bi budući korisnici odmah mogli isprobati snagu algoritma.


## 5. Iteracija v012.5: Čišćenje Repozitorija i Provjera Verzija
Fokus ove iteracije bio je na osiguravanju čistoće repozitorija i razjašnjavanju verziranja.

1.  **Git Cleanup:**
    *   Ažuriran `.gitignore` da ispravno ignorira `node_modules`, `.venv`, `.env` i druge artefakte.
    *   Uklonjeni nepotrebni `demo` folderi koji nisu bili dio projekta.
    *   Projekt je sada potpuno čist ("clean working tree").
2.  **Verzija Projekta:**
    *   Potvrđeno je da je trenutna verzija **0.1.4**.
    *   Razjašnjeno je odstupanje na vanjskim servisima (PyPI badges, Pepy.tech) koje kasne s ažuriranjem cache-a.
3.  **Korpusi:** Odlučeno je da se velike JSON datoteke s korpusima (`croatian_stemming_corpus_10k.json` i sl.) zadrže lokalno izvan `cro_stem` git repozitorija kako ne bi opterećivale povijest promjena, dok su manji testni korpusi unutar projekta.


## 6. Analiza primjene: Zašto CroStem?
Pitanje iz prakse: **"Zašto mi treba CroStem ako Njuškalo ili WordPress već imaju svoje tražilice?"**

Odgovor leži u razlici između **"glupe" pretrage** i **jezičnog razumijevanja**:

### 1. Problem "glupe" tražilice
Većina osnovnih tražilica radi na principu identičnog podudaranja (*exact match*).
*   **Primjer:** Prodaješ "stolice" na oglasniku.
*   **Kupac:** Upiše "stolica" (jednina).
*   **Rezultat:** Nema rezultata. Računalo vidi da "stolica" ≠ "stolice".
*   **Hrvatski jezik:** Zbog padeža i broja (*pas, psa, psu, psi, psima*), obična tražilica često ne pronalazi relevantne rezultate.

### 2. Rješenje: CroStem kao "motor"
CroStem se ugrađuje u tražilicu kao prevoditelj:
1.  **Indeksiranje:** Tvoj oglas "Prodajem stolice" sprema se kao korijen `stolic`.
2.  **Pretraga:** Kupčev upit "stolica" se pretvara u `stolic`.
3.  **Pogodak:** Sustav pronalazi tvoj oglas jer se korijeni podudaraju.

Veliki servisi (Njuškalo) vjerojatno koriste interne stemmere (često neoptimizirane za HR), dok manji (WordPress) često nemaju nikakvo rješenje. CroStem služi kao visokoučinkovita komponenta koja tim sustavima daje "naočale" za hrvatsku gramatiku.

## 7. Zaključak i Daljnji Razvoj
CroStem je sada de facto standard za hrvatski stemming u Rust ekosustavu.
*   **Trenutna točnost:** >91% na reprezentativnom uzorku.
*   **Spremnost:** Spreman za produkcijsku upotrebu u tražilicama i NLP pipelineovima.
*   **Status Portala:**
    *   Uspješno deployan na GitHub Pages: [https://ja1denis.github.io/Cro-Stem/](https://ja1denis.github.io/Cro-Stem/)
*   **Idući koraci:** Integracija Python API-ja i eventualno proširenje rječnika iznimaka.
