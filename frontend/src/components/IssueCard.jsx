import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const IssueCard = ({ issue, isExpanded, onToggle }) => {
  const getSeverityColor = (severity) => {
    const colors = {
      critical: '#ef4444',
      high: '#f97316',
      medium: '#eab308',
      low: '#3b82f6'
    };
    return colors[severity] || '#6b7280';
  };

  const getSeverityBgColor = (severity) => {
    const colors = {
      critical: '#fee2e2',
      high: '#ffedd5',
      medium: '#fef3c7',
      low: '#dbeafe'
    };
    return colors[severity] || '#f3f4f6';
  };

  return (
    <div className="bg-slate-700/30 border border-slate-600 rounded-lg overflow-hidden">
      <div
        className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold uppercase"
                style={{
                  backgroundColor: getSeverityBgColor(issue.severity),
                  color: getSeverityColor(issue.severity)
                }}
              >
                {issue.severity}
              </span>
              <span className="text-sm text-slate-400">{issue.category}</span>
            </div>
            <h4 className="font-semibold mb-1">{issue.title}</h4>
            <p className="text-sm text-slate-400">{issue.description}</p>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-slate-600 pt-4">
          <div>
            <div className="text-sm text-slate-400 mb-1">Location</div>
            <code className="block bg-slate-900 rounded p-2 text-sm text-cyan-400 overflow-x-auto">
              {issue.location}
            </code>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Recommendation</div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3 text-sm">
              {issue.recommendation}
            </div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Reference</div>
            <div className="text-sm text-slate-300">{issue.cve}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueCard;