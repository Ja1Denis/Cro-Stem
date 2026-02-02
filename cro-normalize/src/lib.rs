pub mod normalizer;
pub mod heuristics;

use std::borrow::Cow;
use std::ffi::{CStr, CString};
use std::os::raw::c_char;

/// Glavna funkcija za normalizaciju dijakritika.
/// Kombinira statičku mapu (phf) i heuristička pravila.
pub fn normalize(word: &str) -> Cow<str> {
    // 1. Provjera u statičkoj mapi (phf) - Mapa koristi mala slova
    let lowercase_word = word.to_lowercase();
    if let Some(mapped) = normalizer::get_diacritic_mapping(&lowercase_word) {
        return Cow::Borrowed(mapped);
    }

    // 2. Primjena heurističkih pravila
    if let Some(heuristic_word) = heuristics::apply_heuristics(word) {
        return Cow::Owned(heuristic_word);
    }

    // 3. Ako je riječ akronim (sva velika slova, dužina > 1), ne pretvaraj u mala slova
    // jer stemmer i testovi (foreign category) očekuju All-Caps (npr. IT, EU)
    if word.len() > 1 && word.chars().all(|c| c.is_uppercase() && c.is_alphabetic()) {
        return Cow::Borrowed(word);
    }

    // 4. Ako ništa nije pronađeno, vrati lowercase za stemmanje
    Cow::Owned(lowercase_word)
}

#[no_mangle]
pub extern "C" fn normalize_c(word: *const c_char) -> *mut c_char {
    let c_str = unsafe {
        assert!(!word.is_null());
        CStr::from_ptr(word)
    };

    let r_str = c_str.to_str().unwrap();
    let normalized_str = normalize(r_str);
    
    let c_str_normalized = CString::new(normalized_str.as_ref()).unwrap();
    c_str_normalized.into_raw()
}

#[no_mangle]
pub extern "C" fn free_string(s: *mut c_char) {
    if s.is_null() {
        return;
    }
    unsafe {
        let _ = CString::from_raw(s);
    }
}
