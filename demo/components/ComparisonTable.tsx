
import React from 'react';

const COMPARISONS = [
  { metric: 'Accuracy', crostem: '91.4%', snowball: '~32%', chatgpt: '~85%' },
  { metric: 'Speed', crostem: '<1ms', snowball: '2ms', chatgpt: '500ms+' },
  { metric: 'Cost / 1M req', crostem: '$0', snowball: '$0', chatgpt: '$2,000' },
  { metric: 'Offline support', crostem: '✅', snowball: '✅', chatgpt: '❌' },
  { metric: 'Library Size', crostem: '500KB', snowball: '2MB', chatgpt: '300GB+' },
];

const ComparisonTable: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Market Comparison</h2>
        <p className="text-gray-400">How Cro-Stem stacks up against current standard solutions.</p>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-gray-800">
                <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Metric</th>
                <th className="px-6 py-4 text-sm font-semibold text-blue-400 uppercase tracking-wider bg-blue-500/5">Cro-Stem</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Snowball</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">ChatGPT-4o</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {COMPARISONS.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-300">{row.metric}</td>
                  <td className="px-6 py-4 font-bold text-white bg-blue-500/5">{row.crostem}</td>
                  <td className="px-6 py-4 text-gray-400">{row.snowball}</td>
                  <td className="px-6 py-4 text-gray-400">{row.chatgpt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
