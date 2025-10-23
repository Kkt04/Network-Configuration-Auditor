import React from 'react';
import { Upload, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

const FileUpload = ({ onFileUpload, analyzing, error }) => {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-slate-800/50 border-2 border-dashed border-slate-600 rounded-2xl p-12 text-center backdrop-blur-sm">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Upload className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Upload Configuration File</h2>
        <p className="text-slate-400 mb-6">
          Upload your router or switch configuration file for automated security analysis
        </p>
        
        <label className="relative inline-block">
          <input
            type="file"
            accept=".txt,.cfg,.conf"
            onChange={handleChange}
            className="hidden"
            disabled={analyzing}
          />
          <span className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg font-semibold cursor-pointer inline-block transition-all transform hover:scale-105">
            {analyzing ? 'Analyzing...' : 'Choose File'}
          </span>
        </label>

        {error && (
          <div className="mt-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400">
            <p className="font-semibold">Error: {error}</p>
          </div>
        )}

        <div className="mt-8 text-sm text-slate-500">
          <p>Supported formats: .txt, .cfg, .conf</p>
          <p>Cisco IOS-like configuration syntax</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-8">
        {[
          { icon: Shield, title: 'Vulnerability Detection', desc: 'Identifies security misconfigurations' },
          { icon: AlertTriangle, title: 'Risk Assessment', desc: 'Categorizes issues by severity' },
          { icon: CheckCircle, title: 'Recommendations', desc: 'Provides actionable fixes' }
        ].map((feature, idx) => (
          <div key={idx} className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
            <feature.icon className="w-8 h-8 text-cyan-400 mb-3" />
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-slate-400">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;