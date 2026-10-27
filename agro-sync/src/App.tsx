import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Camera, 
  Database, 
  Globe, 
  LayoutDashboard, 
  Leaf, 
  Package, 
  Search, 
  Settings, 
  ShieldCheck, 
  TrendingUp, 
  Zap,
  Bell,
  ChevronRight,
  Plus
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const sensorData = [
  { time: '00:00', co2: 400, ethylene: 0.1 },
  { time: '04:00', co2: 420, ethylene: 0.15 },
  { time: '08:00', co2: 450, ethylene: 0.3 },
  { time: '12:00', co2: 580, ethylene: 0.8 },
  { time: '16:00', co2: 510, ethylene: 0.6 },
  { time: '20:00', co2: 430, ethylene: 0.2 },
  { time: '23:59', co2: 405, ethylene: 0.12 },
];

const batchData = [
  { id: 'BATCH-429', crop: 'Alphonso Mango', grade: 'A+', origin: 'Ratnagiri, MH', status: 'Export Ready' },
  { id: 'BATCH-430', crop: 'Pomegranate', grade: 'B', origin: 'Nashik, MH', status: 'Processing' },
  { id: 'BATCH-431', crop: 'Grapes', grade: 'A', origin: 'Sangli, MH', status: 'In Transit' },
];

type ViewType = 'command' | 'vision' | 'value' | 'traceability' | 'export' | 'market';

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active = false, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  active?: boolean, 
  onClick: () => void 
}) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${active ? 'bg-agri-500/20 text-agri-400 border border-agri-500/30' : 'text-agri-400/60 hover:bg-white/5 hover:text-agri-300'}`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </div>
);

const StatCard = ({ label, value, icon: Icon, color, trend }: { label: string, value: string, icon: any, color: string, trend?: string }) => (
  <div className="glass-card p-6 group hover:translate-y-[-4px] transition-all duration-500">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-400 group-hover:scale-110 transition-transform duration-500`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
          <TrendingUp size={12} /> {trend}
        </span>
      )}
    </div>
    <div className="text-agri-400/60 text-sm font-medium mb-1">{label}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

const EdgeVisionSim = () => {
  const [active, setActive] = useState(true);
  const [detections, setDetections] = useState(true);
  
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setDetections(prev => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="glass-card overflow-hidden h-full relative group">
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold tracking-widest uppercase transition-colors duration-500 ${active ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-white/5 border-white/10 text-white/40'}`}>
          <div className={`w-2 h-2 rounded-full ${active ? 'bg-red-500 animate-pulse' : 'bg-white/20'}`} />
          {active ? 'Live Edge Feed' : 'Feed Offline'}
        </div>
        <div className="px-3 py-1 rounded-full bg-agri-500/20 border border-agri-500/40 text-agri-400 text-[10px] font-bold tracking-widest uppercase">
          Cam-ID: 042-S3
        </div>
      </div>
      
      {/* Simulated Camera View */}
      <div className="aspect-video bg-agri-950/50 flex items-center justify-center relative overflow-hidden transition-transform duration-700">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] z-10" />
        <Camera size={48} className={`transition-all duration-500 ${active ? 'text-agri-900 animate-pulse' : 'text-white/5'}`} />
        
        {/* Detection Boxes */}
        <AnimatePresence>
          {active && detections && (
            <>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-[20%] left-[30%] w-32 h-32 border-2 border-agri-400 rounded-lg z-10 shadow-[0_0_15px_rgba(92,169,115,0.3)]"
              >
                <div className="absolute -top-6 left-0 bg-agri-400 text-agri-950 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  Mango 98.4%
                </div>
                <div className="absolute -bottom-6 right-0 text-white/40 text-[8px] whitespace-nowrap">
                  SIZE: 320g | COLOR: GRADIENT
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-[20%] right-[15%] w-40 h-40 border-2 border-amber-400 rounded-lg z-10 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
              >
                <div className="absolute -top-6 left-0 bg-amber-400 text-agri-950 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  Mango 96.1%
                </div>
                <div className="absolute -bottom-6 right-0 text-white/40 text-[8px] whitespace-nowrap">
                  SIZE: 345g | COLOR: YELLOW
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Scan line */}
        {active && (
          <div className="absolute top-0 left-0 w-full h-[2px] bg-agri-400/50 shadow-[0_0_10px_#5ca973] animate-[scan_3s_linear_infinite] z-10" />
        )}
      </div>
      
      <div className="p-4 bg-agri-900/30">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs text-agri-400/60 uppercase font-bold tracking-wider">Active Analysis</div>
            <div className="text-sm font-semibold">{active ? 'Quality Grading Batch #429' : 'Engine Standby'}</div>
          </div>
          <button 
            onClick={() => setActive(!active)}
            className={`glass-button text-[10px] font-black py-1.5 px-4 tracking-tighter transition-all duration-500 uppercase ${active ? 'hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50' : 'bg-agri-500 text-agri-950 border-agri-400 hover:bg-agri-400'}`}
          >
            {active ? 'STOP ENGINE' : 'START ENGINE'}
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [activeView, setActiveView] = useState<ViewType>('command');
  const [data, setData] = useState(sensorData);
  const [stats, setStats] = useState({
    graded: "1,284",
    reduction: "38.4%",
    readiness: "84/100",
    carbon: "+4.2 MT"
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const last = prev[prev.length - 1];
        const nextTime = new Date(new Date(`2000-01-01 ${last.time}`).getTime() + 4 * 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        const newPoint = {
          time: nextTime,
          co2: Math.max(380, Math.min(650, last.co2 + (Math.random() - 0.5) * 50)),
          ethylene: Math.max(0.05, Math.min(1.2, last.ethylene + (Math.random() - 0.5) * 0.1))
        };
        return [...prev.slice(1), newPoint];
      });

      setStats(prev => ({
        ...prev,
        graded: (parseInt(prev.graded.replace(',', '')) + (Math.random() > 0.8 ? 1 : 0)).toLocaleString(),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch(activeView) {
      case 'command':
        return (
          <div className="space-y-8 animate-fade-in">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard label="Batches Graded" value={stats.graded} icon={Package} color="agri" trend="+12%" />
              <StatCard label="Loss Reduction" value={stats.reduction} icon={Zap} color="gold" trend="+5.2%" />
              <StatCard label="Export readiness" value={stats.readiness} icon={ShieldCheck} color="blue" />
              <StatCard label="Carbon Credit" value={stats.carbon} icon={Leaf} color="emerald" trend="+18%" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              {/* Edge Vision Panel */}
              <div className="xl:col-span-4 flex flex-col gap-6">
                <EdgeVisionSim />
                <div className="glass-card p-6 flex-1">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold">Real-time Gas levels</h3>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-agri-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-agri-400" /> CO2
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> ETHYLENE
                      </div>
                    </div>
                  </div>
                  <div className="h-48 w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                        <defs>
                          <linearGradient id="colorAgri" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3d8d55" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3d8d55" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="co2" stroke="#3d8d55" fillOpacity={1} fill="url(#colorAgri)" isAnimationActive={false} />
                        <Area type="monotone" dataKey="ethylene" stroke="#facc15" fillOpacity={0} isAnimationActive={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Blockchain Explorer */}
              <div className="xl:col-span-8 space-y-6">
                <div className="glass-card p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-lg font-bold">Traceability Ledger</h3>
                      <p className="text-sm text-white/40">Immutable blockchain records for global export compliance.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {batchData.map((batch) => (
                      <div key={batch.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-agri-950 flex items-center justify-center border border-white/10">
                            <Database size={20} className="text-agri-400" />
                          </div>
                          <div>
                            <p className="text-xs text-agri-400 font-bold uppercase tracking-widest">{batch.id}</p>
                            <h4 className="font-bold">{batch.crop}</h4>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-xs text-white/40 uppercase mb-1 text-right">Grade</p>
                            <span className="text-gold-400 font-bold text-lg">{batch.grade}</span>
                          </div>
                          <div className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider ${
                            batch.status === 'Export Ready' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            batch.status === 'Processing' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          }`}>
                            {batch.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'vision':
        return (
          <div className="space-y-8 animate-fade-in">
             <div className="glass-card p-12 flex flex-col items-center justify-center text-center gap-6">
               <div className="w-24 h-24 rounded-full bg-agri-500/20 flex items-center justify-center text-agri-400 border border-agri-500/40">
                 <Camera size={48} />
               </div>
               <div>
                  <h2 className="text-3xl font-bold mb-2">Edge Vision Engine</h2>
                  <p className="text-white/40 max-w-md mx-auto">Advanced visual grading system using YOLOv8 optimized for ESP32-S3 Eye and Jetson Nano modules.</p>
               </div>
               <div className="w-full max-w-3xl aspect-video rounded-3xl border border-white/10 bg-black/40 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-agri-400 font-mono animate-pulse">CONNECTING TO EDGE MODULE...</div>
                  </div>
               </div>
             </div>
          </div>
        );
      case 'traceability':
        return (
          <div className="space-y-8 animate-fade-in">
             <div className="glass-card p-8">
               <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                 <ShieldCheck className="text-agri-400" /> Blockchain Ledger Network
               </h2>
               <div className="space-y-4">
                 {[1,2,3,4,5].map(i => (
                   <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">#</div>
                        <div>
                          <p className="text-xs font-mono text-white/40">HASH: 0x{Math.random().toString(16).substring(2, 10)}...</p>
                          <p className="font-bold">Transaction Confirmed</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/40 uppercase">Timestamp</p>
                        <p className="text-sm">2 mins ago</p>
                      </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        );
      default:
        return (
          <div className="h-full flex items-center justify-center flex-col gap-4 animate-fade-in">
            <Settings size={64} className="text-agri-400/20 animate-spin-slow" />
            <h2 className="text-2xl font-bold text-white/40 uppercase tracking-widest">Section Under Construction</h2>
            <p className="text-white/20">Industrial expansion in progress...</p>
            <button onClick={() => setActiveView('command')} className="glass-button text-xs font-bold mt-4">Return to Command Center</button>
          </div>
        );
    }
  }

  return (
    <div className="flex min-h-screen bg-agri-950 text-agri-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-agri-950/50 flex flex-col p-6 hidden lg:flex">
        <div className="flex items-center gap-3 mb-10 pl-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-agri-400 to-gold-400 flex items-center justify-center">
            <Leaf size={24} className="text-agri-950" />
          </div>
          <span className="text-2xl font-bold tracking-tight gradient-text">AgroSync AI</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <SidebarItem icon={LayoutDashboard} label="Command Center" active={activeView === 'command'} onClick={() => setActiveView('command')} />
          <SidebarItem icon={Camera} label="Edge AI Vision" active={activeView === 'vision'} onClick={() => setActiveView('vision')} />
          <SidebarItem icon={Package} label="Value Addition" active={activeView === 'value'} onClick={() => setActiveView('value')} />
          <SidebarItem icon={ShieldCheck} label="Traceability" active={activeView === 'traceability'} onClick={() => setActiveView('traceability')} />
          <SidebarItem icon={Globe} label="Export Hub" active={activeView === 'export'} onClick={() => setActiveView('export')} />
          <SidebarItem icon={TrendingUp} label="Market Analytics" active={activeView === 'market'} onClick={() => setActiveView('market')} />
        </nav>
        
        <div className="mt-auto pt-6 border-t border-white/5 space-y-2">
          <SidebarItem icon={Settings} label="System Config" onClick={() => {}} />
          <div className="glass-card p-4 bg-agri-400/5 mt-4">
            <div className="text-xs text-agri-400/60 uppercase font-bold mb-2">Support Status</div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <div className="w-2 h-2 rounded-full bg-agri-400 animate-pulse" />
              Service Online
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-agri-950/20 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-xl w-96 border border-white/5 focus-within:border-agri-500/50 transition-all">
            <Search size={18} className="text-agri-400/60" />
            <input type="text" placeholder="Search batches, sensors, markets..." className="bg-transparent border-none outline-none text-sm w-full" />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors group">
              <Bell size={20} className="text-agri-400/60 group-hover:text-agri-400" />
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gold-400" />
            </div>
            <div className="h-10 w-[1px] bg-white/5" />
            <div className="flex items-center gap-3 cursor-pointer p-1 pr-3 rounded-full hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-agri-800 border-2 border-agri-400/30 flex items-center justify-center font-bold text-sm">JS</div>
              <div>
                <div className="text-sm font-bold leading-none">John Sindhe</div>
                <div className="text-[10px] text-agri-400/60 font-bold uppercase tracking-wider mt-1">Ratnagiri FPO</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="flex-1 p-8">
           <div className="flex justify-between items-end mb-8 animate-fade-in">
              <div>
                <div className="text-agri-400 font-bold uppercase tracking-widest text-[10px] mb-1">
                  {activeView} dashboard
                </div>
                <h1 className="text-3xl font-bold text-white">
                  {activeView === 'command' ? 'Agri-Command' : activeView.toUpperCase() + ' Portal'}
                </h1>
              </div>
              <button 
                className="flex items-center gap-2 bg-gradient-to-r from-agri-500 to-agri-600 px-6 py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(61,141,85,0.3)] hover:scale-105 transition-all text-white"
                onClick={() => alert(`Initializing NEW BATCH interface for ${activeView}...`)}
              >
                <Plus size={20} />
                Action Center
              </button>
            </div>
          
           {renderContent()}
        </div>
      </main>
      
      {/* CSS Animations */}
      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default App;
