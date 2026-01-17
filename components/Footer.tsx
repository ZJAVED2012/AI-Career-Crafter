
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 pb-12 text-center text-slate-400 text-sm">
      <div className="max-w-5xl mx-auto px-4">
        <div className="border-t border-slate-200 pt-8">
          <p>© {new Date().getFullYear()} CareerCrafter AI. Built with Gemini Pro API.</p>
          <p className="mt-2">Empowering your career journey with artificial intelligence.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
