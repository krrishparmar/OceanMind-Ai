export enum StakeholderView {
  CITIZENS = 'Citizens',
  GOVERNMENT = 'Government',
  NGOS = 'NGOs',
  RESEARCHERS = 'Researchers'
}

export interface Alert {
  id: string;
  type: 'Oil Spill' | 'Coral Bleaching' | 'Plastic Hotspot' | 'Temperature Spike' | 'Harmful Algal Bloom';
  severity: 'critical' | 'high' | 'medium' | 'low';
  location: string;
  timestamp: string;
  coordinates: [number, number]; // Percentage 0-100 for mock map
  status: 'active' | 'investigating' | 'resolved';
}

export interface Metric {
  label: string;
  value: string | number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'good' | 'warning' | 'critical';
  confidence?: number; // 0-100%
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface SensorReading {
  id: string;
  type: string;
  value: number;
  unit: string;
  timestamp: string;
  location: string;
  status: 'calibrated' | 'drift' | 'offline';
}
