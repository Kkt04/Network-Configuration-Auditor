import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = ['overview', 'issues', 'charts'];

  return (
    <div className="flex border-b border-slate-700">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-3 font-semibold capitalize transition-colors ${
            activeTab === tab
              ? 'bg-slate-700 text-white border-b-2 border-cyan-500'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;