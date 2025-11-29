import React, { useState } from 'react';
import { Heart, Globe, AlertTriangle, Upload, Check, ChevronRight } from 'lucide-react';

const Community: React.FC = () => {
    const [activeSection, setActiveSection] = useState<'report' | 'donate'>('report');

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-white">Community Hub</h1>
                <p className="text-slate-400 text-sm mt-1">Participate in ocean conservation efforts.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Navigation Menu */}
                <div className="space-y-2">
                    <button 
                        onClick={() => setActiveSection('report')}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium border transition-all flex justify-between items-center ${activeSection === 'report' ? 'bg-[#18181b] border-[#27272a] text-white' : 'border-transparent text-slate-400 hover:text-white'}`}
                    >
                        <span>Report Incident</span>
                        {activeSection === 'report' && <ChevronRight className="w-4 h-4 text-blue-500" />}
                    </button>
                     <button 
                        onClick={() => setActiveSection('donate')}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium border transition-all flex justify-between items-center ${activeSection === 'donate' ? 'bg-[#18181b] border-[#27272a] text-white' : 'border-transparent text-slate-400 hover:text-white'}`}
                    >
                        <span>Donate</span>
                        {activeSection === 'donate' && <ChevronRight className="w-4 h-4 text-emerald-500" />}
                    </button>
                </div>

                {/* Content Area */}
                <div className="md:col-span-2">
                    {activeSection === 'report' ? <ReportForm /> : <DonationView />}
                </div>
            </div>
        </div>
    );
};

const ReportForm = () => {
    const [submitted, setSubmitted] = useState(false);

    if (submitted) {
        return (
            <div className="card-modern rounded-xl p-12 text-center flex flex-col items-center justify-center h-full">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-4">
                    <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium text-white">Report Submitted</h3>
                <p className="text-slate-400 text-sm mt-2 max-w-xs mx-auto">Thank you. Your report has been logged to the public ledger and alerted local authorities.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-sm text-blue-500 hover:text-blue-400">Submit another</button>
            </div>
        )
    }

    return (
        <div className="card-modern rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                    <AlertTriangle className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-medium text-white">New Incident Report</h2>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Incident Type</label>
                    <select className="w-full bg-[#09090b] border border-[#27272a] text-white text-sm rounded-lg px-3 py-2.5 focus:border-blue-500 outline-none">
                        <option>Oil Spill</option>
                        <option>Plastic Debris</option>
                        <option>Algal Bloom</option>
                        <option>Wildlife Stranding</option>
                    </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">Date</label>
                        <input type="date" className="w-full bg-[#09090b] border border-[#27272a] text-white text-sm rounded-lg px-3 py-2.5 focus:border-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">Time</label>
                        <input type="time" className="w-full bg-[#09090b] border border-[#27272a] text-white text-sm rounded-lg px-3 py-2.5 focus:border-blue-500 outline-none" />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Description</label>
                    <textarea 
                        className="w-full bg-[#09090b] border border-[#27272a] text-white text-sm rounded-lg px-3 py-2.5 focus:border-blue-500 outline-none h-24 resize-none"
                        placeholder="Describe what you saw..."
                    ></textarea>
                </div>

                <div className="border border-dashed border-[#27272a] rounded-lg p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-[#18181b] transition-colors cursor-pointer">
                    <Upload className="w-5 h-5 mb-2" />
                    <span className="text-xs">Upload Evidence (Photo/Video)</span>
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
                    Submit Report
                </button>
            </form>
        </div>
    );
}

const DonationView = () => (
    <div className="card-modern rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                <Heart className="w-5 h-5 fill-current" />
            </div>
            <h2 className="text-lg font-medium text-white">Support Projects</h2>
        </div>

        <div className="space-y-4">
            <div className="p-4 rounded-lg bg-[#09090b] border border-[#27272a] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-white">Ocean CleanUp</p>
                        <p className="text-xs text-slate-500">Pacific Region</p>
                    </div>
                </div>
                <button className="text-xs bg-[#27272a] hover:bg-[#3f3f46] text-white px-3 py-1.5 rounded transition-colors">Select</button>
            </div>
            
            <div>
                <label className="block text-xs font-medium text-slate-400 mb-3">Amount</label>
                <div className="grid grid-cols-4 gap-2">
                    {['$10', '$25', '$50', '$100'].map(amt => (
                        <button key={amt} className="py-2 rounded-md border border-[#27272a] text-sm text-slate-300 hover:border-emerald-500 hover:text-emerald-500 transition-colors">
                            {amt}
                        </button>
                    ))}
                </div>
            </div>

            <button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
                Process Secure Donation
            </button>
        </div>
    </div>
);

export default Community;