import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import IssueCard from './IssueCard';

const IssuesTab = ({ issues }) => {
  const [expandedIssues, setExpandedIssues] = useState({});

  const toggleIssue = (index) => {
    setExpandedIssues(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (issues.length === 0) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Issues Found!</h3>
        <p className="text-slate-400">Your configuration looks secure.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {issues.map((issue, idx) => (
        <IssueCard
          key={idx}
          issue={issue}
          isExpanded={expandedIssues[idx]}
          onToggle={() => toggleIssue(idx)}
        />
      ))}
    </div>
  );
};

export default IssuesTab;