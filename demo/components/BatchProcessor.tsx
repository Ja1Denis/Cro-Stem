
import React, { useState } from 'react';
import { StemMode } from '../types';
import { processBulk } from '../services/stemmer';

const INITIAL_TEXT = "Jučer smo pjevali hrvatske pjesme o našim lijepim gradovima i starim vremenima.";

const BatchProcessor: React.FC = () => {
  const [text, setText] = useState(INITIAL_TEXT);
  const [results, setResults] = useState<ReturnType<typeof processBulk> | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = () => {
    setIsProcessing(true);
    // Add small synthetic delay for visual feedback
    setTimeout(() => {
      const result = processBulk(text, StemMode.AGGRESSIVE);
      setResults(result);
      setIsProcessing(false);
    }, 400);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <h2 className="text-3xl font-bold text-white">Batch Processor</h2>
          <p className="text-gray-400">Process entire paragraphs or datasets in milliseconds.</p>
        </div>
        <button
          onClick={handleProcess}
          disabled={isProcessing}
          className="w-full md:w-auto px-8 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold transition-all flex items-center justify-center gap-2"
        >
          {isProcessing ? (
             <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Process Text
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-64 bg-[#0d1117] border border-gray-800 rounded-xl p-6 focus:outline-none focus:border-blue-500/50 transition-colors resize-none text-gray-300"
            placeholder="Paste bulk text here..."
          />
        </div>

        <div className="glass rounded-xl h-64 overflow-hidden flex flex-col">
          {!results && !isProcessing ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-600 space-y-2">
              <svg className="w-12 h-12 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>Results will appear here</p>
            </div>
          ) : (
            <>
              <div className="p-3 border-b border-gray-800 bg-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                <span>Output</span>
                {results && <span>{results.count} words in {results.time}ms</span>}
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-1 mono text-sm">
                {results?.results.map((res, i) => (
                  <div key={i} className="flex items-center gap-2 group">
                    <span className="text-gray-600">{res.original}</span>
                    <span className="text-blue-500 opacity-50 group-hover:opacity-100">→</span>
                    <span className="text-green-400 font-medium">{res.stemmed}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchProcessor;
