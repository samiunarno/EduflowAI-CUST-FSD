import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { BrainCircuit, Menu, X, ChevronRight, Activity } from 'lucide-react';

export default function Navbar({ user, setUser }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);

  // --- Scroll Detection ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- GSAP Entry Animation ---
  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  }, []);

  // --- Logout Handler ---
  const handleLogout = () => {
    localStorage.clear();
    if (setUser) setUser(null);
    navigate('/');
    setMobileMenuOpen(false);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-black/70 backdrop-blur-3xl border-white/[0.08] py-0' 
            : 'bg-black/20 backdrop-blur-md border-white/[0.02] py-2'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-[72px] flex items-center justify-between">
          
          {/* Left: Brand / Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-none border border-white/20 bg-white/5 group-hover:bg-white/10 transition-colors">
              {/* Corner accents */}
              <span className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-white"></span>
              <span className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-white"></span>
              <BrainCircuit className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-medium text-[16px] text-white tracking-widest uppercase">
              EDU-AI
            </span>
          </Link>

          {/* Center: Global Links (Desktop) */}
          <div className="hidden md:flex items-center gap-10 text-[11px] font-mono tracking-widest uppercase text-zinc-500">
            <Link to="/" className={`hover:text-white transition-colors relative group ${location.pathname === '/' ? 'text-white' : ''}`}>
              Overview
              <span className={`absolute -bottom-3 left-0 w-full h-[1px] bg-indigo-500 transition-transform origin-left ${location.pathname === '/' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
            <Link to="/platform" className={`hover:text-white transition-colors relative group ${location.pathname === '/platform' ? 'text-white' : ''}`}>
              Platform
              <span className={`absolute -bottom-3 left-0 w-full h-[1px] bg-indigo-500 transition-transform origin-left ${location.pathname === '/platform' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
            <Link to="/docs" className={`hover:text-white transition-colors relative group ${location.pathname === '/docs' ? 'text-white' : ''}`}>
              Documentation
              <span className={`absolute -bottom-3 left-0 w-full h-[1px] bg-indigo-500 transition-transform origin-left ${location.pathname === '/docs' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
          </div>

          {/* Right: Auth / Action Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              // Authenticated State
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Operator</span>
                    <span className="text-[11px] font-mono text-white tracking-wider">{user.name}</span>
                  </div>
                </div>
                <div className="w-px h-6 bg-white/10"></div>
                <button onClick={handleLogout} className="text-[11px] font-mono tracking-wider text-zinc-500 hover:text-rose-400 transition-colors uppercase">
                  // Terminate
                </button>
                <Link to="/dashboard" className="relative group overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10 text-white text-[11px] font-mono font-bold uppercase tracking-widest px-5 py-2.5 transition-colors">
                  Dashboard <ChevronRight className="inline w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ) : (
              // Unauthenticated State
              <>
                <Link to="/login" className="text-[11px] font-mono tracking-wider text-zinc-400 hover:text-white transition-colors uppercase">
                  // Authenticate
                </Link>
                <Link to="/register" className="relative group overflow-hidden bg-white text-black text-[11px] font-mono font-bold uppercase tracking-widest px-6 py-2.5">
                  <span className="relative z-10">Deploy Node</span>
                  <div className="absolute inset-0 bg-indigo-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[90] bg-black/90 backdrop-blur-2xl transition-all duration-500 md:hidden flex flex-col pt-24 px-6 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6 text-[13px] font-mono tracking-widest uppercase">
          <Link to="/" className="text-zinc-400 hover:text-white border-b border-white/10 pb-4">Overview</Link>
          <Link to="/platform" className="text-zinc-400 hover:text-white border-b border-white/10 pb-4">Platform</Link>
          <Link to="/docs" className="text-zinc-400 hover:text-white border-b border-white/10 pb-4">Documentation</Link>
          
          <div className="mt-8 flex flex-col gap-4">
            {user ? (
              <>
                <div className="bg-white/5 border border-white/10 p-4 mb-4">
                  <div className="text-[9px] text-zinc-500 mb-1">CURRENT OPERATOR</div>
                  <div className="text-white">{user.name}</div>
                  <div className="text-emerald-400 text-[10px] mt-2 flex items-center gap-2"><Activity className="w-3 h-3"/> Session Active</div>
                </div>
                <Link to="/dashboard" className="bg-white text-black text-center py-4 font-bold">Open Dashboard</Link>
                <button onClick={handleLogout} className="border border-rose-500/30 text-rose-400 py-4 font-bold hover:bg-rose-500/10 transition-colors">
                  Terminate Session
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="border border-white/20 text-white text-center py-4 hover:bg-white/5 transition-colors">
                  Authenticate (Login)
                </Link>
                <Link to="/register" className="bg-white text-black text-center py-4 font-bold hover:bg-zinc-200 transition-colors">
                  Deploy Node (Register)
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}