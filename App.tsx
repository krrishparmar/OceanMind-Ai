import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './views/Dashboard';
import Community from './views/Community';
import Analysis from './views/Analysis';
import ChatAssistant from './components/ChatAssistant';

const PlaceholderView = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-full text-slate-500 animate-in fade-in">
    <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
    <p className="text-sm">This module is under development.</p>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'community':
        return <Community />;
      case 'analysis':
        return <Analysis />;
      case 'settings':
        return <PlaceholderView title="System Settings" />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
      <ChatAssistant />
    </Layout>
  );
};

export default App;