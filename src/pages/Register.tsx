import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'teacher' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      navigate('/login');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 min-h-screen relative overflow-hidden bg-[#FAFAFA]">
      <div className="absolute inset-0 bg-grid-pattern opacity-100 pointer-events-none" />
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-200/40 blur-[100px] pointer-events-none" />
      
      <div className="max-w-md w-full bg-white p-10 rounded-[24px] border border-zinc-200/80 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.08)] relative z-10">
        <div className="text-center mb-10">
          <div className="font-display font-bold text-[28px] text-zinc-900 tracking-tight mb-2">
            EDU-AI
          </div>
          <h2 className="text-[14px] text-zinc-500 font-medium">Create a new organizational account</h2>
        </div>
        {error && <div className="mb-6 text-red-600 bg-red-50 p-4 rounded-xl text-sm border border-red-100/50 font-medium">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Name</label>
            <input 
              type="text" required
              className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200/80 rounded-xl text-[14px] font-medium text-zinc-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-zinc-400"
              placeholder="Full Name"
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Email</label>
            <input 
              type="email" required
              className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200/80 rounded-xl text-[14px] font-medium text-zinc-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-zinc-400"
              placeholder="name@organization.edu"
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Password</label>
            <input 
              type="password" required
              className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200/80 rounded-xl text-[14px] font-medium text-zinc-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-zinc-400"
              placeholder="••••••••"
              value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Role Assignment</label>
            <select 
              className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200/80 rounded-xl text-[14px] font-medium text-zinc-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all appearance-none cursor-pointer"
              value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}
            >
              <option value="teacher">Educator (Teacher)</option>
              <option value="ai_trainer">AI Systems Trainer</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <div className="pt-4">
            <button className="w-full bg-zinc-900 text-white py-3.5 rounded-xl text-[14px] font-semibold hover:bg-zinc-800 transition-all shadow-[0_4px_14px_0_rgb(0,0,0,0.1)]">
              Create Account
            </button>
          </div>
        </form>
        <p className="mt-8 text-center text-[13px] text-zinc-500 font-medium">
          Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
