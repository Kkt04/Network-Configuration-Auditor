/**
 * Report Generator Service
 * Generates audit reports in various formats
 */

const generateReport = (result, format = 'json') => {
    if (format === 'json') {
      return generateJSONReport(result);
    } else if (format === 'txt') {
      return generateTextReport(result);
    }
    return generateJSONReport(result);
  };
  
  const generateJSONReport = (result) => {
    const report = {
      reportInfo: {
        id: result.id,
        fileName: result.file_name || result.fileName,
        analyzedAt: result.analyzed_at || result.analyzedAt,
        generatedAt: new Date().toISOString()
      },
      summary: {
        totalIssues: result.total_issues || result.summary?.total,
        criticalCount: result.critical_count || result.summary?.critical,
        highCount: result.high_count || result.summary?.high,
        mediumCount: result.medium_count || result.summary?.medium,
        lowCount: result.low_count || result.summary?.low,
        securityScore: result.security_score || result.summary?.score
      },
      configuration: {
        hostname: result.hostname || result.config?.hostname,
        interfaces: result.config?.interfaces?.length || 0,
        accessLists: result.config?.accessLists?.length || 0
      },
      issues: result.issues || []
    };
  
    return JSON.stringify(report, null, 2);
  };
  
  const generateTextReport = (result) => {
    const issues = result.issues || [];
    const summary = result.summary || {};
    
    let report = '';
    
    report += '='.repeat(80) + '\n';
    report += 'NETWORK CONFIGURATION SECURITY AUDIT REPORT\n';
    report += '='.repeat(80) + '\n\n';
    
    report += `File Name: ${result.file_name || result.fileName}\n`;
    report += `Analyzed At: ${result.analyzed_at || result.analyzedAt}\n`;
    report += `Report Generated: ${new Date().toISOString()}\n\n`;
    
    report += '-'.repeat(80) + '\n';
    report += 'SECURITY SUMMARY\n';
    report += '-'.repeat(80) + '\n\n';
    
    report += `Security Score: ${result.security_score || summary.score}/100\n`;
    report += `Total Issues: ${result.total_issues || summary.total}\n`;
    report += `  - Critical: ${result.critical_count || summary.critical}\n`;
    report += `  - High: ${result.high_count || summary.high}\n`;
    report += `  - Medium: ${result.medium_count || summary.medium}\n`;
    report += `  - Low: ${result.low_count || summary.low}\n\n`;
    
    if (issues.length > 0) {
      report += '-'.repeat(80) + '\n';
      report += 'DETAILED FINDINGS\n';
      report += '-'.repeat(80) + '\n\n';
      
      issues.forEach((issue, index) => {
        report += `[${index + 1}] ${issue.title}\n`;
        report += `Severity: ${issue.severity.toUpperCase()}\n`;
        report += `Category: ${issue.category}\n`;
        report += `Description: ${issue.description}\n`;
        report += `Location: ${issue.location}\n`;
        report += `Recommendation: ${issue.recommendation}\n`;
        report += `Reference: ${issue.cve}\n`;
        report += '\n';
      });
    }
    
    report += '='.repeat(80) + '\n';
    report += 'END OF REPORT\n';
    report += '='.repeat(80) + '\n';
    
    return report;
  };
  
  module.exports = {
    generateReport,
    generateJSONReport,
    generateTextReport
  };