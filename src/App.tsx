import { Routes, Route, Navigate, useLocation, Link, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, BrainCircuit, Activity, Database, LogOut, Menu, X, User } from 'lucide-react';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import TrainerDashboard from './pages/TrainerDashboard';
import Profile from './pages/Profile';
import Landing from './pages/Landing';

export default function App() {
  const [user, setUser] = useState<{ role: string, name: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name');
    if (token && role && name) {
      setUser({ role, name });
    }
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  const getDashboardHome = () => {
    if (!user) return "/login";
    if (user.role === 'admin') return "/admin";
    if (user.role === 'ai_trainer') return "/trainer";
    return "/teacher";
  };

  const isDashboardRoute = user && ['/admin', '/teacher', '/trainer', '/profile'].includes(location.pathname);

  // Determine Nav Items Based on Role
  const navItems = [];
  if (user?.role === 'admin') {
    navItems.push({ label: 'Overview Dashboard', icon: LayoutDashboard, path: '/admin' });
    navItems.push({ label: 'User Management', icon: Users, path: '/admin' });
    navItems.push({ label: 'System Logs', icon: Activity, path: '/admin' });
  } else if (user?.role === 'ai_trainer') {
    navItems.push({ label: 'Model Training', icon: BrainCircuit, path: '/trainer' });
    navItems.push({ label: 'Dataset Registry', icon: Database, path: '/trainer' });
  } else if (user?.role === 'teacher') {
    navItems.push({ label: 'Class Analytics', icon: LayoutDashboard, path: '/teacher' });
    navItems.push({ label: 'Student Data', icon: Users, path: '/teacher' });
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-zinc-900 flex flex-col">
      {isDashboardRoute && (
         <>
          {/* Mobile Overlay */}
          {isMobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-30 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div className={`w-[280px] bg-white border-r border-zinc-200 h-screen flex flex-col fixed left-0 top-0 z-40 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            <Link to={getDashboardHome()} className="p-6 md:p-8 flex items-center gap-3 cursor-pointer hover:opacity-80 transition group">
              <div className="bg-indigo-600 p-2 rounded-xl group-hover:bg-indigo-500 transition-colors">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <div className="font-display font-bold text-[20px] text-zinc-900 tracking-tight">
                EDU-AI
              </div>
            </Link>
            
            <div className="px-8 flex flex-col flex-grow">
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Menu</div>
              <nav className="flex flex-col gap-1.5 border-l border-zinc-100 pl-3">
                 {navItems.map((item, idx) => (
                   <Link to={item.path} key={idx} className={`px-4 py-3 flex items-center gap-3 text-[14px] font-medium rounded-xl cursor-pointer transition-all ${idx === 0 && location.pathname !== '/profile' ? 'bg-indigo-50/50 text-indigo-700 -ml-[1px] border-l-2 border-indigo-600' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 border-l-2 border-transparent -ml-[1px]'}`}>
                     <item.icon className={`w-4 h-4 ${idx === 0 && location.pathname !== '/profile' ? 'text-indigo-600' : 'text-zinc-400'}`} />
                     {item.label}
                   </Link>
                 ))}
                 
                 <div className="mt-6 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Account</div>
                 <Link to="/profile" className={`px-4 py-3 flex items-center gap-3 text-[14px] font-medium rounded-xl cursor-pointer transition-all ${location.pathname === '/profile' ? 'bg-indigo-50/50 text-indigo-700 -ml-[1px] border-l-2 border-indigo-600' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 border-l-2 border-transparent -ml-[1px]'}`}>
                   <User className={`w-4 h-4 ${location.pathname === '/profile' ? 'text-indigo-600' : 'text-zinc-400'}`} />
                   Profile Settings
                 </Link>
              </nav>
            </div>
            
            <div className="p-6">
              <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200/60">
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">System</div>
                <div className="flex items-center gap-2 text-[13px] font-semibold text-zinc-800">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  APIs Online
                </div>
              </div>
            </div>
          </div>

          {/* Header */}
          <header className={`h-[72px] bg-white/60 backdrop-blur-xl border-b border-zinc-200 flex items-center justify-between px-6 md:px-8 fixed top-0 w-full lg:w-[calc(100%-280px)] lg:left-[280px] z-20 transition-all`}>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-zinc-600 hover:bg-zinc-100 rounded-lg lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="hidden sm:block">
                <div className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Workspace</div>
                <div className="font-display font-bold text-zinc-900 text-[16px] capitalize tracking-tight">{location.pathname === '/profile' ? 'Profile Settings' : `${location.pathname.replace('/', '')} Dashboard`}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-5">
              <div 
                className="text-right hidden sm:flex flex-col items-end cursor-pointer group"
                onClick={() => navigate('/profile')}
              >
                <div className="text-[14px] font-bold text-zinc-900 leading-tight group-hover:text-indigo-600 transition-colors">{user.name}</div>
                <div className="text-[11px] font-medium text-indigo-600 capitalize tracking-wide">{user.role.replace('_', ' ')} Overview</div>
              </div>
              <div 
                onClick={() => navigate('/profile')}
                className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-sm font-bold text-white shadow-md ring-2 ring-white cursor-pointer hover:bg-zinc-800 transition-colors"
                title="View Profile"
              >
                {user.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="w-px h-8 bg-zinc-200 mx-1 md:mx-2 hidden sm:block"></div>
              <button 
                onClick={handleLogout}
                className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100 flex items-center justify-center"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </header>
        </>
      )}

      <main className={`flex-1 flex flex-col relative w-full ${isDashboardRoute ? 'lg:pl-[280px] pt-[72px] p-4 md:p-8' : ''}`}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to={getDashboardHome()} />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to={getDashboardHome()} />} />
          
          {/* Protected Routes */}
          <Route path="/profile" element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/login" />} />
          <Route path="/admin" element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="/teacher" element={user && ['admin', 'teacher'].includes(user.role) ? <TeacherDashboard /> : <Navigate to="/login" />} />
          <Route path="/trainer" element={user && ['admin', 'ai_trainer'].includes(user.role) ? <TrainerDashboard /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
}
