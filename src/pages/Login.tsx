import React, { useState, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { BrainCircuit, Activity, ChevronRight, ShieldCheck, Database, Cpu, Network } from 'lucide-react';

export default function Login({ setUser }: { setUser: (u: any) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // --- GSAP Animations ---
  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Form Side Entrance
    tl.from('.gsap-form-item', { 
      x: -30, 
      opacity: 0, 
      duration: 0.8, 
      stagger: 0.1, 
      ease: 'power3.out' 
    })
    // Visual Side Entrance
    .from('.gsap-visual-bg', {
      scale: 1.05,
      opacity: 0,
      duration: 1.5,
      ease: 'power2.out'
    }, '-=1')
    .from('.gsap-visual-card', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'back.out(1.2)'
    }, '-=1.2');

    // Floating animation for cards
    gsap.to('.gsap-float', {
      y: -10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.5
    });
  }, { scope: containerRef });

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
    <div ref={containerRef} className="min-h-screen flex flex-col lg:flex-row bg-[#020202] text-zinc-300 font-sans selection:bg-indigo-500/30">
      
      {/* LEFT SIDE: AUTHENTICATION FORM (40%) */}
      <div className="flex-1 lg:flex-[0.4] flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 border-b lg:border-b-0 lg:border-r border-white/[0.05] relative z-10 bg-[#020202] shadow-[20px_0_50px_rgba(0,0,0,0.5)]">
        
        {/* Top Logo */}
        <div className="gsap-form-item absolute top-8 left-8 sm:left-16 lg:left-24 flex items-center gap-3">
          <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center">
            <BrainCircuit className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="font-display font-bold text-[14px] text-white tracking-widest uppercase">EDU-AI</span>
        </div>

        <div className="w-full max-w-md mx-auto mt-12 lg:mt-0">
          <div className="mb-12">
            <h2 className="gsap-form-item font-display text-3xl md:text-4xl font-medium text-white mb-3 tracking-tight">System Access</h2>
            <p className="gsap-form-item text-[13px] text-zinc-500 font-mono tracking-wide">Authenticate to access the neural dashboard.</p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="gsap-form-item mb-8 border-l-2 border-rose-500 bg-rose-500/10 p-4">
              <div className="flex items-center gap-2 mb-1 text-rose-400">
                <Activity className="w-3 h-3" />
                <span className="text-[10px] font-mono uppercase tracking-widest">Auth_Failure</span>
              </div>
              <div className="text-[13px] text-rose-200">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="gsap-form-item">
              <label className="block text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-3">Institutional Email</label>
              <input 
                type="email" 
                required
                className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-white font-mono text-[14px] focus:border-indigo-500 outline-none transition-colors placeholder:text-zinc-700"
                placeholder="admin@edu-ai.network"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="gsap-form-item">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Security Key</label>
                <a href="#" className="text-[11px] font-mono text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest">Reset?</a>
              </div>
              <input 
                type="password" 
                required
                className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-white font-mono text-[14px] focus:border-indigo-500 outline-none transition-colors placeholder:text-zinc-700 tracking-[0.2em]"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className="gsap-form-item pt-8">
              <button className="group relative w-full flex items-center justify-between bg-white text-black px-6 py-4 hover:bg-zinc-200 transition-colors">
                <span className="font-mono text-[12px] font-bold uppercase tracking-[0.2em]">Initiate Handshake</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          <div className="gsap-form-item mt-12 text-[11px] font-mono text-zinc-600 uppercase tracking-widest">
            Unregistered Operator?{' '}
            <Link to="/register" className="text-white hover:text-indigo-400 transition-colors border-b border-white/30 hover:border-indigo-400 pb-[2px]">
              Deploy Node
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: PROFESSIONAL VISUALIZATION (60%) */}
      <div className="hidden lg:flex flex-[0.6] relative bg-[#050505] overflow-hidden items-center justify-center p-12">
        
        {/* Abstract Background Elements */}
        <div className="gsap-visual-bg absolute inset-0">
          {/* Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          {/* Orbs */}
          <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
          <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
        </div>

        {/* Central Visualization Composition */}
        <div className="relative z-10 w-full max-w-2xl">
          
          <div className="gsap-visual-card mb-8 border-l-2 border-indigo-500 pl-6">
            <h3 className="font-display text-4xl font-medium text-white mb-2">Global Telemetry</h3>
            <p className="text-zinc-500 font-mono text-[13px] tracking-wide">Enterprise analytics and infrastructure monitoring.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Main Status Card */}
            <div className="gsap-visual-card gsap-float col-span-2 bg-black/40 backdrop-blur-xl border border-white/10 p-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">Cluster Status</span>
                </div>
                <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono tracking-widest uppercase rounded-full flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  Optimal
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-1">Active Nodes</div>
                  <div className="text-2xl font-display text-white">1,024</div>
                </div>
                <div>
                  <div className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-1">Avg Latency</div>
                  <div className="text-2xl font-display text-white">12<span className="text-sm text-zinc-600">ms</span></div>
                </div>
                <div>
                  <div className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-1">Success Rate</div>
                  <div className="text-2xl font-display text-emerald-400">99.9%</div>
                </div>
              </div>
            </div>

            {/* Sub Card 1 */}
            <div className="gsap-visual-card gsap-float bg-black/40 backdrop-blur-xl border border-white/10 p-6" style={{ animationDelay: '0.2s' }}>
              <Database className="w-5 h-5 text-indigo-400 mb-4" />
              <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-1">Vector Storage</div>
              <div className="text-lg font-display text-white">Allocated</div>
              <div className="w-full bg-white/5 h-1 mt-4 rounded-full overflow-hidden">
                <div className="bg-indigo-500 w-[65%] h-full"></div>
              </div>
            </div>

            {/* Sub Card 2 */}
            <div className="gsap-visual-card gsap-float bg-black/40 backdrop-blur-xl border border-white/10 p-6" style={{ animationDelay: '0.4s' }}>
              <Cpu className="w-5 h-5 text-cyan-400 mb-4" />
              <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-1">Compute Core</div>
              <div className="text-lg font-display text-white">Zhipu / Gemini</div>
              <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                <Network className="w-3 h-3" /> Synchronized
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}