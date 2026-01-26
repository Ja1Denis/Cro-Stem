# Strategija Komercijalizacije i Razvoja Premium Značajki za CroStem

Ovaj dokument skicira potencijalne smjerove razvoja projekta `cro_stem` iz čiste "Open Source" biblioteke u održiv komercijalni proizvod, inspiriran "Open Core" modelima uspješnih tvrtki poput Elastic-a.

## 1. Model: "Plati da budeš tajnovit" (Dual Licensing)
Ovo je temelj naše trenutne strategije (već implementirano prelaskom na AGPL).

*   **Open Source (AGPL-3.0):** Besplatno za korištenje u drugim Open Source projektima. "Viralna" licenca prisiljava korisnike da i njihov kod bude otvoren.
*   **Enterprise Licenca:** Za tvrtke koje žele koristiti CroStem u zatvorenom (proprietary) softveru, a ne žele javno objaviti svoj izvorni kod. Kupnjom ove licence dobivaju pravo korištenja bez AGPL ograničenja.

## 2. Model: "Zlatni Rječnik" (Algoritam vs. Podaci)
Trenutni CroStem je **algoritamski stemmer** (brz, lagan, matematički). Premium verzija bi nudila **lematizaciju** temeljenu na podacima.

*   **Core (Besplatno):** Stemming baziran na pravilima (suffix-stripping). Točnost ~92%. Savršeno za brze pretrage.
*   **Premium (CroStem Lemma):**
    *   Sadrži veliku, ručno kuriranu bazu (rječnik) od 500.000+ oblika.
    *   Omogućuje pravu lematizaciju (vraćanje na rječnički oblik):
        *   `ljudi` -> `čovjek` (algoritam ovo ne može bez rječnika)
        *   `išao` -> `ići`
    *   Vrijednost: Apsolutna preciznost za NLP analitiku, sentiment analizu i AI trening.

## 3. Model: "Ključ u ruke" (Integracije i Pluginovi)
Najveći potencijal za brzu monetizaciju na masovnom tržištu. Programeri vole biblioteke, ali vlasnici biznisa vole rješenja koja rade "odmah".

*   **WordPress / WooCommerce Plugin:**
    *   *Problem:* Pretraga na WP web shopovima je očajna za hrvatski jezik.
    *   *Rješenje:* Plugin koji se instalira jednim klikom, automatski "pročešlja" proizvode i omogući da kupac koji traži "stolice" nađe "stolicu".
    *   *Monetizacija:* Mjesečna ili godišnja pretplata (npr. 50€/godišnje).
*   **Elasticsearch / Solr Plugin:**
    *   Pre-kompajlirani, optimizirani binarni dodatak za sistemske administratore velikih sustava.

## 4. Model: "Specijalist" (Vertikalna tržišta)
Prilagodba alata za specifične industrije s kompliciranim vokabularom.

*   **Legal Pack (Odvjetništvo):** Optimiziran za pravni jezik, latinizme i arhaizme česte u ugovorima i zakonima.
*   **Medical Pack (Medicina):** Optimiziran za medicinsku terminologiju, latinske nazive bolesti i lijekova.
*   **Vrijednost:** U ovim industrijama greška u pretraživanju je skupa, pa su spremni platiti za specijaliziranu točnost.

## 5. Model: "Regionalna ekspanzija" (Balkan-Stem)
Hrvatski, srpski, bosanski i slovenski jezik su morfološki vrlo slični, što otvara put za dominaciju na cijelom regionalnom tržištu.

*   **Bosanski (Bos-Stem):** Odmah spreman (99% kompatibilnost).
*   **Srpski (Serb-Stem):** Potrebna implementacija podrške za ekavicu i ćirilicu. S obzirom na sličnost gramatike, ovo je "niskoviseće voće" za širenje baze korisnika.
*   **Slovenski (Slov-Stem):** Zahtjevniji projekt zbog dvojine (duala), ali rješiv specifičnim modulom pravila.
*   **Vrijednost:** Velike tvrtke koje posluju u regiji (Adria regija) traže jedinstveno rješenje za sve jezike.

---
**Zaključak:**
Cilj je zadržati `cro_stem` (Core) brzim, besplatnim i dostupnim svima, dok se napredne značajke (podaci, gotove integracije, regionalna podrška) nude kao nadogradnja onima koji na tome zarađuju novac.
