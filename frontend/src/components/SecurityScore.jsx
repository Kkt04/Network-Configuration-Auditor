import React from 'react';

const SecurityScore = ({ score }) => {
  const getScoreColor = () => {
    if (score >= 70) return 'text-green-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getBarColor = () => {
    if (score >= 70) return 'bg-gradient-to-r from-green-500 to-emerald-500';
    if (score >= 40) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    return 'bg-gradient-to-r from-red-500 to-red-600';
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">Security Score</h3>
          <p className="text-slate-400 text-sm">Based on detected vulnerabilities</p>
        </div>
        <div className="text-center">
          <div className={`text-5xl font-bold ${getScoreColor()}`}>
            {score}
          </div>
          <div className="text-sm text-slate-400">/ 100</div>
        </div>
      </div>
      <div className="mt-4 w-full bg-slate-700 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${getBarColor()}`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SecurityScore;