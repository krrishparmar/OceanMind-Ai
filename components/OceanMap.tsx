import React from 'react';
import { MapPin } from 'lucide-react';

interface OceanMapProps {
  alerts: any[];
}

const OceanMap: React.FC<OceanMapProps> = ({ alerts }) => {
  return (
    <div className="relative w-full h-full bg-[#1e293b] overflow-hidden group">
      {/* Base Map Vectors (Abstract) */}
      <svg className="absolute inset-0 w-full h-full text-slate-700 pointer-events-none" preserveAspectRatio="none">
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Landmass shapes (Abstract) */}
        <path d="M-10,150 Q50,100 100,50 T300,50 T450,100 V300 H-10 Z" fill="#0f172a" />
        <path d="M200,400 Q250,300 350,300 T500,350 V500 H200 Z" fill="#0f172a" />
      </svg>

      {/* Sensor Nodes */}
      {[...Array(8)].map((_, i) => (
        <div 
          key={i}
          className="absolute w-2 h-2 bg-blue-500/50 rounded-full"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${20 + Math.random() * 60}%`
          }}
        >
          <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
        </div>
      ))}

      {/* Alerts */}
      {alerts.map((alert, i) => (
        <div
          key={i}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group/marker"
          style={{ 
             left: `${30 + (i * 15)}%`, // Mock positioning for demo
             top: `${40 + (i * 10)}%`
          }}
        >
          <div className="relative">
            <MapPin className="w-6 h-6 text-red-500 drop-shadow-lg" fill="currentColor" />
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-xs px-2 py-1 rounded shadow-xl whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-opacity pointer-events-none">
              {alert.type}
            </div>
          </div>
        </div>
      ))}
      
      {/* Controls UI overlay */}
      <div className="absolute bottom-4 right-4 bg-white text-slate-900 text-[10px] px-2 py-1 rounded shadow font-medium">
        Leaflet / Mapbox
      </div>
    </div>
  );
};

export default OceanMap;