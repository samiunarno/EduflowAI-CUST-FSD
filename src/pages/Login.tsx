import React, { useState } from 'react';
import { Link } from 'react-router';

export default function Login({ setUser }: { setUser: (u: any) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('name', data.name);
      setUser({ role: data.role, name: data.name });
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 min-h-screen relative overflow-hidden bg-[#FAFAFA]">
      <div className="absolute inset-0 bg-grid-pattern opacity-100 pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-200/40 blur-[100px] pointer-events-none" />
      
      <div className="max-w-md w-full bg-white p-10 rounded-[24px] border border-zinc-200/80 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.08)] relative z-10">
        <div className="text-center mb-10">
          <div className="font-display font-bold text-[28px] text-zinc-900 tracking-tight mb-2">
            EDU-AI
          </div>
          <h2 className="text-[14px] text-zinc-500 font-medium">Sign in to your intelligence dashboard</h2>
        </div>
        {error && <div className="mb-6 text-red-600 bg-red-50 p-4 rounded-xl text-sm border border-red-100/50 font-medium">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Email</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200/80 rounded-xl text-[14px] font-medium text-zinc-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-zinc-400"
              placeholder="name@organization.edu"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Password</label>
              <a href="#" className="text-[12px] font-semibold text-indigo-600 hover:text-indigo-700">Forgot?</a>
            </div>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200/80 rounded-xl text-[14px] font-medium text-zinc-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-zinc-400"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="pt-4">
            <button className="w-full bg-zinc-900 text-white py-3.5 rounded-xl text-[14px] font-semibold hover:bg-zinc-800 transition-all shadow-[0_4px_14px_0_rgb(0,0,0,0.1)]">
              Secure Sign In
            </button>
          </div>
        </form>
        <p className="mt-8 text-center text-[13px] text-zinc-500 font-medium">
          Don't have an account? <Link to="/register" className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors">Register</Link>
        </p>
      </div>
    </div>
  );
}
