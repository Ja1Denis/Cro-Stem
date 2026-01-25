
import React, { useState } from 'react';

const CURL_CODE = `curl -X POST https://api.cro-stem.com/stem \\
  -d '{"word":"knjigama","mode":"aggressive"}'`;

const RESPONSE_JSON = `{
  "original": "knjigama",
  "stem": "knjig",
  "mode": "aggressive",
  "latency_ms": 0.23,
  "accuracy": 0.914
}`;

const ApiPreview: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(CURL_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <h2 className="text-3xl font-bold text-white">API Preview</h2>
          <p className="text-gray-400">Developer friendly. Simple integration via REST or Bindings.</p>
        </div>
        <button className="px-6 py-2 glass rounded-lg text-sm font-semibold hover:bg-white/5 transition-colors">
          Full API Docs
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Request (cURL)</span>
            <button 
              onClick={copyCode}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
            >
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
          <pre className="bg-[#010409] border border-gray-800 p-6 rounded-xl overflow-x-auto mono text-sm text-gray-300">
            {CURL_CODE}
          </pre>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Response (JSON)</span>
          </div>
          <pre className="bg-[#010409] border border-gray-800 p-6 rounded-xl overflow-x-auto mono text-sm text-green-400/80">
            {RESPONSE_JSON}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ApiPreview;
