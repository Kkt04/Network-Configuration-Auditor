import React, { useState } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import SummaryCards from './components/SummaryCards';
import SecurityScore from './components/SecurityScore';
import TabNavigation from './components/TabNavigation';
import OverviewTab from './components/OverviewTab';
import IssuesTab from './components/IssuesTab';
import ChartsTab from './components/ChartsTab';
import { uploadConfigFile } from './services/apiService';

function App() {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState(null);

  const handleFileUpload = async (file) => {
    try {
      setAnalyzing(true);
      setError(null);
      setResults(null);

      const response = await uploadConfigFile(file);
      setResults(response);
      setActiveTab('overview');
    } catch (err) {
      setError(err.message || 'Failed to analyze configuration');
      console.error('Upload error:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
    setActiveTab('overview');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header results={results} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {!results && !analyzing && (
          <FileUpload 
            onFileUpload={handleFileUpload}
            analyzing={analyzing}
            error={error}
          />
        )}

        {analyzing && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-12 backdrop-blur-sm">
              <div className="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold mb-2">Analyzing Configuration...</h2>
              <p className="text-slate-400">Please wait while we scan for vulnerabilities</p>
            </div>
          </div>
        )}

        {results && (
          <div className="space-y-6">
            <SummaryCards summary={results.summary} />
            <SecurityScore score={results.summary.score} />
            
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl backdrop-blur-sm overflow-hidden">
              <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
              
              <div className="p-6">
                {activeTab === 'overview' && <OverviewTab results={results} />}
                {activeTab === 'issues' && <IssuesTab issues={results.issues} />}
                {activeTab === 'charts' && <ChartsTab issues={results.issues} summary={results.summary} />}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors font-semibold"
              >
                Analyze Another File
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;