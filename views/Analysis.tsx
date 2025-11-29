import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchAnalysisData } from '../services/geminiService';
import { Loader2, RefreshCcw, Download } from 'lucide-react';

const Analysis: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [metric, setMetric] = useState('temperature');

    const loadData = async () => {
        setLoading(true);
        const result = await fetchAnalysisData(metric);
        setData(result);
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, [metric]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-white tracking-tight">Analytics</h1>
                    <p className="text-slate-400 text-sm">Historical trends and predictive modeling.</p>
                </div>
                
                <div className="flex gap-2">
                     <select 
                        value={metric}
                        onChange={(e) => setMetric(e.target.value)}
                        className="bg-[#18181b] border border-[#27272a] text-sm text-white rounded-md px-3 py-2 outline-none focus:border-blue-500"
                    >
                        <option value="temperature">Temperature</option>
                        <option value="ph">pH Levels</option>
                        <option value="dissolved_oxygen">Oxygen</option>
                        <option value="turbidity">Turbidity</option>
                    </select>
                    <button onClick={loadData} className="p-2 bg-[#18181b] border border-[#27272a] rounded-md hover:bg-[#27272a] text-slate-400 hover:text-white transition-colors">
                        <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            <div className="card-modern rounded-xl p-6 h-[400px]">
                {loading ? (
                    <div className="h-full flex items-center justify-center text-slate-500">
                        <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                ) : data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                            <XAxis 
                                dataKey="time" 
                                stroke="#71717a" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false} 
                                tickFormatter={(val) => val.split(':')[0]}
                            />
                            <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip 
                                contentStyle={{backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff'}}
                                itemStyle={{color: '#fff'}}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#3b82f6" 
                                strokeWidth={2}
                                fillOpacity={1} 
                                fill="url(#colorValue)" 
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full flex items-center justify-center text-slate-500">
                        No data available for this metric.
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Min Value" value={data.length ? Math.min(...data.map(d => d.value)).toFixed(2) : '-'} />
                <StatCard label="Max Value" value={data.length ? Math.max(...data.map(d => d.value)).toFixed(2) : '-'} />
                <StatCard label="Average" value={data.length ? (data.reduce((a, b) => a + b.value, 0) / data.length).toFixed(2) : '-'} />
            </div>
        </div>
    );
};

const StatCard = ({ label, value }: { label: string, value: string }) => (
    <div className="card-modern p-4 rounded-xl">
        <p className="text-slate-500 text-xs uppercase font-semibold">{label}</p>
        <p className="text-2xl text-white font-medium mt-1">{value}</p>
    </div>
);

export default Analysis;