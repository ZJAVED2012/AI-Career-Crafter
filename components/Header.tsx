
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 py-6 mb-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">CareerCrafter <span className="text-indigo-600">AI</span></h1>
        </div>
        <div className="hidden sm:block text-sm text-slate-500 font-medium">
          Professional Resume & Cover Letter Generator
        </div>
      </div>
    </header>
  );
};

export default Header;
