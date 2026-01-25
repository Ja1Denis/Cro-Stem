
import { StemMode } from '../types';

/**
 * Mock stemming logic for demonstration purposes.
 * Simulates different stemming outcomes based on mode and rules.
 */
export const stemWord = (word: string, mode: StemMode): { stemmed: string, time: number } => {
  const startTime = performance.now();
  
  const normalized = word.trim().toLowerCase();
  
  // Specific mappings for the demo
  const mappings: Record<string, { aggressive: string, conservative: string }> = {
    'knjigama': { aggressive: 'knjig', conservative: 'knjiga' },
    'pjevajući': { aggressive: 'pjev', conservative: 'pjev' },
    'balkanski': { aggressive: 'balkan', conservative: 'balkansk' },
    'umiremo': { aggressive: 'umir', conservative: 'umir' },
    'vremena': { aggressive: 'vrem', conservative: 'vremen' },
    'programiranje': { aggressive: 'program', conservative: 'program' },
    'hrvatski': { aggressive: 'hrvat', conservative: 'hrvat' }
  };

  let stemmed = '';
  
  if (mappings[normalized]) {
    stemmed = mappings[normalized][mode];
  } else {
    // Basic mock suffix removal if not in dictionary
    if (normalized.length > 4) {
      const suffixes = mode === StemMode.AGGRESSIVE ? 3 : 2;
      stemmed = normalized.slice(0, -suffixes);
    } else {
      stemmed = normalized;
    }
  }

  const endTime = performance.now();
  const time = parseFloat((endTime - startTime).toFixed(3));
  
  return { stemmed, time };
};

export const processBulk = (text: string, mode: StemMode): { results: Array<{original: string, stemmed: string}>, time: number, count: number } => {
  const startTime = performance.now();
  const words = text.split(/\s+/).filter(w => w.length > 0);
  
  const results = words.map(w => ({
    original: w,
    stemmed: stemWord(w, mode).stemmed
  }));
  
  const endTime = performance.now();
  return {
    results,
    time: parseFloat((endTime - startTime).toFixed(2)),
    count: words.length
  };
};
