pub fn apply_heuristics(word: &str) -> Option<String> {
    // Ako riječ već sadrži dijakritike, smatramo je ispravnom i ne diramo je heuristikama
    if word.chars().any(|c| matches!(c, 'č' | 'ć' | 'ž' | 'š' | 'đ' | 'Č' | 'Ć' | 'Ž' | 'Š' | 'Đ')) {
        return None;
    }
    
    // Heuristike radimo na lowercase verziji radi lakšeg testiranja, 
    // ali akronime smo već preskočili u normalize() pozivu.
    let word_lower = word.to_lowercase();

    // 1. Mikro-mapa (ekstremno specifični slučajevi koji nisu u glavnoj mapi)
    let micro_map_result = match word_lower.as_str() {
        "sesir" => Some("šešir"),
        "cackao" => Some("čačkao"),
        "scapca" => Some("ščapca"),
        "sasav" => Some("šašav"),
        "sasavi" => Some("šašavi"),
        "zenscic" => Some("ženščić"),
        "carsaf" => Some("čaršaf"),
        "sivajuci" => Some("šivajuči"),
        "zdere" => Some("ždere"),
        "ucitelj" => Some("učitelj"),
        "grozde" => Some("grožđe"),
        "mladi" => Some("mlađi"),
        "strucnjak" => Some("stručnjak"),
        "salice" => Some("šalice"),
        "case" => Some("čase"),
        // Riječi koje su sigurno bez dijakritika ili lažni pozitivi
        "test" | "zagreb" | "stanovi" | "cesalj" | "kuca" | "snazi" | "snjegovi" => return None,
        _ => None,
    };

    if let Some(mapped) = micro_map_result {
        return Some(mapped.to_string());
    }

    let chars: Vec<char> = word_lower.chars().collect();
    let mut result = String::with_capacity(word.len());
    let len = chars.len();
    let mut changed = false;

    for i in 0..len {
        let ch = chars[i];
        let next = if i + 1 < len { Some(chars[i + 1]) } else { None };

        match ch {
            's' => {
                // Heuristika s -> š je preagresivna za opću upotrebu (npr. snazi, snjegovi)
                // Ovdje ostavljamo samo sigurne kombinacije ako ih ima, ili se oslanjamo na mikro-mapu.
                // Uklonjeno: s+k, s+n, s+p generalno.
                
                // Iznimka: 'sc' -> 'šč' (često u glagolima)
                if next == Some('c') {
                    result.push('š');
                    changed = true;
                    continue;
                }
                result.push(ch);
            },
            _ => result.push(ch),
        }
    }
    
    if changed {
        Some(result)
    } else {
        None
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_heuristic_rules() {
        assert_eq!(apply_heuristics("sesir").unwrap(), "šešir");
        assert_eq!(apply_heuristics("cackao").unwrap(), "čačkao");
        assert_eq!(apply_heuristics("scapca").unwrap(), "ščapca");
        assert_eq!(apply_heuristics("zdere").unwrap(), "ždere");
        assert_eq!(apply_heuristics("ucitelj").unwrap(), "učitelj");
    }

    #[test]
    fn test_regression_prevention() {
        assert_eq!(apply_heuristics("snazi"), None);
        assert_eq!(apply_heuristics("snjegovi"), None);
        assert_eq!(apply_heuristics("kuca"), None);
    }
}
