import React from 'react';
import { AlertTriangle } from 'lucide-react';

const SummaryCards = ({ summary }) => {
  const cards = [
    { label: 'CRITICAL', count: summary.critical, color: 'red' },
    { label: 'HIGH', count: summary.high, color: 'orange' },
    { label: 'MEDIUM', count: summary.medium, color: 'yellow' },
    { label: 'LOW', count: summary.low, color: 'blue' }
  ];

  const getColorClasses = (color) => {
    const colors = {
      red: 'from-red-500/20 to-red-600/20 border-red-500/30 text-red-400',
      orange: 'from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-400',
      yellow: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-400',
      blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400'
    };
    return colors[color];
  };

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {cards.map((card, idx) => (
        <div 
          key={idx}
          className={`bg-gradient-to-br ${getColorClasses(card.color)} border rounded-xl p-6 backdrop-blur-sm`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-semibold ${card.color === 'red' ? 'text-red-400' : card.color === 'orange' ? 'text-orange-400' : card.color === 'yellow' ? 'text-yellow-400' : 'text-blue-400'}`}>
              {card.label}
            </span>
            <AlertTriangle className={`w-5 h-5 ${card.color === 'red' ? 'text-red-400' : card.color === 'orange' ? 'text-orange-400' : card.color === 'yellow' ? 'text-yellow-400' : 'text-blue-400'}`} />
          </div>
          <div className="text-3xl font-bold">{card.count}</div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;