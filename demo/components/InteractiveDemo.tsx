
import React, { useState, useEffect, useMemo } from 'react';
import { StemMode } from '../types';
import { stemWord } from '../services/stemmer';

const EXAMPLES = ['pjevajući', 'balkanski', 'umiremo', 'vremena', 'programiranje', 'hrvatski'];

const InteractiveDemo: React.FC = () => {
  const [word, setWord] = useState('knjigama');
  const [mode, setMode] = useState<StemMode>(StemMode.AGGRESSIVE);
  const [debouncedWord, setDebouncedWord] = useState(word);

  // Debounce logic for smoother typing experience
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedWord(word);
    }, 150);
    return () => clearTimeout(handler);
  }, [word]);

  const { stemmed, time } = useMemo(() => stemWord(debouncedWord, mode), [debouncedWord, mode]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
      {/* Input Panel */}
      <div className="glass p-8 rounded-2xl flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-6">Input Word</h3>
          <div className="space-y-6">
            <div className="relative group">
              <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Upiši riječ..."
                className="w-full bg-[#0d1117] border border-gray-700 rounded-xl px-4 py-4 text-xl focus:outline-none focus:border-blue-500 transition-colors"
                aria-label="Word to stem"
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">Real-time</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-400">Processing Mode</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setMode(StemMode.AGGRESSIVE)}
                  className={`px-4 py-3 rounded-xl border transition-all ${
                    mode === StemMode.AGGRESSIVE
                      ? 'bg-blue-500/10 border-blue-500 text-blue-400'
                      : 'border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  <div className="font-bold">Aggressive</div>
                  <div className="text-xs opacity-70">Shorter stems</div>
                </button>
                <button
                  onClick={() => setMode(StemMode.CONSERVATIVE)}
                  className={`px-4 py-3 rounded-xl border transition-all ${
                    mode === StemMode.CONSERVATIVE
                      ? 'bg-blue-500/10 border-blue-500 text-blue-400'
                      : 'border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  <div className="font-bold">Conservative</div>
                  <div className="text-xs opacity-70">Grammatical stems</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-3">Quick Examples</label>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => setWord(ex)}
                className="px-3 py-1.5 rounded-lg bg-[#0d1117] border border-gray-800 text-sm hover:border-blue-500/50 hover:text-blue-400 transition-all"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Output Panel */}
      <div className="bg-[#1c2128] border border-blue-500/30 p-8 rounded-2xl relative overflow-hidden shadow-2xl shadow-blue-500/10 flex flex-col justify-center text-center">
        <div className="absolute top-4 right-4 flex items-center gap-2 text-[#3fb950]">
          <span className="text-xs font-bold uppercase">Success</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="space-y-2">
          <p className="text-gray-400 text-sm font-medium">Stemmed Word</p>
          <div className="mono text-5xl md:text-6xl font-bold text-white tracking-tight break-all">
            {stemmed || '—'}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-sm">
          <div className="flex flex-col">
            <span className="text-gray-500">Latency</span>
            <span className="text-blue-400 font-bold">{time}ms</span>
          </div>
          <div className="w-px h-8 bg-gray-800"></div>
          <div className="flex flex-col">
            <span className="text-gray-500">Mode</span>
            <span className="text-gray-300 font-bold capitalize">{mode}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;
