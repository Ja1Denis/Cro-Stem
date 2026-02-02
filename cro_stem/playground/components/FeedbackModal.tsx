import React, { useState, useEffect } from 'react';

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (expected: string, expectedNormalized: string) => void;
    word: string;
    currentStem: string;
    currentNormalized: string;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, onSubmit, word, currentStem, currentNormalized }) => {
    const [expected, setExpected] = useState(currentStem);
    const [expectedNormalized, setExpectedNormalized] = useState(currentNormalized || "");

    useEffect(() => {
        if (isOpen) {
            setExpected(currentStem);
            setExpectedNormalized(currentNormalized || "");
        }
    }, [isOpen, currentStem, currentNormalized]);

    if (!isOpen) return null;

    const handleSubmit = () => {
        onSubmit(expected, expectedNormalized);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl p-6 transform transition-all animate-scaleIn">
                <h3 className="text-xl font-bold text-white mb-2">Prijavi grešku / Ispravi</h3>
                <p className="text-slate-400 text-sm mb-6">
                    Ispravite normalizaciju ili korijen za riječ <span className="text-cyan-400 font-mono">"{word}"</span>.
                </p>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Očekivana Normalizacija</label>
                        <input
                            type="text"
                            value={expectedNormalized}
                            onChange={(e) => setExpectedNormalized(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-mono"
                            placeholder="Npr. šećer"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Očekivani korijen</label>
                        <input
                            type="text"
                            value={expected}
                            onChange={(e) => setExpected(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-mono"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white transition-all text-sm font-semibold"
                        >
                            Odustani
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm font-semibold"
                        >
                            Spremi i kopiraj kod
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
