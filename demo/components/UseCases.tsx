
import React from 'react';

const USE_CASES = [
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    title: 'Search Engines',
    description: 'Map "knjiga", "knjigama", "knjige" to a single index entry "knjig" for robust search result matching.'
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
    title: 'Text Analytics',
    description: 'Accurately calculate word frequency distributions across large corpora without inflection noise.'
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.281a2 2 0 01-1.18.168l-2.35-.35a2 2 0 00-1.838 1.236l-1.433 3.583a2 2 0 001.236 2.484l3.583 1.433a2 2 0 002.484-1.236l.33-1.646" />,
    title: 'NLP Pipelines',
    description: 'Crucial preprocessing step for training language models and improving performance of classifiers.'
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />,
    title: 'Chatbots',
    description: 'Enable intent recognition that works regardless of grammatical case or plural forms in user input.'
  }
];

const UseCases: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Use Cases</h2>
        <p className="text-gray-400">Powering production-grade linguistics across industries.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {USE_CASES.map((uc, i) => (
          <div key={i} className="glass p-8 rounded-2xl hover:border-blue-500/50 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {uc.icon}
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{uc.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{uc.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UseCases;
