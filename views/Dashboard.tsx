import React, { useState, useEffect } from 'react';
import { StakeholderView, Alert } from '../types';
import { Users, Droplets, Thermometer, Wind, Activity, ArrowUpRight, ArrowDownRight, MapPin, Loader2, ShieldAlert } from 'lucide-react';
import OceanMap from '../components/OceanMap';
import { fetchDashboardData } from '../services/geminiService';

const Dashboard: React.FC = () => {
  const [stakeholder, setStakeholder] = useState<StakeholderView>(StakeholderView.GOVERNMENT);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ lat: 18.9400, lng: 72.8200 }); // Default Mumbai

  useEffect(() => {
    // Attempt to get real location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => console.log("Using default location")
      );
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const result = await fetchDashboardData(location.lat, location.lng);
      if (result) {
        setData(result);
      }
      setLoading(false);
    };
    loadData();
  }, [location]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-blue-500" />
        <p>Connecting to satellite feeds...</p>
      </div>
    );
  }

  const metrics = data?.metrics || {};
  const alerts = data?.alerts || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-tight">Overview</h1>
          <p className="text-slate-400 mt-1 flex items-center gap-2">
             <MapPin className="w-4 h-4" /> 
             {location.lat.toFixed(4)}° N, {location.lng.toFixed(4)}° E
          </p>
        </div>
        
        <div className="bg-[#18181b] p-1 rounded-lg border border-[#27272a] inline-flex">
          {Object.values(StakeholderView).map((view) => (
             <button
              key={view}
              onClick={() => setStakeholder(view)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                stakeholder === view 
                ? 'bg-[#27272a] text-white shadow-sm' 
                : 'text-slate-400 hover:text-white'
              }`}
             >
               {view}
             </button>
          ))}
        </div>
      </div>

      {/* AI Summary */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-blue-900/20 to-transparent border border-blue-900/30">
        <h3 className="text-sm font-semibold text-blue-400 mb-2 uppercase tracking-wide">Daily Insight</h3>
        <p className="text-slate-200 text-lg leading-relaxed">
            {data?.summary || "Analyzing regional oceanographic patterns for anomalies."}
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric Cards */}
        <MetricCard 
            label="Water Temp" 
            value={metrics.temperature?.value} 
            unit={metrics.temperature?.unit} 
            trend={metrics.temperature?.trend} 
            icon={Thermometer}
        />
        <MetricCard 
            label="Acidity (pH)" 
            value={metrics.phLevel?.value} 
            unit={metrics.phLevel?.unit} 
            trend={metrics.phLevel?.trend} 
            icon={Droplets}
        />
        <MetricCard 
            label="Dissolved Oxygen" 
            value={metrics.dissolvedOxygen?.value} 
            unit={metrics.dissolvedOxygen?.unit} 
            trend={metrics.dissolvedOxygen?.trend} 
            icon={Wind}
        />
        <MetricCard 
            label="Plastic Index" 
            value={metrics.plasticIndex?.value} 
            unit={metrics.plasticIndex?.unit} 
            trend={metrics.plasticIndex?.trend} 
            icon={ShieldAlert}
            status={metrics.plasticIndex?.status}
        />

        {/* Map - Spans 2 cols, 2 rows */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 card-modern rounded-xl p-1 h-[400px] flex flex-col">
            <div className="flex items-center justify-between p-4 pb-2">
                <h3 className="font-semibold text-white">Live Monitoring</h3>
                <span className="flex items-center gap-2 text-xs text-emerald-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live Feed
                </span>
            </div>
            <div className="flex-1 rounded-lg overflow-hidden border border-[#27272a] bg-[#0c0c0e] relative">
                <OceanMap alerts={alerts} />
            </div>
        </div>

        {/* Alerts List - Spans 2 cols */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 card-modern rounded-xl p-5 h-[400px] flex flex-col">
             <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Active Incidents</h3>
                <span className="text-xs text-slate-500">{alerts.length} reports</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {alerts.map((alert: Alert, i: number) => (
                    <div key={i} className="p-4 rounded-lg border border-[#27272a] bg-[#1c1c1f] hover:border-slate-600 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-1">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${
                                alert.severity === 'critical' ? 'bg-red-500/10 text-red-400' : 
                                alert.severity === 'high' ? 'bg-orange-500/10 text-orange-400' : 'bg-blue-500/10 text-blue-400'
                            }`}>
                                {alert.type}
                            </span>
                            <span className="text-xs text-slate-500">{alert.timestamp}</span>
                        </div>
                        <p className="text-sm text-slate-300 font-medium mt-2">{alert.location}</p>
                        <div className="flex justify-between items-center mt-3">
                            <span className="text-xs text-slate-500 capitalize">Status: {alert.status}</span>
                            <span className="text-xs text-blue-400 group-hover:translate-x-1 transition-transform">Details &rarr;</span>
                        </div>
                    </div>
                ))}
                {alerts.length === 0 && (
                    <p className="text-slate-500 text-sm text-center py-10">No active incidents detected in this region.</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<any> = ({ label, value, unit, trend, icon: Icon, status }) => {
    const isNegative = trend === 'down' || status === 'critical';
    
    return (
        <div className="card-modern p-5 rounded-xl flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
                <span className="text-slate-500 text-sm font-medium">{label}</span>
                <Icon className="w-4 h-4 text-slate-400" />
            </div>
            <div>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold text-white">{value ?? '-'}</span>
                    <span className="text-sm text-slate-500">{unit}</span>
                </div>
                {trend && (
                    <div className={`flex items-center mt-1 text-xs ${isNegative ? 'text-red-400' : 'text-emerald-500'}`}>
                        {isNegative ? <ArrowDownRight className="w-3 h-3 mr-1" /> : <ArrowUpRight className="w-3 h-3 mr-1" />}
                        <span className="capitalize">{trend} trend</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;