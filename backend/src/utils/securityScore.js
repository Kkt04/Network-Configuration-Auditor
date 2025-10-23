/**
 * Security Score Calculator
 * Calculates overall security score based on vulnerability counts
 */

const calculateSecurityScore = (critical, high, medium, low) => {
    const MAX_SCORE = 100;
    
    // Deduction weights
    const CRITICAL_WEIGHT = 25;
    const HIGH_WEIGHT = 15;
    const MEDIUM_WEIGHT = 8;
    const LOW_WEIGHT = 3;
    
    const deductions = 
      (critical * CRITICAL_WEIGHT) +
      (high * HIGH_WEIGHT) +
      (medium * MEDIUM_WEIGHT) +
      (low * LOW_WEIGHT);
    
    const score = Math.max(0, MAX_SCORE - deductions);
    
    return Math.round(score);
  };
  
  const getScoreRating = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    if (score >= 30) return 'Poor';
    return 'Critical';
  };
  
  const getScoreColor = (score) => {
    if (score >= 70) return 'green';
    if (score >= 40) return 'yellow';
    return 'red';
  };
  
  module.exports = {
    calculateSecurityScore,
    getScoreRating,
    getScoreColor
  };