import { useEffect, useState, useRef, useMemo } from "react";
import { fetchApi } from "../lib/api";
import { Upload, Activity, Database, GitMerge, Loader2, FileCode2, Zap, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function TrainerDashboard() {
  const [models, setModels] = useState<any[]>([]);
  const [logs, setLogs] = useState([]);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  
  // Model Chart States
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

  // Evaluation States
  const [evalInput, setEvalInput] = useState('');
  const [evalExpected, setEvalExpected] = useState('');
  const [evalOutput, setEvalOutput] = useState('');
  const [evalScore, setEvalScore] = useState<number | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const fetchDashboardData = () => {
    fetchApi('/trainer/dashboard').then((data: any) => {
      const activeModels = data.models || [];
      setModels(activeModels);
      if (activeModels.length > 0 && !selectedModelId) {
        setSelectedModelId(activeModels[0]._id);
      }
      setLogs(data.logs || []);
    }).catch(console.error);
  };

  const selectedModel = useMemo(() => models.find(m => m._id === selectedModelId), [models, selectedModelId]);

  // Generate progression timeline based on the actual model's training history
  const chartData = useMemo(() => {
    if (!selectedModel || !selectedModel.trainingHistory || selectedModel.trainingHistory.length === 0) {
      if (!selectedModel) return [];
      return [{ epoch: 'Initial', acc: selectedModel.accuracy || 0 }];
    }
    
    return selectedModel.trainingHistory.map((h: any) => ({
      epoch: h.epoch,
      acc: h.accuracy
    }));
  }, [selectedModel]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleTrain = async (e: any) => {
    e.preventDefault();
    if (isTraining) return;

    setIsTraining(true);
    setTrainingProgress(25);
    setShowSuccessToast(false);

    try {
      await fetchApi('/trainer/train', {
        method: "POST",
        body: JSON.stringify({ dataset: "Historic Feedback Corpus v2", modelId: selectedModelId })
      });
      
      setTrainingProgress(100);
      setTimeout(() => {
        setIsTraining(false);
        setTrainingProgress(0);
        fetchDashboardData(); // Refresh logs to show training completed
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 5000);
      }, 500);

    } catch (error) {
      console.error(error);
      setIsTraining(false);
      setTrainingProgress(0);
      alert("Failed to start training job.");
    }
  };

  const handleEvaluate = async (e: any) => {
    e.preventDefault();
    if (!evalInput) return alert("Please enter test context data.");
    
    setIsEvaluating(true);
    setEvalOutput('');
    setEvalScore(null);
    
    try {
      const result = await fetchApi('/trainer/evaluate', {
        method: 'POST',
        body: JSON.stringify({ testData: evalInput, expectedOutput: evalExpected })
      });
      setEvalOutput(result.actualOutput);
      if (evalExpected) {
        setEvalScore(result.similarity);
      }
      fetchDashboardData(); // Refresh logs
    } catch (error: any) {
      alert("Evaluation failed: " + error.message);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-[1200px] w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pb-12"
    >

      <div className="md:col-span-1 bg-white p-6 md:p-8 rounded-[24px] border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-fit relative overflow-hidden">
        {/* Subtle background progress fill */}
        {isTraining && (
          <div 
            className="absolute left-0 bottom-0 top-0 bg-indigo-50/50 z-0 transition-all duration-300 ease-out"
            style={{ width: `${trainingProgress}%` }}
          />
        )}
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="bg-indigo-50 p-3 rounded-xl w-fit mb-5">
             <Database className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="font-display font-bold text-zinc-900 text-[18px] mb-2 tracking-tight">
            Execute Training Job
          </h3>
          <p className="text-[13px] font-medium text-zinc-500 mb-6 leading-relaxed">Submit the active dataset payload to trigger deep learning optimization sequences.</p>
          
          <div className={`border-2 border-dashed rounded-[16px] p-8 text-center bg-zinc-50 flex flex-col items-center mb-6 transition-colors ${isTraining ? 'border-indigo-300 bg-indigo-50 cursor-default' : 'border-zinc-200 hover:border-indigo-300 hover:bg-indigo-50/50 cursor-pointer group'}`}>
            <div className={`p-3 bg-white border border-zinc-200 rounded-full mb-3 shadow-sm transition-transform ${isTraining ? 'scale-110 border-indigo-200 ring-4 ring-indigo-50/50' : 'group-hover:scale-110'}`}>
              {isTraining ? <Loader2 className="h-5 w-5 text-indigo-600 animate-spin" /> : <Upload className="h-5 w-5 text-indigo-500" />}
            </div>
            <p className="text-[14px] font-bold text-zinc-700 mb-1">{isTraining ? 'Training Active' : 'Select Dataset'}</p>
            {isTraining ? (
              <div className="w-full mt-3">
                <div className="flex justify-between text-[11px] font-bold text-indigo-600 uppercase tracking-widest mb-2">
                  <span>Epoch Progress</span>
                  <span>{trainingProgress}%</span>
                </div>
                <div className="w-full bg-indigo-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${trainingProgress}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <p className="text-[12px] font-medium text-zinc-400">or drag and drop it here</p>
            )}
          </div>
          
          <button 
            onClick={handleTrain} 
            disabled={isTraining}
            className="w-full mt-auto bg-zinc-900 text-white px-4 py-3.5 rounded-xl text-[14px] font-semibold hover:bg-zinc-800 transition shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isTraining ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Processing...
              </>
            ) : "Submit Batch Job"}
          </button>
        </div>
      </div>

      <div id="performance-metrics-section" className="md:col-span-2 bg-white p-6 md:p-8 rounded-[24px] border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-fit">
        <div className="flex items-center gap-3 mb-6">
           <div className="bg-indigo-50 p-2 rounded-lg">
             <GitMerge className="w-5 h-5 text-indigo-600" />
           </div>
           <div>
             <h3 className="font-display font-bold text-zinc-900 text-[18px] tracking-tight">Active Models</h3>
             <p className="text-[13px] font-medium text-zinc-500 mt-0.5">Track precision rates mapped across production models.</p>
           </div>
        </div>

        {models.length === 0 ? (
          <div className="text-center py-12 border border-zinc-100 rounded-[16px] bg-zinc-50/50">
             <div className="text-[14px] font-medium text-zinc-500 italic">No models actively tracking metrics.</div>
          </div>
        ) : (
          <div className="flex flex-col xl:flex-row gap-6">
            <div className="space-y-4 xl:w-1/2 overflow-y-auto max-h-[300px] custom-scrollbar pr-2">
              {models.map((m: any) => (
                <div 
                  key={m._id} 
                  onClick={() => setSelectedModelId(m._id)}
                  className={`flex justify-between items-center p-5 rounded-2xl border transition-colors cursor-pointer group ${selectedModelId === m._id ? 'bg-indigo-50 border-indigo-200' : 'bg-zinc-50/50 border-zinc-100/80 hover:bg-zinc-50 hover:border-zinc-200'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${m.isActive ? 'bg-emerald-500 shadow-[0_0_8px_rgb(16,185,129)]' : 'bg-zinc-300'}`}></div>
                    <div>
                      <div className={`font-bold text-[15px] tracking-tight flex items-center gap-2 ${selectedModelId === m._id ? 'text-indigo-900' : 'text-zinc-900'}`}>
                        {m.name} 
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest ${selectedModelId === m._id ? 'text-indigo-700 bg-indigo-100 border border-indigo-200' : 'text-indigo-600 bg-indigo-50 border border-indigo-100'}`}>
                          v{m.version}
                        </span>
                      </div>
                      <div className={`text-[12px] font-medium mt-1 ${selectedModelId === m._id ? 'text-indigo-600/70' : 'text-zinc-500'}`}>
                        Last tuned: {new Date(m.lastTrained).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-right">
                      <div className={`font-display text-[20px] font-bold ${selectedModelId === m._id ? 'text-indigo-700' : 'text-zinc-900'}`}>
                        {m.accuracy}%
                      </div>
                      <div className={`text-[10px] font-bold uppercase tracking-widest ${selectedModelId === m._id ? 'text-indigo-400' : 'text-zinc-400'}`}>
                        Accuracy
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated historical Accuracy Trend Line Chart */}
            {selectedModel && (
              <div className="xl:w-1/2 bg-zinc-50 border border-zinc-100 rounded-2xl p-5 flex flex-col items-center justify-center">
                <div className="w-full flex justify-between items-center mb-6">
                   <h4 className="font-bold text-[13px] text-zinc-700 tracking-tight flex items-center gap-2">
                     Optimization Trajectory 
                     <span className="text-[10px] uppercase text-zinc-400 tracking-widest">({selectedModel.name})</span>
                   </h4>
                   <div className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                     Peak: {selectedModel.accuracy}%
                   </div>
                </div>
                
                <div className="w-full h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="epoch" tick={{fontSize: 10, fill: '#A1A1AA'}} tickLine={false} axisLine={false} dy={5} />
                      <YAxis domain={['auto', 'auto']} tick={{fontSize: 10, fill: '#A1A1AA'}} tickLine={false} axisLine={false} dx={-5} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', fontSize: '12px', fontWeight: 'bold', color: '#18181B' }}
                        itemStyle={{ color: '#6366f1' }}
                        cursor={{ stroke: '#E4E4E7', strokeWidth: 2, strokeDasharray: '4 4' }}
                      />
                      <Area type="monotone" dataKey="acc" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorAcc)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="md:col-span-3 bg-white p-6 md:p-8 rounded-[24px] border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-center gap-3 mb-6">
           <div className="bg-indigo-50 p-2 rounded-lg">
             <FileCode2 className="w-5 h-5 text-indigo-600" />
           </div>
           <div>
             <h3 className="font-display font-bold text-zinc-900 text-[18px] tracking-tight">Model Playbox & Output Evaluation</h3>
             <p className="text-[13px] font-medium text-zinc-500 mt-0.5">Test real-time model inferences and cross-verify actual text outputs before pipeline integration.</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-[12px] font-bold text-zinc-700 uppercase tracking-widest mb-2">Student Context / Test Input Data *</label>
              <textarea 
                rows={4}
                value={evalInput}
                onChange={(e) => setEvalInput(e.target.value)}
                placeholder="e.g. Test Score: 45%. Major concepts missed: Photosynthesis, Cell Division."
                className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-[13px] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none shadow-sm"
              />
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="block text-[12px] font-bold text-zinc-700 uppercase tracking-widest">Expected Output (Optional)</label>
                <span className="text-[10px] text-zinc-400 font-medium tracking-wide">For similarity diff</span>
              </div>
              <textarea 
                rows={3}
                value={evalExpected}
                onChange={(e) => setEvalExpected(e.target.value)}
                placeholder="What exactly should the AI reply with?"
                className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-[13px] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none shadow-sm"
              />
            </div>
            <button 
              onClick={handleEvaluate} 
              disabled={isEvaluating || !evalInput}
              className="bg-indigo-600 text-white px-5 py-3 rounded-xl text-[14px] font-semibold hover:bg-indigo-700 transition shadow-[0_4px_14px_0_rgb(79,70,229,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 w-fit"
            >
              {isEvaluating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
              Run Inference
            </button>
          </div>

          {/* Results Pane */}
          <div className="bg-zinc-900 rounded-[20px] p-6 lg:p-8 flex flex-col text-zinc-100 shadow-[0_12px_40px_rgb(0,0,0,0.12)]">
            <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Model Output Comparison
            </h4>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
               <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-5 overflow-y-auto max-h-[220px] custom-scrollbar relative">
                 <div className="absolute top-3 right-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Expected</div>
                 {evalExpected ? (
                   <span className="text-[13px] leading-relaxed text-zinc-300 mt-2 block">{evalExpected}</span>
                 ) : (
                   <span className="text-zinc-600 font-mono text-[13px] mt-2 block">No expected output provided.</span>
                 )}
               </div>

               <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-5 overflow-y-auto max-h-[220px] custom-scrollbar relative">
                 <div className="absolute top-3 right-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Actual</div>
                 {evalOutput ? (
                   <span className="text-[13px] leading-relaxed text-zinc-100 mt-2 block">{evalOutput}</span>
                 ) : (
                   <span className="text-zinc-600 font-mono text-[13px] mt-2 block">Awaiting inference execution...</span>
                 )}
               </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 mt-auto">
              <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50">
                <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-1">Compute Time</div>
                <div className="font-mono text-[18px] text-zinc-100">
                  {evalOutput ? '1.24s' : '--'}
                </div>
              </div>
              <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50 relative overflow-hidden">
                <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-1">Similarity Match</div>
                <div className={`font-mono text-[18px] ${evalScore !== null && evalScore > 75 ? 'text-emerald-400' : evalScore !== null && evalScore > 40 ? 'text-amber-400' : evalOutput ? 'text-rose-400' : 'text-zinc-100'}`}>
                  {evalScore !== null ? `${evalScore}%` : evalOutput ? 'N/A' : '--'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div id="telemetry-section" className="md:col-span-3 bg-white rounded-[24px] border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="px-8 py-5 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
          <h3 className="font-display font-bold text-zinc-900 text-[16px] tracking-tight flex items-center gap-2">
            <Activity className="w-4 h-4 text-zinc-400" /> Process Telemetry
          </h3>
        </div>
        <div className="p-8">
          <div className="flex flex-col gap-6">
            {logs.length === 0 ? (
              <div className="text-center text-[14px] font-medium text-zinc-500 py-6">No recent telemetry packets.</div>
            ) : (
              logs.map((log: any, index: number) => {
                const colors = ['bg-indigo-500', 'bg-emerald-500', 'bg-amber-500'];
                const color = colors[index % colors.length];
                return (
                  <div key={log._id} className="flex gap-4 items-start group">
                    <div className={`w-1.5 h-1.5 mt-2 rounded-full ring-4 ring-zinc-50 ${color} group-hover:scale-125 transition-transform`}></div>
                    <div>
                      <div className="text-[14px] font-bold text-zinc-900">{log.action}</div>
                      <div className="text-[12px] font-medium text-zinc-500 mt-1 tracking-tight">
                        <span className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest mr-2">{new Date(log.createdAt).toLocaleString()}</span>
                        {typeof log.details === 'string' ? log.details : JSON.stringify(log.details)}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-zinc-800 shadow-2xl rounded-2xl p-4 md:p-5 flex flex-col gap-3 min-w-[300px] max-w-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500/10 p-2 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-[14px]">Training Complete</h4>
                  <p className="text-zinc-400 text-[12px] mt-0.5">Model optimization finished successfully.</p>
                </div>
              </div>
              <button onClick={() => setShowSuccessToast(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-4 mt-1 ml-[44px]">
              <button 
                onClick={() => {
                  setShowSuccessToast(false);
                  document.getElementById('performance-metrics-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[12px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                View Performance Metrics
              </button>
              <div className="w-1 h-1 bg-zinc-700 rounded-full"></div>
              <button 
                onClick={() => {
                  setShowSuccessToast(false);
                  document.getElementById('telemetry-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[12px] font-bold text-zinc-500 hover:text-zinc-400 transition-colors"
              >
                Telemetry Logs
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
