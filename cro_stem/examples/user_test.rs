use cro_stem::{CroStem, StemMode};

fn main() {
    println!("--- Cro-Stem Normalization & Stemming Test (User Sentences) ---");
    let stemmer = CroStem::new(StemMode::Aggressive);

    let sentences = vec![
        "Sesir zutog scapca cuci kraj koscate guscerice sto zdere suseno grozde.",
        "Jucer je scapavi ucitelj cesto cackao sljive, zvacuci secer i cesce pricajuci o zescim nocnim kisama.",
        "Ucenici su cerupali ceserke s guscerim zbunja dok su suskale jeze i miseve medu cuskijama.",
        "Senoloski strucnjak cesce cisti zlicice, salice i case koje jucer jos nisu bile ciste.",
        "Cesto cemo slusati zalosne price o sumskom cudovistu sto zvace zireve i sisarke.",
        "Gradevinski strucnjaci ocerupali su zbunje, cistili zlijebove i cesce provjeravali cvrstocu zice.",
        "Sasavi zenscic je jucer jos cesce cistio carsaf, sivajuci zutim koncem kroz scepanac.",
        "Mladi ucitelj objasnjava cesce kako se grozde bere, zito zanje i secerna repa cupa.",
        "Zalosni scapavi misic je zderao zir i secer sto mu je ucitelj cesto cuvao u scepanucu.",
        "Cesce cemo cistiti zlicice, salice i casice koje zute od secera sto ga jos jucer nismo oprzili",
        "Jucer sam u maloj knjiznici posudio zbirku prica i brzo je procitao do kraja tjedna.",
        "Susjed je rano ujutro popravljao zahrdalu bravu na zeljeznim vratima i pritom se stalno mrstio.",
        "Uciteljica je zamolila ucenike da u biljeznicu zapisu kratku biljesku o zimskim kisama.",
        "Na trznici su se nudili svjezi cesnjak, susene sljive i zuto grozde iz obliznjeg vinograda.",
        "Dok je puhnuo hladan vjetar, djevojcica je navukla sivi sako i svezala vezice na cizmama.",
        "Vozac je pazljivo zaobisao usku ulicicu jer je asfalt bio ostecen i sklizak od blata.",
        "Na izletu smo skuhali gulas, narezali svjezi kruh i zacinili rucak ciliem i cesnjakom.",
        "Znanstvenik je proucavao ucinke sunceva zracenja i biljezio zapazanja u cvrstoj biljeznici.",
        "U zurbi sam zaboravio kljuceve, pa sam morao cekati da mi susjeda otkljuca vrata.",
        "Nakon duge setnje kroz sumu, culi smo sustanje jeza i vidjeli zabu kraj potoka.",
    ];

    println!("{:<40} | {:<40} | {:<20}", "Normalized Sentence", "Stemmed Roots", "Status");
    println!("{:-<40}-|-{:-<40}-|-{:-<20}", "", "", "");

    for sentence in sentences {
        // Remove punctuation for normalization test
        let clean_sentence = sentence.replace(",", "").replace(".", "").replace("!", "").replace("?", "");
        let words: Vec<&str> = clean_sentence.split_whitespace().collect();
        
        let mut normalized_words = Vec::new();
        let mut stemmed_words = Vec::new();

        for word in words {
            let normalized = cro_normalize::normalize(word);
            normalized_words.push(normalized.to_string());
            stemmed_words.push(stemmer.stem(word));
        }

        let normalized_sentence = normalized_words.join(" ");
        let stemmed_sentence = stemmed_words.join(" ");

        // Simple check: does it contain diacritics now?
        let has_diacritics = normalized_sentence.chars().any(|c| matches!(c, 'č' | 'ć' | 'ž' | 'š' | 'đ'));
        let status = if has_diacritics { "OK (Restored)" } else { "FAILED?" };

        println!("{:<40} | {:<40} | {:<20}", 
            if normalized_sentence.chars().count() > 37 { format!("{}...", normalized_sentence.chars().take(37).collect::<String>()) } else { normalized_sentence.clone() },
            if stemmed_sentence.chars().count() > 37 { format!("{}...", stemmed_sentence.chars().take(37).collect::<String>()) } else { stemmed_sentence.clone() },
            status
        );
        
        // Detailed check for specific words that user pointed out
        if sentence.contains("sljive") || sentence.contains("secer") || sentence.contains("zvacuci") {
             println!("   [DETAIL] word 'sljive' -> {}", cro_normalize::normalize("sljive"));
             println!("   [DETAIL] word 'secer' -> {}", cro_normalize::normalize("secer"));
             println!("   [DETAIL] word 'zvacuci' -> {}", cro_normalize::normalize("zvacuci"));
        }
    }
}
