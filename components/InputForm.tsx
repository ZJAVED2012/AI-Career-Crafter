
import React, { useState } from 'react';
import { UserData } from '../types';

interface InputFormProps {
  onSubmit: (data: UserData) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    jobTitle: '',
    experience: '',
    skills: '',
    company: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.jobTitle || !formData.experience || !formData.skills) {
      alert("Please fill in all required fields (Name, Job Title, Experience, and Skills).");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Jane Doe"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Target Job Title *</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="e.g., Senior Software Engineer"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">Experience Highlights *</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            rows={3}
            placeholder="e.g., 5 years in full-stack development, led a team of 4 at TechCorp, reduced latency by 30%..."
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">Key Skills *</label>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            rows={2}
            placeholder="e.g., React, TypeScript, Node.js, AWS, System Architecture, Agile"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">Target Company (Optional)</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g., Google, Stripe, or leave blank for a general letter"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all flex items-center justify-center space-x-2 ${
            isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] shadow-indigo-200'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generating Magic...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Generate Documents</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
