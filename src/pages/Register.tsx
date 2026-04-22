import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { BrainCircuit, Activity, ChevronRight, ShieldCheck, UserPlus, Key, Fingerprint, Layers } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'teacher' });
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
      y: -8,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.4
    });
  }, { scope: containerRef });

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
    <div ref={containerRef} className="min-h-screen flex flex-col lg:flex-row bg-[#020202] text-zinc-300 font-sans selection:bg-indigo-500/30">
      
      {/* LEFT SIDE: DEPLOYMENT FORM (40%) */}
      <div className="flex-1 lg:flex-[0.4] flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 border-b lg:border-b-0 lg:border-r border-white/[0.05] relative z-10 bg-[#020202] shadow-[20px_0_50px_rgba(0,0,0,0.5)] overflow-y-auto">
        
        {/* Top Logo */}
        <div className="gsap-form-item absolute top-8 left-8 sm:left-16 lg:left-24 flex items-center gap-3">
          <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center">
            <BrainCircuit className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="font-display font-bold text-[14px] text-white tracking-widest uppercase">EDU-AI</span>
        </div>

        <div className="w-full max-w-md mx-auto mt-20 lg:mt-0 pt-8 lg:pt-0">
          <div className="mb-12">
            <h2 className="gsap-form-item font-display text-3xl md:text-4xl font-medium text-white mb-3 tracking-tight">Deploy Node</h2>
            <p className="gsap-form-item text-[13px] text-zinc-500 font-mono tracking-wide">Initialize a new operator account within the neural cluster.</p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="gsap-form-item mb-8 border-l-2 border-rose-500 bg-rose-500/10 p-4">
              <div className="flex items-center gap-2 mb-1 text-rose-400">
                <Activity className="w-3 h-3" />
                <span className="text-[10px] font-mono uppercase tracking-widest">Deployment_Failure</span>
              </div>
              <div className="text-[13px] text-rose-200">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="gsap-form-item">
              <label className="block text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-3">Operator Designation (Name)</label>
              <input 
                type="text" required
                className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-white font-mono text-[14px] focus:border-indigo-500 outline-none transition-colors placeholder:text-zinc-700"
                placeholder="E.g. Dr. Sarah Chen"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="gsap-form-item">
              <label className="block text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-3">Institutional Email</label>
              <input 
                type="email" required
                className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-white font-mono text-[14px] focus:border-indigo-500 outline-none transition-colors placeholder:text-zinc-700"
                placeholder="alias@organization.edu"
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="gsap-form-item">
              <label className="block text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-3">Security Key (Password)</label>
              <input 
                type="password" required
                className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-white font-mono text-[14px] focus:border-indigo-500 outline-none transition-colors placeholder:text-zinc-700 tracking-[0.2em]"
                placeholder="••••••••"
                value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div className="gsap-form-item">
              <label className="block text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-3">Role Assignment</label>
              <div className="relative">
                <select 
                  className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-white font-mono text-[14px] focus:border-indigo-500 outline-none transition-colors appearance-none cursor-pointer"
                  value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}
                >
                  <option className="bg-[#0f0f0f] text-zinc-300 py-2" value="teacher">Educator (Teacher)</option>
                  <option className="bg-[#0f0f0f] text-zinc-300 py-2" value="ai_trainer">AI Systems Trainer</option>
                  <option className="bg-[#0f0f0f] text-zinc-300 py-2" value="admin">System Administrator</option>
                </select>
                {/* Custom dropdown arrow to match styling */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronRight className="w-4 h-4 text-zinc-500 rotate-90" />
                </div>
              </div>
            </div>

            <div className="gsap-form-item pt-4">
              <button className="group relative w-full flex items-center justify-between bg-white text-black px-6 py-4 hover:bg-zinc-200 transition-colors">
                <span className="font-mono text-[12px] font-bold uppercase tracking-[0.2em]">Provision Account</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          <div className="gsap-form-item mt-12 pb-8 lg:pb-0 text-[11px] font-mono text-zinc-600 uppercase tracking-widest">
            Existing Operator?{' '}
            <Link to="/login" className="text-white hover:text-indigo-400 transition-colors border-b border-white/30 hover:border-indigo-400 pb-[2px]">
              Authenticate Here
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: PROVISIONING VISUALIZATION (60%) */}
      <div className="hidden lg:flex flex-[0.6] relative bg-[#050505] overflow-hidden items-center justify-center p-12">
        
        {/* Abstract Background Elements */}
        <div className="gsap-visual-bg absolute inset-0">
          {/* Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          {/* Orbs */}
          <div className="absolute top-[10%] right-[20%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
          <div className="absolute bottom-[20%] left-[10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
        </div>

        {/* Central Visualization Composition */}
        <div className="relative z-10 w-full max-w-2xl">
          
          <div className="gsap-visual-card mb-8 border-l-2 border-emerald-500 pl-6">
            <h3 className="font-display text-4xl font-medium text-white mb-2">Identity Provisioning</h3>
            <p className="text-zinc-500 font-mono text-[13px] tracking-wide">Automated clearance & role-based access control (RBAC).</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Main Status Card */}
            <div className="gsap-visual-card gsap-float col-span-2 bg-black/40 backdrop-blur-xl border border-white/10 p-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Fingerprint className="w-5 h-5 text-indigo-400" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">Clearance Verification</span>
                </div>
                <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-mono tracking-widest uppercase rounded-full flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></span>
                  Listening
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-16 h-16 border border-white/10 flex items-center justify-center bg-white/[0.02]">
                  <UserPlus className="w-6 h-6 text-zinc-500" />
                </div>
                <div className="flex-1 flex flex-col justify-center space-y-3">
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-zinc-700 w-[80%]"></div>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-zinc-700 w-[60%]"></div>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500/50 w-[40%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub Card 1 */}
            <div className="gsap-visual-card gsap-float bg-black/40 backdrop-blur-xl border border-white/10 p-6" style={{ animationDelay: '0.2s' }}>
              <Layers className="w-5 h-5 text-cyan-400 mb-4" />
              <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-1">Hierarchy Level</div>
              <div className="text-lg font-display text-white">L1 - L3</div>
              <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-zinc-500 border-t border-white/5 pt-4">
                Structured Permissions
              </div>
            </div>

            {/* Sub Card 2 */}
            <div className="gsap-visual-card gsap-float bg-black/40 backdrop-blur-xl border border-white/10 p-6" style={{ animationDelay: '0.4s' }}>
              <Key className="w-5 h-5 text-emerald-400 mb-4" />
              <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-1">Encryption Layer</div>
              <div className="text-lg font-display text-white">Argon2id Hash</div>
              <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-zinc-500 border-t border-white/5 pt-4">
                <ShieldCheck className="w-3 h-3 text-emerald-500" /> Zero-Trust Validated
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}