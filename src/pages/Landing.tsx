import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { BrainCircuit, BookOpen, BarChart3, ChevronRight, CheckCircle2, ShieldCheck, Activity, Database, Workflow, Lock, Zap, Languages, Globe, Cpu, Layers } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Landing() {
  const { t, language, setLanguage } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans selection:bg-indigo-500/20 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-100 pointer-events-none" />
      
      {/* 1. Navigation */}
      <nav className="border-b border-zinc-200/60 bg-white/70 backdrop-blur-2xl sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-[80px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-zinc-900 p-2.5 rounded-2xl shadow-xl transform hover:rotate-6 transition-transform">
              <BrainCircuit className="w-6 h-6 text-indigo-400" />
            </div>
            <span className="font-display font-black text-[24px] text-zinc-900 tracking-tighter uppercase italic">
              EDU-AI
            </span>
          </div>
          
          <div className="hidden lg:flex items-center gap-10 text-[13px] font-bold text-zinc-400 uppercase tracking-widest">
            <a href="#features" className="hover:text-zinc-900 transition-colors">{t.nav.platform}</a>
            <a href="#architecture" className="hover:text-zinc-900 transition-colors">{t.nav.architecture}</a>
            <a href="#security" className="hover:text-zinc-900 transition-colors">{t.nav.security}</a>
            <a href="#pricing" className="hover:text-zinc-900 transition-colors">{t.pricing?.title || "Pricing"}</a>
          </div>

          <div className="flex items-center gap-4">
             <button 
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-zinc-200 text-zinc-600 text-[12px] font-bold hover:bg-zinc-50 transition-colors"
            >
              <Globe className="w-4 h-4 text-indigo-500" />
              <span>{language === 'en' ? 'EN' : 'ZH'}</span>
            </button>
            <Link to="/login" className="text-[14px] font-bold text-zinc-600 hover:text-zinc-900 px-4 py-2">
              {t.nav.login}
            </Link>
            <Link to="/register" className="bg-zinc-900 hover:bg-zinc-800 text-white text-[14px] font-bold px-7 py-3 rounded-full transition-all shadow-2xl hover:scale-105 active:scale-95">
              {t.nav.deploy}
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-40 lg:pb-48 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200/60 text-zinc-800 text-[12px] font-black uppercase tracking-widest mb-10 shadow-sm ring-4 ring-zinc-50">
              <Cpu className="w-4 h-4 text-indigo-600" />
              {t.hero.badge}
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="font-display text-6xl md:text-[88px] font-black text-zinc-900 leading-[0.95] mb-8 tracking-tighter italic">
              {t.hero.title_part1} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-500">
                {t.hero.title_part2}
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-[18px] md:text-[22px] text-zinc-500 mb-12 leading-relaxed font-semibold max-w-2xl mx-auto">
              {t.hero.description}
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/register" className="group bg-indigo-600 hover:bg-indigo-700 text-white font-black px-10 py-5 rounded-full flex items-center justify-center gap-3 transition-all shadow-[0_20px_50px_rgba(79,70,229,0.25)] hover:-translate-y-1">
                {t.hero.cta}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex items-center gap-6 justify-center">
                <div className="flex -space-x-3">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-zinc-200 flex items-center justify-center text-[10px] font-bold text-zinc-500 shadow-sm overflow-hidden ring-1 ring-zinc-100">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="user" className="w-full h-full object-cover" />
                     </div>
                   ))}
                </div>
                <div className="text-left leading-none">
                  <div className="text-[14px] font-black text-zinc-900">4,200+</div>
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">Faculty Deployments</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Stats Section */}
      <section className="bg-zinc-900 py-16">
        <div className="max-w-[1400px] mx-auto px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-x divide-zinc-800">
             {[
               { val: "99.9%", label: t.landing?.stats?.uptime || "SYSTEM UPTIME" },
               { val: "98.2%", label: t.landing?.stats?.accuracy || "PREDICTION DELTA" },
               { val: "2.5s", label: t.landing?.stats?.efficiency || "PROCESSING LATENCY" },
               { val: "100%", label: "DATA SOVEREIGNTY" }
             ].map((s, i) => (
               <div key={i} className="pl-8 first:pl-0 border-l border-zinc-800 first:border-0">
                 <div className="text-3xl font-black text-white mb-1">{s.val}</div>
                 <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">{s.label}</div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 4. AI Analysis Showcase */}
      <section className="py-32 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-zinc-100 rounded-[40px] -rotate-2 -z-10" />
            <div className="bg-white border-2 border-zinc-900 p-8 rounded-[32px] shadow-[24px_24px_0_0_rgba(0,0,0,0.03)] overflow-hidden">
               <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                     <Layers className="w-5 h-5 text-indigo-600" />
                   </div>
                   <div className="font-bold text-[16px]">Cognitive Heatmap</div>
                 </div>
                 <div className="h-6 px-3 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full flex items-center">CALIBRATED</div>
               </div>
               <div className="space-y-6">
                 {[85, 42, 70].map((w, i) => (
                   <div key={i} className="space-y-2">
                     <div className="flex justify-between text-[11px] font-bold text-zinc-400">
                       <span className="uppercase tracking-widest">LAYER_{i+1} SEGMENT_NODE</span>
                       <span>{w}%</span>
                     </div>
                     <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full ${i === 1 ? 'bg-rose-500' : 'bg-indigo-500'}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${w}%` }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                        />
                     </div>
                   </div>
                 ))}
               </div>
               <div className="mt-8 pt-8 border-t border-zinc-100">
                 <div className="bg-zinc-50 p-4 rounded-2xl flex items-center gap-4 border border-zinc-200/60">
                   <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                   <p className="text-[12px] font-bold text-zinc-600">Anomaly detected: Segment_2 shows high cognitive drift.</p>
                 </div>
               </div>
            </div>
          </div>
          <div>
            <div className="inline-block px-4 py-1 bg-indigo-50 text-indigo-700 text-[11px] font-black rounded-full uppercase tracking-widest mb-6">
               Neural Forensics
            </div>
            <h2 className="font-display text-5xl font-black text-zinc-900 leading-tight mb-8 tracking-tighter uppercase italic">
              {t.landing?.showcase?.title || "Deep Neural Insights"}
            </h2>
            <p className="text-xl text-zinc-500 font-semibold mb-10 leading-relaxed">
              {t.landing?.showcase?.subtitle || "Our proprietary engine decodes raw data into trajectory forecasts."}
            </p>
            <div className="grid gap-6">
              {[
                { title: t.landing?.showcase?.card1_title, desc: t.landing?.showcase?.card1_desc, icon: BrainCircuit },
                { title: t.landing?.showcase?.card2_title, desc: t.landing?.showcase?.card2_desc, icon: Activity }
              ].map((f, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-3xl hover:bg-zinc-50 transition-colors border border-transparent hover:border-zinc-200/60 group">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                    <f.icon className="w-7 h-7 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-zinc-900 mb-1">{f.title}</h4>
                    <p className="text-[15px] font-medium text-zinc-400">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. How it Works Section */}
      <section id="architecture" className="py-32 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-24">
            <h2 className="font-display text-5xl font-black text-zinc-900 mb-6 tracking-tighter uppercase italic">{t.landing?.how_it_works?.title}</h2>
            <div className="w-24 h-1.5 bg-indigo-600 mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 lg:gap-24 relative">
             <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-zinc-200 to-transparent -translate-y-[80px]" />
             {[
               { num: "01", title: t.landing?.how_it_works?.step1, desc: t.landing?.how_it_works?.step1_desc, icon: Database },
               { num: "02", title: t.landing?.how_it_works?.step2, desc: t.landing?.how_it_works?.step2_desc, icon: Cpu },
               { num: "03", title: t.landing?.how_it_works?.step3, desc: t.landing?.how_it_works?.step3_desc, icon: BarChart3 }
             ].map((s, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.2 }}
                 className="relative z-10 text-center"
               >
                 <div className="w-20 h-20 bg-white border-4 border-zinc-100 rounded-[28px] mx-auto flex items-center justify-center text-zinc-900 shadow-2xl mb-10 transform hover:scale-110 transition-transform">
                   <s.icon className="w-9 h-9" />
                   <div className="absolute -top-3 -right-3 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[12px] font-black ring-4 ring-white">{s.num}</div>
                 </div>
                 <h4 className="text-2xl font-black text-zinc-900 mb-4">{s.title}</h4>
                 <p className="text-[16px] font-bold text-zinc-400 max-w-[240px] mx-auto leading-relaxed">{s.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 6. Professional Pricing */}
      <section id="pricing" className="py-32 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-display text-5xl font-black text-zinc-900 mb-4 tracking-tighter uppercase italic">{t.landing?.pricing?.title}</h2>
            <p className="text-zinc-500 font-bold text-lg leading-none">Scalable architecture for any institution size.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { tier: t.landing?.pricing?.free_title, price: "$0", features: ["1 Model integration", "Basic analytics", "50 Student entries"], btn: "Get Started" },
              { tier: t.landing?.pricing?.pro_title, price: "$299", popular: true, features: ["Multi-model routing", "Deep semantic insights", "Unlimited students", "CSV Batch processing"], btn: "Deploy Instance" },
              { tier: t.landing?.pricing?.enterprise_title, price: "Custom", features: ["Private cloud node", "SSO & IAM integration", "24/7 dedicated API support", "Custom ML training"], btn: "Contact Nodes" }
            ].map((p, i) => (
              <div key={i} className={`p-10 rounded-[40px] flex flex-col h-full border-2 transition-all ${p.popular ? 'bg-zinc-900 border-zinc-900 scale-105 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)]' : 'bg-white border-zinc-100'}`}>
                <div className={`text-[12px] font-black uppercase tracking-widest mb-6 ${p.popular ? 'text-indigo-400' : 'text-zinc-400'}`}>
                   {p.tier}
                </div>
                <div className={`text-5xl font-black mb-10 ${p.popular ? 'text-white' : 'text-zinc-900'}`}>{p.price}<span className="text-[18px] font-bold text-zinc-500 ml-1">/mo</span></div>
                
                <div className="flex-1 space-y-6 mb-12">
                  {p.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-4">
                      <CheckCircle2 className={`w-5 h-5 ${p.popular ? 'text-emerald-400' : 'text-indigo-600'}`} />
                      <span className={`text-[15px] font-bold ${p.popular ? 'text-zinc-300' : 'text-zinc-500'}`}>{f}</span>
                    </div>
                  ))}
                </div>

                <Link to="/register" className={`w-full py-5 rounded-2xl font-black text-center transition-all ${p.popular ? 'bg-white text-zinc-900 hover:bg-zinc-100' : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-xl'}`}>
                  {p.btn}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-[#0A0A0A] pt-32 pb-16 text-white overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
         <div className="max-w-[1400px] mx-auto px-12 relative">
            <div className="grid md:grid-cols-4 gap-24 mb-32">
               <div className="md:col-span-1">
                  <div className="flex items-center gap-3 mb-8">
                    <BrainCircuit className="w-8 h-8 text-indigo-500" />
                    <span className="font-display font-black text-2xl tracking-tighter italic">EDU-AI</span>
                  </div>
                  <p className="text-zinc-500 font-bold leading-relaxed pr-8">
                    Propelling educational workflows into the era of specialized machine learning.
                  </p>
               </div>
               
               {[
                 { title: "Core", links: ["Features", "Security", "Scale", "Ethics"] },
                 { title: "Network", links: ["Documentation", "API Reference", "Status", "Github"] },
                 { title: "Legal", links: ["Sovereignty", "Access Tiers", "Privacy", "Terms"] }
               ].map((group, idx) => (
                 <div key={idx}>
                   <h5 className="text-[14px] font-black uppercase tracking-[0.2em] mb-10 text-zinc-200">{group.title}</h5>
                   <ul className="space-y-5">
                     {group.links.map((link, j) => (
                       <li key={j}>
                         <a href="#" className="text-zinc-500 hover:text-white transition-colors font-bold text-[15px]">{link}</a>
                       </li>
                     ))}
                   </ul>
                 </div>
               ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-zinc-900">
               <div className="text-[12px] font-bold text-zinc-600 mb-6 md:mb-0">
                  © 2026 ED-TECH INDUSTRIAL CORE. ALL INFRASTRUCTURE RESERVED.
               </div>
               <div className="flex gap-10">
                 <ShieldCheck className="w-6 h-6 text-zinc-800" />
                 <Lock className="w-6 h-6 text-zinc-800" />
                 <Workflow className="w-6 h-6 text-zinc-800" />
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
