import React from 'react';

const OverviewTab = ({ results }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">File Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="text-sm text-slate-400">File Name</div>
            <div className="font-semibold">{results.fileName}</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="text-sm text-slate-400">File Size</div>
            <div className="font-semibold">{(results.fileSize / 1024).toFixed(2)} KB</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="text-sm text-slate-400">Analyzed At</div>
            <div className="font-semibold">{new Date(results.analyzedAt).toLocaleString()}</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="text-sm text-slate-400">Total Issues</div>
            <div className="font-semibold">{results.summary.total}</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Configuration Summary</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="text-sm text-slate-400">Hostname</div>
            <div className="font-semibold">{results.config.hostname || 'Not configured'}</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="text-sm text-slate-400">Interfaces</div>
            <div className="font-semibold">{results.config.interfaces}</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="text-sm text-slate-400">Access Lists</div>
            <div className="font-semibold">{results.config.accessLists}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;