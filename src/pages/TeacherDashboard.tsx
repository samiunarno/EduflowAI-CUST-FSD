import { useEffect, useState, useRef, useMemo } from "react";
import { fetchApi } from "../lib/api";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Upload, BookOpen, GraduationCap, TrendingUp, Sparkles, FileText, Loader2, UserCircle, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import AIChatbot from "../components/AIChatbot";
import { useLanguage } from "../contexts/LanguageContext";

export default function TeacherDashboard() {
  const { t } = useLanguage();
  const [students, setStudents] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const loadData = () => {
    fetchApi('/teacher/dashboard').then((data: any) => {
      setStudents(data.students || []);
      setFeedbacks(data.feedbacks || []);
    }).catch(console.error);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpload = async (e: any) => {
    e.preventDefault();
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      }
      
      await fetchApi('/teacher/students', { method: 'POST', body: formData });
      alert("Data uploaded and processed by AI!");
      setFile(null);
      loadData();
    } catch (err) {
      alert("Failed to process data.");
    } finally {
      setIsUploading(false);
    }
  };

  const avgScore = students.length > 0 ? (students.reduce((acc: any, s: any) => acc + s.marks, 0) / students.length).toFixed(1) : 0;

  // Calculate Grade Distribution
  const gradeDistribution = useMemo(() => {
    if (students.length === 0) return [];
    
    let a = 0, b = 0, c = 0, d = 0, f = 0;
    students.forEach((s: any) => {
      if (s.marks >= 90) a++;
      else if (s.marks >= 80) b++;
      else if (s.marks >= 70) c++;
      else if (s.marks >= 60) d++;
      else f++;
    });

    return [
      { name: 'Grade A (90-100)', value: a, color: '#10B981' }, // emerald-500
      { name: 'Grade B (80-89)', value: b, color: '#3B82F6' }, // blue-500
      { name: 'Grade C (70-79)', value: c, color: '#8B5CF6' }, // violet-500
      { name: 'Grade D (60-69)', value: d, color: '#F59E0B' }, // amber-500
      { name: 'Grade F (<60)', value: f, color: '#EF4444' }, // red-500
    ].filter(g => g.value > 0);
  }, [students]);

  // Student Trend Calculation
  const uniqueStudentNames = useMemo(() => Array.from(new Set(students.map((s: any) => s.name))), [students]);
  const [selectedTrendStudent, setSelectedTrendStudent] = useState<string>("");

  useEffect(() => {
    if (!selectedTrendStudent && uniqueStudentNames.length > 0) {
      setSelectedTrendStudent(uniqueStudentNames[0] as string);
    }
  }, [uniqueStudentNames, selectedTrendStudent]);

  const studentTrendData = useMemo(() => {
    if (!selectedTrendStudent || students.length === 0) return [];
    const records = students.filter((s: any) => s.name === selectedTrendStudent).sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    
    if (records.length > 1) {
      return records.map((r: any, i: number) => ({
        name: r.course || `Exam ${i+1}`,
        score: r.marks
      }));
    }
    
    const singleRecord = records[0];
    if (singleRecord && singleRecord.assignments && singleRecord.assignments.length > 0) {
      return singleRecord.assignments.map((a: any) => ({
        name: a.title,
        score: a.score
      }));
    }
    
    if (singleRecord) {
      return [
        { name: 'Latest Score', score: singleRecord.marks }
      ];
    }
    return [];
  }, [students, selectedTrendStudent]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-[1200px] w-full mx-auto flex flex-col gap-6 pb-12"
    >

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[24px] border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-4 group hover:border-zinc-300 transition-colors">
          <div className="p-4 rounded-xl bg-orange-50 text-orange-600 border border-orange-100 w-fit transition-transform group-hover:scale-105">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest">{t.dashboard.students_table}</div>
            <div className="font-display text-4xl font-bold text-zinc-900 mt-1 tracking-tight">{students.length}</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[24px] border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-4 group hover:border-zinc-300 transition-colors">
          <div className="p-4 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 w-fit transition-transform group-hover:scale-105">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest">Class Average</div>
            <div className="font-display text-4xl font-bold text-zinc-900 mt-1 tracking-tight">{avgScore}%</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[24px] border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-4 group hover:border-zinc-300 transition-colors">
          <div className="p-4 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 w-fit transition-transform group-hover:scale-105">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest">AI Insights Generated</div>
            <div className="font-display text-4xl font-bold text-zinc-900 mt-1 tracking-tight">{feedbacks.length}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-white p-6 md:p-8 rounded-[24px] border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
          <h3 className="font-display font-bold text-zinc-900 text-[18px] mb-2 tracking-tight flex items-center gap-2">
            {t.dashboard.upload_btn}
          </h3>
          <p className="text-[13px] font-medium text-zinc-500 mb-6 leading-relaxed">Drop CSV files containing student progress to generate advanced AI analytics.</p>
          
          <div className="mt-auto">
            <input 
              type="file" 
              accept=".csv"
              className="hidden" 
              ref={fileInputRef} 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed ${file ? 'border-emerald-300 bg-emerald-50/50' : 'border-zinc-200 hover:border-indigo-300 hover:bg-indigo-50/50'} transition-colors rounded-[16px] p-6 text-center cursor-pointer flex flex-col items-center mb-6 group`}
            >
              {file ? (
                 <>
                   <div className="w-10 h-10 bg-white rounded-full shadow-[0_4px_14px_0_rgb(0,0,0,0.05)] border border-emerald-200 flex items-center justify-center mb-3 text-emerald-500">
                     <FileText className="h-4 w-4" />
                   </div>
                   <p className="text-[13px] font-bold flex items-center text-zinc-700 mb-1 truncate w-full justify-center px-2">{file.name}</p>
                   <p className="text-[11px] font-medium text-emerald-600">Ready to process</p>
                 </>
              ) : (
                <>
                  <div className="w-10 h-10 bg-white rounded-full shadow-[0_4px_14px_0_rgb(0,0,0,0.05)] border border-zinc-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Upload className="h-4 w-4 text-indigo-500" />
                  </div>
                  <p className="text-[13px] font-bold flex items-center text-zinc-700 mb-1">Select CSV</p>
                  <p className="text-[11px] font-medium text-zinc-400">up to 50MB</p>
                </>
              )}
            </div>
            
            <button 
              onClick={handleUpload} 
              disabled={isUploading || !file}
              className="w-full bg-zinc-900 text-white px-4 py-3 rounded-xl text-[14px] font-semibold hover:bg-zinc-800 transition shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] flex justify-center items-center gap-2 disabled:opacity-50"
            >
              {isUploading ? <Loader2 className="w-5 h-5 animate-spin"/> : 'Run Integrations'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-[24px] border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-display font-bold text-zinc-900 text-[18px] tracking-tight">Performance Distribution</h3>
              <p className="text-[13px] font-medium text-zinc-500 mt-0.5">Automated scoring base metrics from recent epochs.</p>
            </div>
          </div>
          <div className="h-[200px] w-full">
            {students.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={students} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#A1A1AA', fontWeight: 600 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#A1A1AA', fontWeight: 600 }} dx={-10} domain={[0, 100]} />
                  <Tooltip 
                    cursor={{ fill: '#FAFAFA' }} 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #E4E4E7', boxShadow: '0 12px 30px -8px rgba(0,0,0,0.08)', padding: '8px 12px', fontSize: '13px', fontWeight: 600, color: '#09090B' }} 
                  />
                  <Bar dataKey="marks" fill="#4F46E5" radius={[4, 4, 0, 0]} maxBarSize={32} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full border border-dashed border-zinc-200 rounded-2xl flex items-center justify-center bg-zinc-50">
                <span className="text-[13px] font-medium text-zinc-400">Upload data to visualize performance</span>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 bg-white p-6 md:p-8 rounded-[24px] border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-display font-bold text-zinc-900 text-[18px] tracking-tight">Grade Analytics</h3>
              <p className="text-[13px] font-medium text-zinc-500 mt-0.5">Student tier mapping.</p>
            </div>
          </div>
          <div className="h-[220px] w-full relative">
            {gradeDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="45%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #E4E4E7', boxShadow: '0 12px 30px -8px rgba(0,0,0,0.08)', padding: '8px 12px', fontSize: '13px', fontWeight: 600 }}
                  />
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center"
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: '11px', fontWeight: 600, color: '#52525B', paddingTop: '10px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-[200px] border border-dashed border-zinc-200 rounded-2xl flex items-center justify-center bg-zinc-50 leading-relaxed text-center px-4">
                <span className="text-[13px] font-medium text-zinc-400">Awaiting dataset pipeline</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-[24px] border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-6">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <h3 className="font-display font-bold text-zinc-900 text-[18px] tracking-tight flex items-center gap-2">
              <Activity className="w-4 h-4 text-zinc-400" />
              Student Trajectory Analysis
            </h3>
            <p className="text-[13px] font-medium text-zinc-500 mt-0.5">Visualize scoring trends over historical epochs.</p>
          </div>
          <div className="relative">
            <select
              value={selectedTrendStudent}
              onChange={(e) => setSelectedTrendStudent(e.target.value)}
              className="appearance-none bg-zinc-50 border border-zinc-200 text-zinc-700 py-2 pl-4 pr-10 rounded-xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer min-w-[200px] shadow-sm transition-colors hover:bg-white"
            >
              {uniqueStudentNames.length > 0 ? (
                uniqueStudentNames.map((name: any, idx) => (
                  <option key={idx} value={name}>{name}</option>
                ))
              ) : (
                <option value="">No students available</option>
              )}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        <div className="h-[220px] w-full">
          {studentTrendData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={studentTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#A1A1AA', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#A1A1AA', fontWeight: 600 }} dx={-10} domain={[0, 100]} />
                <Tooltip 
                  cursor={{ stroke: '#F4F4F5', strokeWidth: 2 }} 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E4E4E7', boxShadow: '0 12px 30px -8px rgba(0,0,0,0.08)', padding: '8px 12px', fontSize: '13px', fontWeight: 600, color: '#09090B' }} 
                />
                <Line type="monotone" dataKey="score" stroke="#4F46E5" strokeWidth={3} dot={{ r: 4, fill: '#4F46E5', strokeWidth: 2, stroke: '#FFFFFF' }} activeDot={{ r: 6, fill: '#4F46E5', strokeWidth: 0 }} animationDuration={1000} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full border border-dashed border-zinc-200 rounded-2xl flex items-center justify-center bg-zinc-50">
              <span className="text-[13px] font-medium text-zinc-400">Upload dataset to visualize historical trends</span>
            </div>
          )}
        </div>
      </div>

        <div className="bg-white rounded-[24px] border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="px-8 py-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
          <div>
            <h3 className="font-display font-bold text-zinc-900 text-[18px] tracking-tight">{t.dashboard.students_table}</h3>
            <p className="text-[13px] font-medium text-zinc-500 mt-0.5">Individual semantic assessments generated by the pipeline.</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left text-[11px] font-bold text-zinc-400 pb-4 pt-6 pl-8 uppercase tracking-widest bg-white">Student Info</th>
                <th className="text-left text-[11px] font-bold text-zinc-400 pb-4 pt-6 uppercase tracking-widest bg-white w-[15%]">Subject</th>
                <th className="text-left text-[11px] font-bold text-zinc-400 pb-4 pt-6 uppercase tracking-widest bg-white w-[50%]">Generated Insight Analysis</th>
                <th className="text-right text-[11px] font-bold text-zinc-400 pb-4 pt-6 pr-8 uppercase tracking-widest bg-white">Score</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 border-t border-zinc-100 text-center text-[14px] font-medium text-zinc-500 italic">Upload a dataset to generate insights.</td>
                </tr>
              ) : (
                feedbacks.map((fb: any, idx) => (
                  <tr key={fb._id} className="hover:bg-zinc-50/80 transition-colors group align-top">
                    <td className="py-5 border-t border-zinc-50 pl-8">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 shrink-0">
                           <UserCircle className="w-5 h-5" />
                         </div>
                         <div className="font-bold text-[14px] text-zinc-900 mt-0.5">{fb.studentId?.name || "Unknown"}</div>
                       </div>
                    </td>
                    <td className="py-5 border-t border-zinc-50">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-bold uppercase tracking-widest border border-indigo-100 text-[10px] mt-1">
                        {fb.course}
                      </span>
                    </td>
                    <td className="py-5 text-[13px] font-medium border-t border-zinc-50 text-zinc-600 leading-relaxed pr-6">
                      <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 shadow-sm group-hover:bg-white transition-colors whitespace-pre-wrap break-words max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-xl max-h-[120px] overflow-y-auto custom-scrollbar relative">
                        {fb.content}
                      </div>
                    </td>
                    <td className="py-5 border-t border-zinc-50 pr-8 text-right">
                      {fb.studentId?.marks !== undefined && (
                        <div className={`font-mono text-[16px] font-bold mt-1 ${fb.studentId.marks >= 80 ? 'text-emerald-600' : fb.studentId.marks >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>
                          {fb.studentId.marks}%
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Interactive AI Analytics Assistant */}
      <AIChatbot students={students} feedbacks={feedbacks} />
    </motion.div>
  );
}
