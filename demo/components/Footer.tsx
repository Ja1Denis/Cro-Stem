
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-800 mt-24 py-24 bg-[#0d1117]">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-white">Ready to integrate?</h2>
          <p className="text-xl text-gray-400 font-light">Join developers building the future of Croatian NLP.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="https://github.com/Ja1Denis/Cro-Stem" 
            className="w-full sm:w-auto px-8 py-3 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
          >
            ⭐ Star on GitHub
          </a>
          <button className="w-full sm:w-auto px-8 py-3 glass rounded-lg font-bold text-white hover:bg-white/5 transition-all">
            📖 Documentation
          </button>
          <button className="w-full sm:w-auto px-8 py-3 glass rounded-lg font-bold text-white hover:bg-white/5 transition-all">
            💬 Contact Team
          </button>
        </div>

        <div className="pt-12 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold tracking-tighter">Cro-Stem</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-blue-400">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400">Terms of Service</a>
            <a href="#" className="hover:text-blue-400">Security</a>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            System Operational
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
