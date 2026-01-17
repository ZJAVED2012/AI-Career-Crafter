
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import { UserData, GenerationResult, AppState } from './types';
import { generateCareerContent } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    loading: false,
    error: null,
    result: null,
  });

  const handleGenerate = useCallback(async (userData: UserData) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await generateCareerContent(userData);
      setState({
        loading: false,
        error: null,
        result,
      });
      // Smooth scroll to results
      setTimeout(() => {
        window.scrollTo({
          top: document.getElementById('results-section')?.offsetTop || 0,
          behavior: 'smooth'
        });
      }, 100);
    } catch (err: any) {
      setState({
        loading: false,
        error: err.message || "An unexpected error occurred.",
        result: null,
      });
    }
  }, []);

  const handleReset = () => {
    setState({
      loading: false,
      error: null,
      result: null,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 w-full py-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
            Land Your Dream Job with <span className="text-indigo-600">AI</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Generate high-impact resume summaries and professional cover letters in seconds. 
            Tailored to your specific skills and experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-12">
            {!state.result ? (
              <div className="max-w-3xl mx-auto">
                {state.error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 text-red-800">
                    <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <span className="font-bold block">Generation Error</span>
                      <span className="text-sm">{state.error}</span>
                    </div>
                  </div>
                )}
                <InputForm onSubmit={handleGenerate} isLoading={state.loading} />
              </div>
            ) : (
              <div id="results-section" className="space-y-6">
                <div className="flex justify-start">
                  <button
                    onClick={handleReset}
                    className="group flex items-center space-x-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
                  >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Start Over</span>
                  </button>
                </div>
                <ResultDisplay result={state.result} />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
