import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { BrainCircuit, BookOpen, BarChart3, ChevronRight, CheckCircle2, ShieldCheck, Activity, Database, Workflow, Lock, Zap } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans selection:bg-indigo-500/20 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-100 pointer-events-none" />
      
      {/* Navigation */}
      <nav className="border-b border-zinc-200/60 bg-white/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-sm">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-[22px] text-zinc-900 tracking-tight">
              EDU-AI
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[14px] font-medium text-zinc-500">
            <a href="#features" className="hover:text-zinc-900 transition-colors">Platform</a>
            <a href="#architecture" className="hover:text-zinc-900 transition-colors">Architecture</a>
            <a href="#security" className="hover:text-zinc-900 transition-colors">Security</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-[14px] font-semibold text-zinc-600 hover:text-zinc-900 transition-colors">
              Management Login
            </Link>
            <Link to="/register" className="bg-zinc-900 hover:bg-zinc-800 text-white text-[14px] font-semibold px-5 py-2.5 rounded-full transition-all shadow-[0_4px_14px_0_rgb(0,0,0,0.1)]">
              Deploy
            </Link>
          </div>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <main className="relative z-10 w-full overflow-visible border-b border-zinc-200/80 pb-20">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-50/50 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-[1200px] mx-auto px-6 pt-32 lg:pt-40 relative">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-zinc-200 text-zinc-600 text-[11px] font-bold uppercase tracking-widest mb-8 shadow-sm">
                <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                Zhipu / Gemini Multi-Model Live
              </div>
              <h1 className="font-display text-5xl md:text-[64px] font-bold text-zinc-900 leading-[1.05] mb-6 tracking-tight">
                Industrial-grade<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
                  educational analytics.
                </span>
              </h1>
              <p className="text-lg text-zinc-500 mb-10 leading-relaxed font-medium">
                Enterprise architecture uniting AI Trainers, Educators, and Administrators. We process raw academic datasets natively, strictly without student-facing endpoints to ensure data sovereignty.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="inline-flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-full transition-all shadow-[0_4px_14px_0_rgb(79,70,229,0.39)]">
                  Initialize Environment
                  <ChevronRight className="w-4 h-4 text-indigo-200" />
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.1 }} className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-blue-50 rounded-[32px] blur-3xl transform rotate-3"></div>
              <div className="relative bg-white/80 backdrop-blur border border-zinc-200/60 rounded-[24px] p-6 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between mb-8 border-b border-zinc-100 pb-4">
                  <div className="flex gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-zinc-200"></div><div className="w-3.5 h-3.5 rounded-full bg-zinc-200"></div><div className="w-3.5 h-3.5 rounded-full bg-zinc-200"></div>
                  </div>
                  <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest bg-zinc-100 px-3 py-1.5 rounded-full border border-zinc-200/50">Node Runtime</div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-zinc-100 shadow-sm">
                    <div className="p-2 bg-rose-50 rounded-xl text-rose-500"><Activity className="w-5 h-5" /></div>
                    <div>
                      <div className="text-[14px] font-bold text-zinc-900 mb-0.5">Automated Ingestion</div>
                      <div className="text-[12px] text-zinc-500 font-medium leading-relaxed">Processing 2,400 structured rows via secure memory streams.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-zinc-100 shadow-sm relative overflow-hidden">
                    <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600 relative"><BrainCircuit className="w-5 h-5" /></div>
                    <div className="relative">
                      <div className="text-[14px] font-bold text-zinc-900 mb-0.5">Model Output Generated</div>
                      <div className="text-[12px] text-zinc-500 font-medium leading-relaxed">Similarity index locked at 98.2% against targeted heuristics.</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* 2. Platform Capabilities Section */}
      <section id="features" className="relative bg-white py-24 border-b border-zinc-200/80">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-zinc-900 mb-4 tracking-tight">Enterprise Role Segregation</h2>
            <p className="text-zinc-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">Strict access controls ensuring only authorized faculty and engineers interact with sensitive data.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-zinc-50 p-8 rounded-[24px] border border-zinc-200/80 hover:border-indigo-200 transition-colors">
              <BarChart3 className="w-8 h-8 text-indigo-600 mb-6" />
              <h3 className="font-display text-xl font-bold text-zinc-900 mb-3 tracking-tight">Administrators</h3>
              <ul className="space-y-3 text-[14px] font-medium text-zinc-600 mt-6">
                <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5"/> Global telemetry & RBAC oversight</li>
                <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5"/> Node health & API state management</li>
              </ul>
            </div>
            <div className="bg-zinc-50 p-8 rounded-[24px] border border-zinc-200/80 hover:border-rose-200 transition-colors">
              <BookOpen className="w-8 h-8 text-rose-600 mb-6" />
              <h3 className="font-display text-xl font-bold text-zinc-900 mb-3 tracking-tight">Educators</h3>
              <ul className="space-y-3 text-[14px] font-medium text-zinc-600 mt-6">
                <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-rose-500 mt-0.5"/> Direct CSV/Dataset ingestion</li>
                <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-rose-500 mt-0.5"/> Real-time aggregation of student metrics</li>
              </ul>
            </div>
            <div className="bg-zinc-50 p-8 rounded-[24px] border border-zinc-200/80 hover:border-emerald-200 transition-colors">
              <BrainCircuit className="w-8 h-8 text-emerald-600 mb-6" />
              <h3 className="font-display text-xl font-bold text-zinc-900 mb-3 tracking-tight">AI Trainers</h3>
              <ul className="space-y-3 text-[14px] font-medium text-zinc-600 mt-6">
                <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5"/> Model output evaluation & parsing</li>
                <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5"/> Fine-tuning heuristics & similarity mapping</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Architecture Section */}
      <section id="architecture" className="relative bg-[#FAFAFA] py-24 border-b border-zinc-200/80">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-4xl font-bold text-zinc-900 mb-4 tracking-tight">Pluggable LLM Architecture</h2>
            <p className="text-zinc-600 font-medium text-lg leading-relaxed mb-6">Built to interface with Zhipu GLM-4, Google Gemini, and custom enterprise models. We handle the vector routing locally.</p>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <Database className="w-6 h-6 text-indigo-600 mt-1" />
                <div>
                  <h4 className="font-bold text-zinc-900">Persistent Mongoose Streams</h4>
                  <p className="text-[14px] text-zinc-500">All data firmly grounded in NoSQL collections without third-party replication.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Zap className="w-6 h-6 text-amber-500 mt-1" />
                <div>
                  <h4 className="font-bold text-zinc-900">Synchronous API Handlers</h4>
                  <p className="text-[14px] text-zinc-500">Zero loading state drift. Real-time REST endpoints powered by Express.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900 rounded-[24px] p-8 shadow-2xl relative">
            <div className="text-zinc-500 font-mono text-[12px] mb-4">server/controllers/ai.controller.ts</div>
            <pre className="text-zinc-300 font-mono text-[13px] overflow-hidden">
              <code dangerouslySetInnerHTML={{ __html: `const model = await AIModel.findOne({ isActive: true });\nif (!model) throw new Error("No active models.");\n\nconst response = await fetch(model.apiDetails, {\n  method: 'POST',\n  body: JSON.stringify(payload)\n});\nreturn response.json();` }} />
            </pre>
          </div>
        </div>
      </section>

      {/* 4. Workflow Section */}
      <section className="relative bg-white py-24 border-b border-zinc-200/80">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-bold text-zinc-900 mb-16 tracking-tight">Structured Industrial Workflow</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-4 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-zinc-100 -z-10"></div>
            {[
              { step: '01', title: 'Data Ingestion', sub: 'Teacher pushes raw CSV logs.' },
              { step: '02', title: 'Sanitization', sub: 'Backend strips malformed rows.' },
              { step: '03', title: 'Inference', sub: 'Models run heuristic checks.' },
              { step: '04', title: 'Visualization', sub: 'UI binds data to Recharts.' }
            ].map((s, i) => (
              <div key={i} className="bg-white border border-zinc-200 p-6 rounded-2xl w-full max-w-[260px] shadow-sm flex flex-col items-center">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 font-bold font-mono rounded-full flex items-center justify-center mb-4">{s.step}</div>
                <h4 className="font-bold text-zinc-900 mb-1">{s.title}</h4>
                <p className="text-[13px] text-zinc-500">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Analytics Section */}
      <section className="relative bg-[#FAFAFA] py-24 border-b border-zinc-200/80">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 bg-white p-8 rounded-2xl shadow-sm border border-zinc-200 flex justify-center items-center">
             <div className="w-64 h-64 border-[16px] border-zinc-50 rounded-full border-t-indigo-500 border-r-blue-500 border-b-emerald-500 relative flex items-center justify-center transform -rotate-45">
               <div className="transform rotate-45 text-center">
                 <div className="font-display text-4xl font-bold text-zinc-900">92%</div>
                 <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Class Average</div>
               </div>
             </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-display text-4xl font-bold text-zinc-900 mb-4 tracking-tight">Definitive Realtime Analytics</h2>
            <p className="text-zinc-600 font-medium text-lg leading-relaxed">No mock structures. When datasets arrive at the server, analytical geometry is derived instantly and broadcasted via static REST topologies.</p>
          </div>
        </div>
      </section>

      {/* 6. Security Section */}
      <section id="security" className="relative bg-white py-24 border-b border-zinc-200/80">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
           <ShieldCheck className="w-12 h-12 text-zinc-900 mx-auto mb-6" />
           <h2 className="font-display text-4xl font-bold text-zinc-900 mb-4 tracking-tight">Institutional Compliance Standards</h2>
           <p className="text-zinc-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed mb-12">Security isn't a feature, it's the foundation. Protected perimeters ensure zero student-access vulnerabilities.</p>
           <div className="grid md:grid-cols-3 gap-6 text-left">
             <div className="p-6 bg-zinc-50 rounded-xl border border-zinc-200">
               <Lock className="w-5 h-5 text-indigo-600 mb-3" />
               <h4 className="font-bold text-zinc-900 mb-2">JWT Bearer Enclaves</h4>
               <p className="text-[13px] text-zinc-500">Every route strictly requires HTTP auth validation through our global middleware stack.</p>
             </div>
             <div className="p-6 bg-zinc-50 rounded-xl border border-zinc-200">
               <Workflow className="w-5 h-5 text-indigo-600 mb-3" />
               <h4 className="font-bold text-zinc-900 mb-2">Student Interface Omitted</h4>
               <p className="text-[13px] text-zinc-500">By intentionally omitting student login gateways, we eliminate lateral movement vectors.</p>
             </div>
             <div className="p-6 bg-zinc-50 rounded-xl border border-zinc-200">
               <Database className="w-5 h-5 text-indigo-600 mb-3" />
               <h4 className="font-bold text-zinc-900 mb-2">Isolated Process Logs</h4>
               <p className="text-[13px] text-zinc-500">Admin dashboards automatically track and persist all systemic mutations for audit trails.</p>
             </div>
           </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="relative bg-zinc-900 py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-zinc-900 to-zinc-900"></div>
        <div className="max-w-[800px] mx-auto px-6 relative z-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ready to integrate?</h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">Deploy the internal infrastructure instantly and grant access to your verified academic teams.</p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="bg-white text-zinc-900 font-bold px-8 py-4 rounded-full hover:bg-zinc-100 transition shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              Create Root Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
