
import React from 'react';
import { GenerationResult } from '../types';

interface ResultDisplayProps {
  result: GenerationResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const downloadText = () => {
    const content = `RESUME SUMMARY\n================\n\n${result.resumeSummary}\n\n\nCOVER LETTER\n============\n\n${result.coverLetter}`;
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "CareerCrafter_Documents.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copied to clipboard!`);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Your AI-Generated Results</h2>
        <button
          onClick={downloadText}
          className="flex items-center space-x-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Download as Text</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">📌 Professional Resume Summary</h3>
          <button 
            onClick={() => copyToClipboard(result.resumeSummary, 'Resume Summary')}
            className="text-xs font-semibold text-slate-500 hover:text-indigo-600 flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            <span>Copy</span>
          </button>
        </div>
        <div className="p-6 text-slate-700 leading-relaxed whitespace-pre-wrap italic">
          "{result.resumeSummary}"
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">✉️ Tailored Cover Letter</h3>
          <button 
            onClick={() => copyToClipboard(result.coverLetter, 'Cover Letter')}
            className="text-xs font-semibold text-slate-500 hover:text-indigo-600 flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            <span>Copy</span>
          </button>
        </div>
        <div className="p-6 text-slate-700 leading-relaxed whitespace-pre-wrap font-serif text-sm md:text-base bg-slate-50/30">
          {result.coverLetter}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
