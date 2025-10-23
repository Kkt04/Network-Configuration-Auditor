import React from 'react';
import { Shield, Download } from 'lucide-react';
import { downloadReport } from '../services/apiService';

const Header = ({ results }) => {
  const handleDownload = () => {
    if (results?.id) {
      downloadReport(results.id, 'json');
    }
  };

  return (
    <div className="bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Network Configuration Auditor</h1>
              <p className="text-sm text-slate-400">Automated Security Analysis</p>
            </div>
          </div>
          {results && (
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Export Report
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;