import React, { useState, useEffect } from 'react';
import { fetchApi } from '../lib/api';
import { motion } from 'framer-motion';
import { User, Lock, Save, Loader2 } from 'lucide-react';

export default function Profile({ user, setUser }: { user: any, setUser: (u: any) => void }) {
  const [profile, setProfile] = useState<any>(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchApi('/user/profile')
      .then(data => {
        setProfile(data);
        setName(data.name || '');
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      setMessage({ text: 'Passwords do not match.', type: 'error' });
      return;
    }
    
    setLoading(true);
    setMessage({ text: '', type: '' });
    
    try {
      const payload: any = { name };
      if (password) payload.password = password;
      
      const updatedUser = await fetchApi('/user/profile', {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      
      // Update local storage and app state
      localStorage.setItem('name', updatedUser.name);
      setUser({ ...user, name: updatedUser.name });
      
      setMessage({ text: 'Profile updated successfully!', type: 'success' });
      setPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      setMessage({ text: error.message || 'Failed to update profile.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return <div className="p-8 text-center text-zinc-500">Loading profile...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-[700px] w-full mx-auto"
    >
      <div className="bg-white border border-zinc-200/80 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="p-6 md:p-8 border-b border-zinc-100 bg-zinc-50/50">
          <h2 className="font-display text-2xl font-bold text-zinc-900 tracking-tight">Profile Settings</h2>
          <p className="text-[14px] text-zinc-500 mt-1 font-medium">Update your personal account details</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-6">
          {message.text && (
            <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
              {message.text}
            </div>
          )}
          
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-[13px] font-bold text-zinc-700 mb-2 uppercase tracking-wide">Email</label>
              <input 
                type="email" 
                value={profile.email} 
                disabled
                className="w-full bg-zinc-100 border border-zinc-200 text-zinc-500 text-[14px] rounded-xl px-4 py-3 cursor-not-allowed"
              />
              <p className="text-[12px] text-zinc-400 mt-2 font-medium">Email cannot be changed.</p>
            </div>
            
            <div>
              <label className="block text-[13px] font-bold text-zinc-700 mb-2 uppercase tracking-wide">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-zinc-400" />
                </div>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-zinc-200 text-zinc-900 text-[14px] rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div className="h-px w-full bg-zinc-100 my-2"></div>
            
            <div>
              <h3 className="font-bold text-zinc-800 text-[15px] mb-4">Change Password</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-zinc-700 mb-2 uppercase tracking-wide">New Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-zinc-400" />
                    </div>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white border border-zinc-200 text-zinc-900 text-[14px] rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                      placeholder="Leave blank to keep unchanged"
                    />
                  </div>
                </div>
                
                {password && (
                  <div>
                    <label className="block text-[13px] font-bold text-zinc-700 mb-2 uppercase tracking-wide">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-zinc-400" />
                      </div>
                      <input 
                        type="password" 
                        required={!!password}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-white border border-zinc-200 text-zinc-900 text-[14px] rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                        placeholder="Confirm your new password"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="pt-4 mt-2 border-t border-zinc-100">
            <button 
              type="submit" 
              disabled={loading}
              className="px-6 py-3 bg-zinc-900 text-white rounded-xl text-[14px] font-semibold hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 transition flex items-center justify-center gap-2 shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] disabled:opacity-70 w-full sm:w-auto"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
