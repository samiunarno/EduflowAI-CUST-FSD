import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { BrainCircuit, BookOpen, BarChart3, ChevronRight, CheckCircle2, ShieldCheck, Activity, Database, Workflow, Lock, Zap } from 'lucide-react';

// --- Animation Core ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
};

// --- Decorative Schematic Grid ---
const SchematicGrid = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M0 40L40 40M40 0L40 40" stroke="white" strokeWidth="1" fill="none" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
  </svg>
);

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#020202] text-zinc-400 font-sans selection:bg-white/20 selection:text-white overflow-hidden relative">
      <SchematicGrid />
      
      {/* Cinematic Lighting Orbs */}
      <div className="absolute top-[-20%] left-[20%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-indigo-900/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-emerald-900/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      {/* Edge-to-Edge Architectural Nav */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.05] bg-black/50 backdrop-blur-3xl"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10">
              <BrainCircuit className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-medium text-[16px] text-white tracking-widest uppercase">
              CUST-AI
            </span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-[11px] font-mono tracking-widest uppercase text-zinc-500">
            <a href="#features" className="hover:text-white transition-colors relative group">
              Platform
              <span className="absolute -bottom-3 left-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </a>
            <a href="#architecture" className="hover:text-white transition-colors relative group">
              Architecture
              <span className="absolute -bottom-3 left-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </a>
            <a href="#security" className="hover:text-white transition-colors relative group">
              Security
              <span className="absolute -bottom-3 left-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </a>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-[12px] font-mono tracking-wider text-zinc-400 hover:text-white transition-colors hidden sm:block">
              // LOGIN
            </Link>
            <Link to="/register" className="relative group overflow-hidden bg-white text-black text-[11px] font-mono font-bold uppercase tracking-widest px-6 py-3 rounded-none">
              <span className="relative z-10">Deploy Now</span>
              <div className="absolute inset-0 bg-zinc-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* 1. Hero Section */}
      <main className="relative z-10 w-full pt-48 pb-32 lg:pt-56 lg:pb-40 border-b border-white/[0.05]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <motion.div initial="hidden" animate="visible" variants={stagger} className="lg:col-span-7">
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <span className="h-[1px] w-8 bg-indigo-500"></span>
                <span className="text-[10px] font-mono text-indigo-400 tracking-[0.2em] uppercase">Multi-Model Live Runtime</span>
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="font-display text-5xl sm:text-6xl lg:text-[84px] font-medium text-white leading-[1.05] tracking-tighter mb-8">
                Industrial-grade<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/20">
                  educational analytics.
                </span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-lg text-zinc-500 mb-12 leading-relaxed font-light max-w-xl">
                Enterprise architecture uniting AI Trainers, Educators, and Administrators. We process raw academic datasets natively, strictly without student-facing endpoints to ensure data sovereignty.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex items-center gap-6">
                <Link to="/register" className="group flex items-center justify-between gap-6 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-6 py-4 transition-all w-full sm:w-auto backdrop-blur-md">
                  <span className="text-[13px] font-mono uppercase tracking-widest">Initialize Environment</span>
                  <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </Link>
                <div className="hidden sm:flex flex-col gap-1">
                  <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Sys_Status</span>
                  <span className="flex items-center gap-2 text-[11px] font-mono text-emerald-500"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> ONLINE</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Graphic: The Schematic Panel */}
            <motion.div initial={{ opacity: 0, filter: 'blur(20px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 1.2, delay: 0.3 }} className="lg:col-span-5 relative hidden lg:block">
              {/* Glass Terminal */}
              <div className="relative bg-black/40 backdrop-blur-2xl border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] p-1 rounded-sm">
                <div className="border border-white/[0.05] bg-black/60 p-6 relative">
                  {/* Decorative corners */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30"></div>

                  <div className="flex items-center justify-between border-b border-white/[0.05] pb-4 mb-6">
                    <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">Process_Log // Zhipu-Gemini</div>
                    <Activity className="w-4 h-4 text-indigo-500" />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="relative pl-6 border-l border-white/[0.05]">
                      <div className="absolute -left-[5px] top-1 w-2 h-2 bg-indigo-500/20 border border-indigo-500 rounded-full"></div>
                      <div className="text-[13px] text-white font-medium mb-1">Automated Ingestion</div>
                      <div className="text-[11px] font-mono text-zinc-500 leading-relaxed">Processing 2,400 structured rows via secure memory streams.</div>
                    </div>
                    
                    <div className="relative pl-6 border-l border-white/[0.05]">
                      <div className="absolute -left-[5px] top-1 w-2 h-2 bg-emerald-500/20 border border-emerald-500 rounded-full"></div>
                      <div className="text-[13px] text-white font-medium mb-1">Model Output Generated</div>
                      <div className="text-[11px] font-mono text-zinc-500 leading-relaxed">Similarity index locked at <span className="text-white">98.2%</span> against targeted heuristics.</div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/[0.05] flex justify-between items-center text-[9px] font-mono text-zinc-600">
                    <span>MEM_USAGE: 42%</span>
                    <span>LATENCY: 12ms</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* 2. Platform Capabilities (Architectural List) */}
      <section id="features" className="relative py-32 border-b border-white/[0.05]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] uppercase mb-4">01 // Access Architecture</div>
              <h2 className="font-display text-4xl md:text-5xl font-medium text-white tracking-tight">Enterprise Role Segregation</h2>
            </div>
            <p className="text-zinc-500 font-light max-w-md text-[15px] leading-relaxed">Strict access controls ensuring only authorized faculty and engineers interact with sensitive data layers.</p>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-px bg-white/[0.05]">
            {[
              { icon: BarChart3, title: 'Administrators', p1: 'Global telemetry & RBAC oversight', p2: 'Node health & API state management' },
              { icon: BookOpen, title: 'Educators', p1: 'Direct CSV/Dataset ingestion', p2: 'Real-time aggregation of student metrics' },
              { icon: BrainCircuit, title: 'AI Trainers', p1: 'Model output evaluation & parsing', p2: 'Fine-tuning heuristics & similarity mapping' }
            ].map((role, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-[#020202] p-10 lg:p-14 group relative overflow-hidden hover:bg-white/[0.02] transition-colors duration-500">
                <div className="absolute top-0 right-0 p-6 text-[10px] font-mono text-zinc-700">0{idx + 1}</div>
                <role.icon className="w-8 h-8 text-zinc-300 mb-12 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                <h3 className="font-display text-2xl font-medium text-white mb-6">{role.title}</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4 text-[13px] text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    <span className="w-1.5 h-1.5 bg-zinc-700 rounded-sm mt-1.5 shrink-0 group-hover:bg-white transition-colors"></span>
                    {role.p1}
                  </li>
                  <li className="flex items-start gap-4 text-[13px] text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    <span className="w-1.5 h-1.5 bg-zinc-700 rounded-sm mt-1.5 shrink-0 group-hover:bg-white transition-colors"></span>
                    {role.p2}
                  </li>
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Architecture Section */}
      <section id="architecture" className="relative py-32 border-b border-white/[0.05]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="order-2 lg:order-1">
            <div className="relative p-1 bg-white/[0.02] border border-white/[0.05]">
               {/* Monospace Code Editor Vibe */}
              <div className="bg-[#050505] border border-white/[0.05] p-6 relative">
                <div className="flex gap-1.5 mb-6">
                  <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                  <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                  <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                </div>
                <div className="text-[10px] font-mono text-zinc-600 mb-4 uppercase tracking-widest border-b border-white/[0.05] pb-4">server/controllers/ai.controller.ts</div>
                <pre className="text-[12px] md:text-[13px] font-mono leading-[2] overflow-x-auto text-zinc-400">
                  <code>
                    <span className="text-zinc-500">const</span> <span className="text-white">model</span> = <span className="text-zinc-500">await</span> AIModel.<span className="text-indigo-300">findOne</span>({'{'} isActive: <span className="text-emerald-400">true</span> {'}'});<br/>
                    <span className="text-rose-400">if</span> (!model) <span className="text-rose-400">throw new</span> Error(<span className="text-amber-300">"No active models."</span>);<br/>
                    <br/>
                    <span className="text-zinc-500">const</span> <span className="text-white">response</span> = <span className="text-zinc-500">await</span> <span className="text-indigo-300">fetch</span>(model.apiDetails, {'{\n'}
                    {'  '}method: <span className="text-amber-300">'POST'</span>,<br/>
                    {'  '}body: JSON.<span className="text-indigo-300">stringify</span>(payload)<br/>
                    {'}'});<br/>
                    <span className="text-rose-400">return</span> response.<span className="text-indigo-300">json</span>();
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="order-1 lg:order-2">
            <motion.div variants={fadeUp} className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] uppercase mb-4">02 // Core Systems</motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-medium text-white mb-6 tracking-tight">Pluggable LLM Architecture</motion.h2>
            <motion.p variants={fadeUp} className="text-zinc-500 font-light text-[15px] leading-relaxed mb-12">Built to interface natively with Zhipu GLM-4, Google Gemini, and custom enterprise models. We handle the vector routing and embedding locally.</motion.p>
            
            <motion.div variants={stagger} className="space-y-8 border-l border-white/[0.05] pl-8">
              <motion.div variants={fadeUp} className="relative">
                <div className="absolute -left-[32.5px] top-1 w-2 h-2 bg-white rounded-full"></div>
                <h4 className="font-mono text-[11px] tracking-widest uppercase text-white mb-2 flex items-center gap-2"><Database className="w-3 h-3 text-zinc-500"/> Persistent Streams</h4>
                <p className="text-[13px] text-zinc-500 font-light leading-relaxed">All data firmly grounded in NoSQL collections without third-party replication layers.</p>
              </motion.div>
              <motion.div variants={fadeUp} className="relative">
                <div className="absolute -left-[32.5px] top-1 w-2 h-2 bg-zinc-700 rounded-full"></div>
                <h4 className="font-mono text-[11px] tracking-widest uppercase text-white mb-2 flex items-center gap-2"><Zap className="w-3 h-3 text-zinc-500"/> Synchronous Handlers</h4>
                <p className="text-[13px] text-zinc-500 font-light leading-relaxed">Zero loading state drift. Real-time REST endpoints powered by highly optimized Express routers.</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. Workflow Section */}
      <section className="relative py-32 border-b border-white/[0.05]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20">
            <div className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] uppercase mb-4 text-center">03 // Pipeline Sequence</div>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-white tracking-tight text-center">Structured Industrial Workflow</h2>
          </motion.div>
          
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-white/[0.05] z-0"></div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-4 gap-8 md:gap-4 relative z-10">
              {[
                { step: '01', title: 'Data Ingestion', sub: 'Teacher pushes raw CSV logs.' },
                { step: '02', title: 'Sanitization', sub: 'Backend strips malformed rows.' },
                { step: '03', title: 'Inference', sub: 'Models run heuristic checks.' },
                { step: '04', title: 'Visualization', sub: 'UI binds data to Recharts.' }
              ].map((s, i) => (
                <motion.div key={i} variants={fadeUp} className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 bg-[#020202] border border-white/[0.1] text-white font-mono text-[12px] flex items-center justify-center mb-6 group-hover:border-white transition-colors duration-500 relative">
                    {/* Micro crosshairs */}
                    <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-zinc-500"></span>
                    <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-zinc-500"></span>
                    {s.step}
                  </div>
                  <h4 className="font-mono text-[12px] uppercase tracking-widest text-white mb-3">{s.title}</h4>
                  <p className="text-[13px] text-zinc-500 font-light">{s.sub}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Analytics Section */}
      <section className="relative py-32 border-b border-white/[0.05] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }} className="order-2 lg:order-1 relative flex justify-center items-center h-[400px] bg-white/[0.01] border border-white/[0.05]">
             {/* Architectural Data Rings */}
             <div className="relative flex items-center justify-center w-full h-full">
                <svg className="absolute w-[80%] h-[80%] opacity-20 animate-[spin_60s_linear_infinite]" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="0.2" strokeDasharray="2 4" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="white" strokeWidth="0.2" strokeDasharray="1 6" />
                </svg>
                
                <svg className="absolute w-[60%] h-[60%] opacity-50 animate-[spin_40s_linear_infinite_reverse]" viewBox="0 0 100 100">
                  <path d="M50 2 a 48 48 0 0 1 48 48" fill="none" stroke="white" strokeWidth="0.5" />
                  <path d="M50 98 a 48 48 0 0 1 -48 -48" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3"/>
                </svg>

                <div className="z-10 text-center">
                  <div className="font-display text-7xl font-light text-white tracking-tighter mb-2">92<span className="text-2xl text-zinc-600">%</span></div>
                  <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-500 border-t border-white/[0.1] pt-2">Class Average</div>
                </div>
             </div>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="order-1 lg:order-2">
            <motion.div variants={fadeUp} className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] uppercase mb-4">04 // Data Topology</motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-medium text-white mb-6 tracking-tight">Definitive Realtime Analytics</motion.h2>
            <motion.p variants={fadeUp} className="text-zinc-500 font-light text-[15px] leading-relaxed">No mock structures. When datasets arrive at the server, analytical geometry is derived instantly and broadcasted via static REST topologies, passing strictly through isolated memory environments.</motion.p>
          </motion.div>
        </div>
      </section>

      {/* 6. Security Section */}
      <section id="security" className="relative py-32 border-b border-white/[0.05]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
           <div className="max-w-3xl mb-20">
             <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
               <ShieldCheck className="w-12 h-12 text-zinc-400 mb-8 stroke-[1px]" />
             </motion.div>
             <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-4xl md:text-5xl font-medium text-white mb-6 tracking-tight">Institutional Compliance</motion.h2>
             <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-500 font-light text-[15px] leading-relaxed">Security isn't a feature, it's the foundation. Protected perimeters ensure zero student-access vulnerabilities.</motion.p>
           </div>
           
           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-8">
             {[
               { icon: Lock, title: 'JWT Bearer Enclaves', desc: 'Every route strictly requires HTTP auth validation through our global middleware stack.' },
               { icon: Workflow, title: 'Student UI Omitted', desc: 'By intentionally omitting student login gateways, we eliminate lateral movement vectors.' },
               { icon: Database, title: 'Isolated Process Logs', desc: 'Admin dashboards automatically track and persist all systemic mutations for audit trails.' }
             ].map((item, idx) => (
               <motion.div key={idx} variants={fadeUp} className="border-l border-white/[0.1] pl-6 py-2">
                 <item.icon className="w-5 h-5 text-zinc-300 mb-6 stroke-[1.5px]" />
                 <h4 className="font-mono text-[12px] uppercase tracking-widest text-white mb-3">{item.title}</h4>
                 <p className="text-[13px] text-zinc-500 font-light leading-relaxed">{item.desc}</p>
               </motion.div>
             ))}
           </motion.div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="relative py-40 overflow-hidden">
        {/* Subtle grid accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-[#020202] to-[#020202]"></div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-[800px] mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <motion.div variants={fadeUp} className="w-px h-16 bg-gradient-to-b from-transparent to-white/[0.2] mb-12"></motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-6xl font-medium text-white mb-6 tracking-tight">Ready to integrate?</motion.h2>
          <motion.p variants={fadeUp} className="text-zinc-500 text-[15px] mb-12 max-w-xl font-light leading-relaxed">Deploy the internal infrastructure instantly and grant access to your verified academic teams.</motion.p>
          
          <motion.div variants={fadeUp}>
            <Link to="/register" className="relative group inline-flex items-center justify-center bg-white text-black px-8 py-4 overflow-hidden">
              <span className="font-mono text-[12px] uppercase tracking-[0.2em] font-bold relative z-10 group-hover:text-white transition-colors duration-300">Create Root Account</span>
              <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              {/* Corner accents */}
              <span className="absolute top-1 left-1 w-1 h-1 bg-black group-hover:bg-white z-20 transition-colors"></span>
              <span className="absolute top-1 right-1 w-1 h-1 bg-black group-hover:bg-white z-20 transition-colors"></span>
              <span className="absolute bottom-1 left-1 w-1 h-1 bg-black group-hover:bg-white z-20 transition-colors"></span>
              <span className="absolute bottom-1 right-1 w-1 h-1 bg-black group-hover:bg-white z-20 transition-colors"></span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}