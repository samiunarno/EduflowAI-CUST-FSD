import { useEffect, useState } from "react";
import { fetchApi } from "../lib/api";
import { motion } from "framer-motion";
import { Users, Activity, ShieldCheck, Search, ChevronDown, Loader2, Database, BrainCircuit, History, Plus, CheckCircle, Circle } from "lucide-react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [models, setModels] = useState([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  
  // Pending role changes waiting for confirmation
  const [pendingRoles, setPendingRoles] = useState<Record<string, string>>({});

  // Model creation state
  const [showModelForm, setShowModelForm] = useState(false);
  const [newModel, setNewModel] = useState({ name: '', version: '', apiDetails: '' });
  const [isSubmittingModel, setIsSubmittingModel] = useState(false);

  const refreshLogs = () => {
    fetchApi('/admin/logs').then(setLogs).catch(console.error);
  };

  useEffect(() => {
    fetchApi('/admin/users').then(setUsers).catch(console.error);
    refreshLogs();
    fetchApi('/admin/models').then(setModels).catch(console.error);
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdatingId(userId);
    try {
      const updatedUsers = await fetchApi(`/admin/users/${userId}/role`, {
        method: "PUT",
        body: JSON.stringify({ role: newRole })
      });
      setUsers(updatedUsers);
      refreshLogs();
    } catch (error: any) {
      alert("Failed to update user role: " + error.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleAddModel = async (e: any) => {
    e.preventDefault();
    setIsSubmittingModel(true);
    try {
      const created = await fetchApi('/admin/models', {
        method: "POST",
        body: JSON.stringify(newModel)
      });
      setModels([created, ...models] as any);
      setShowModelForm(false);
      setNewModel({ name: '', version: '', apiDetails: '' });
      refreshLogs();
    } catch (error: any) {
      alert("Failed to add model: " + error.message);
    } finally {
      setIsSubmittingModel(false);
    }
  };

  const handleToggleModelStatus = async (modelId: string, currentStatus: boolean) => {
    try {
      const updatedModels = await fetchApi(`/admin/models/${modelId}/status`, {
        method: "PUT",
        body: JSON.stringify({ isActive: !currentStatus })
      });
      setModels(updatedModels);
      refreshLogs();
    } catch (error: any) {
      alert("Failed to update status: " + error.message);
    }
  };

  const stats = [
    { label: 'Total Accounts', value: users.length.toString(), icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100' },
    { label: 'System Uptime', value: '99.9%', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
    { label: 'Platform Logs', value: logs.length.toString(), icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-[1200px] w-full mx-auto flex flex-col gap-8 pb-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[24px] border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-4 relative overflow-hidden group hover:border-zinc-300 transition-colors">
            <div className={`p-4 rounded-xl w-fit border ${stat.bg} ${stat.color} transition-transform group-hover:scale-105`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest">{stat.label}</div>
              <div className="font-display text-4xl font-bold text-zinc-900 mt-1 tracking-tight">{stat.value}</div>
            </div>
          </div>
        ))}
        {/* AI Management Widget */}
        <div className="bg-zinc-900 p-6 rounded-[24px] border border-zinc-800 shadow-[0_12px_40px_rgb(0,0,0,0.12)] flex flex-col gap-4 relative overflow-hidden group">
          <div className="p-4 rounded-xl w-fit border bg-zinc-800 border-zinc-700 text-white transition-transform group-hover:scale-105 group-hover:bg-indigo-600 group-hover:border-indigo-500">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest">AI Hub</div>
            <div className="font-display text-[16px] font-bold text-white mt-1 leading-tight">System Models Manager</div>
          </div>
          <button 
            onClick={() => {
              document.getElementById('ai-management-section')?.scrollIntoView({ behavior: 'smooth' });
            }} 
            className="mt-auto bg-white/10 hover:bg-white/20 text-white font-semibold text-[13px] py-2 rounded-lg transition-colors border border-white/5"
          >
            Configure APIs
          </button>
        </div>
      </div>
      
      {/* AI Model Management Section */}
      <div id="ai-management-section" className="bg-white rounded-[24px] border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="px-8 py-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
          <div>
            <h3 className="font-display font-bold text-zinc-900 text-[18px] tracking-tight">AI Model Configurations</h3>
            <p className="text-[13px] font-medium text-zinc-500 mt-0.5">Manage connected language models and AI service integrations.</p>
          </div>
          <button 
            onClick={() => setShowModelForm(!showModelForm)}
            className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-lg font-semibold text-[13px] hover:bg-zinc-800 transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Model
          </button>
        </div>

        {showModelForm && (
          <div className="px-8 py-6 border-b border-zinc-100 bg-zinc-50/30">
            <form onSubmit={handleAddModel} className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 w-full relative">
                <div className="text-[12px] font-bold text-zinc-700 mb-1.5 ml-1">Model Name</div>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Gemini 1.5 Pro"
                  value={newModel.name}
                  onChange={e => setNewModel({...newModel, name: e.target.value})}
                  className="w-full bg-white border border-zinc-200 py-2.5 px-4 rounded-xl text-[14px] font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-zinc-400"
                />
              </div>
              <div className="flex-1 w-full relative">
                <div className="text-[12px] font-bold text-zinc-700 mb-1.5 ml-1">Version Ref</div>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. latest, 1.5.0"
                  value={newModel.version}
                  onChange={e => setNewModel({...newModel, version: e.target.value})}
                  className="w-full bg-white border border-zinc-200 py-2.5 px-4 rounded-xl text-[14px] font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-zinc-400"
                />
              </div>
              <div className="flex-1 w-full relative">
                <div className="text-[12px] font-bold text-zinc-700 mb-1.5 ml-1">API Endpoint / Details</div>
                <input 
                  type="text" 
                  placeholder="https://api.example.com/v1"
                  value={newModel.apiDetails}
                  onChange={e => setNewModel({...newModel, apiDetails: e.target.value})}
                  className="w-full bg-white border border-zinc-200 py-2.5 px-4 rounded-xl text-[14px] font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-zinc-400"
                />
              </div>
              <button 
                type="submit"
                disabled={isSubmittingModel}
                className="bg-indigo-600 text-white h-[46px] px-6 rounded-xl font-bold text-[14px] hover:bg-indigo-700 transition shadow-sm w-full md:w-auto flex items-center justify-center gap-2 disabled:opacity-50 min-w-[120px]"
              >
                {isSubmittingModel ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Model'}
              </button>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left text-[11px] font-bold text-zinc-400 pb-4 pt-6 pl-8 uppercase tracking-widest bg-white">Model Identity</th>
                <th className="text-left text-[11px] font-bold text-zinc-400 pb-4 pt-6 uppercase tracking-widest bg-white">API Config</th>
                <th className="text-left text-[11px] font-bold text-zinc-400 pb-4 pt-6 uppercase tracking-widest bg-white">Status</th>
                <th className="text-right text-[11px] font-bold text-zinc-400 pb-4 pt-6 pr-8 uppercase tracking-widest bg-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {models.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-[13px] font-medium text-zinc-500">No AI models configured yet.</td>
                </tr>
              ) : (
                models.map((model: any) => (
                  <tr key={model._id} className="hover:bg-zinc-50/80 transition-colors group">
                    <td className="py-5 border-t border-zinc-50 pl-8">
                      <div className="font-bold text-[14px] text-zinc-900">{model.name}</div>
                      <div className="text-[12px] font-medium text-zinc-500 mt-0.5">v{model.version}</div>
                    </td>
                    <td className="py-5 border-t border-zinc-50">
                      <div className="text-[13px] font-mono font-medium text-zinc-600 truncate max-w-[200px]">
                        {model.apiDetails || 'N/A'}
                      </div>
                    </td>
                    <td className="py-5 border-t border-zinc-50">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-sm ${model.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-zinc-100 text-zinc-600 border border-zinc-200'}`}>
                        {model.isActive ? <CheckCircle className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                        {model.isActive ? 'Active Node' : 'Standby'}
                      </span>
                    </td>
                    <td className="py-5 border-t border-zinc-50 pr-8 text-right">
                      <button 
                        onClick={() => handleToggleModelStatus(model._id, model.isActive)}
                        className={`px-4 py-2 rounded-lg text-[12px] font-bold transition-colors border ${model.isActive ? 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 shadow-sm' : 'bg-indigo-50 border-indigo-100 text-indigo-700 hover:bg-indigo-100 shadow-sm'}`}
                      >
                        {model.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-white rounded-[24px] border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col flex-grow">
          <div className="px-8 py-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
            <div>
              <h3 className="font-display font-bold text-zinc-900 text-[18px] tracking-tight">User Registry</h3>
              <p className="text-[13px] font-medium text-zinc-500 mt-0.5">Manage and monitor all platform accounts.</p>
            </div>
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search users..." 
                className="pl-10 pr-4 py-2 bg-white border border-zinc-200 rounded-xl text-[14px] font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all w-[240px] placeholder:text-zinc-400"
              />
            </div>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left text-[11px] font-bold text-zinc-400 pb-4 pt-6 border-b border-zinc-100 pl-8 uppercase tracking-widest bg-white">User</th>
                  <th className="text-left text-[11px] font-bold text-zinc-400 pb-4 pt-6 border-b border-zinc-100 uppercase tracking-widest bg-white">Role</th>
                  <th className="text-left text-[11px] font-bold text-zinc-400 pb-4 pt-6 border-b border-zinc-100 pr-8 uppercase tracking-widest bg-white">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u: any) => (
                  <tr key={u._id} className="hover:bg-zinc-50/80 transition-colors group">
                    <td className="py-5 border-b border-zinc-50 pl-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-600 font-bold text-sm border border-zinc-200 group-hover:bg-white transition-colors shadow-sm shrink-0">
                          {u.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-[14px] text-zinc-900 line-clamp-1">{u.name}</div>
                          <div className="text-[13px] font-medium text-zinc-500 mt-0.5 line-clamp-1">{u.email}</div>
                        </div>
                      </div>
                    </td>
    <td className="py-5 text-[14px] font-medium border-b border-zinc-50 relative">
      <div className="flex items-center gap-2">
        <div className="relative inline-block w-[130px]">
          <select
            value={pendingRoles[u._id] || u.role}
            onChange={(e) => setPendingRoles({...pendingRoles, [u._id]: e.target.value})}
            disabled={updatingId === u._id}
            className={`appearance-none w-full border text-zinc-700 ${u.role === 'banned' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white border-zinc-200'} py-2 pl-3 pr-8 rounded-lg text-[13px] font-semibold capitalize outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 hover:border-indigo-300 cursor-pointer disabled:opacity-50 transition-colors shadow-sm`}
          >
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="ai_trainer">AI Trainer</option>
            <option value="banned">Banned</option>
          </select>
          <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        
        {(pendingRoles[u._id] && pendingRoles[u._id] !== u.role) && (
          <div className="flex items-center gap-1.5 animate-in fade-in slide-in-from-left-2 duration-200">
            <button
              onClick={() => {
                handleRoleChange(u._id, pendingRoles[u._id]);
                const updated = {...pendingRoles};
                delete updated[u._id];
                setPendingRoles(updated);
              }}
              disabled={updatingId === u._id}
              className="bg-indigo-600 text-white rounded-md px-2 py-1.5 text-[11px] font-bold shadow-sm hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center gap-1"
            >
              {updatingId === u._id ? <Loader2 className="w-3 h-3 animate-spin"/> : <CheckCircle className="w-3 h-3"/>}
              Confirm
            </button>
            <button
              onClick={() => {
                const updated = {...pendingRoles};
                delete updated[u._id];
                setPendingRoles(updated);
              }}
              className="bg-zinc-100 text-zinc-600 rounded-md px-2 py-1.5 text-[11px] font-bold shadow-sm hover:bg-zinc-200 hover:text-zinc-900 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Delete Handle */}
        <button
           onClick={async () => {
             if (confirm(`Are you sure you want to permanently delete ${u.name}?`)) {
                try {
                  const updatedUsers = await fetchApi(`/admin/users/${u._id}`, { method: 'DELETE' });
                  setUsers(updatedUsers);
                  refreshLogs();
                } catch(e) {}
             }
           }}
           className="ml-auto bg-red-50 text-red-600 hover:bg-red-500 hover:text-white border border-red-100 px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition-colors"
        >
          Delete
        </button>
      </div>
    </td>
    <td className="py-5 border-b border-zinc-50 pr-8">
      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-sm ${u.isActive !== false && u.role !== 'banned' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${u.isActive !== false && u.role !== 'banned' ? 'bg-emerald-500 shadow-[0_0_8px_rgb(16,185,129)]' : 'bg-red-500'}`}></span>
        {u.role === 'banned' ? 'Banned' : u.isActive !== false ? 'Active' : 'Offline'}
      </span>
    </td>
  </tr>
))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="xl:col-span-1 bg-white rounded-[24px] border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col h-[600px]">
          <div className="px-6 py-5 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
            <h3 className="font-display font-bold text-zinc-900 text-[16px] tracking-tight flex gap-2 items-center">
              <History className="w-4 h-4 text-zinc-400" />
              System Activity Logs
            </h3>
          </div>
          <div className="overflow-y-auto flex-1 p-6 space-y-5 custom-scrollbar">
            {logs.length === 0 ? (
              <div className="text-center font-medium text-[13px] text-zinc-400 mt-10">No logs generated.</div>
            ) : (
              logs.map((log: any) => (
                <div key={log._id} className="relative pl-4 border-l-2 border-zinc-100 hover:border-indigo-500 transition-colors cursor-default">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-zinc-200"></div>
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">
                    {new Date(log.createdAt).toLocaleString()}
                  </div>
                  <div className="text-[13px] font-bold text-zinc-800 leading-snug">
                    {log.action}
                  </div>
                  <div className="text-[12px] font-medium text-zinc-500 leading-tight mt-1">
                    {typeof log.details === 'string' ? log.details : JSON.stringify(log.details)}
                  </div>
                  {log.userId && (
                    <div className="mt-2 text-[11px] font-medium text-indigo-600 bg-indigo-50 w-fit px-2 py-0.5 rounded-md border border-indigo-100">
                      User: {log.userId?.name || log.userId}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
