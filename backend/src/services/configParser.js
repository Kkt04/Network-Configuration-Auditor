/**
 * Configuration Parser Service
 * Parses Cisco IOS-like configuration files
 */

const parseConfiguration = (content) => {
    const lines = content.split('\n');
    const config = {
      hostname: '',
      interfaces: [],
      accessLists: [],
      passwords: [],
      services: [],
      snmp: [],
      vty: [],
      routing: [],
      ntp: [],
      logging: [],
      banner: []
    };
  
    let currentInterface = null;
    let currentACL = null;
    let currentSection = null;
  
    lines.forEach(line => {
      line = line.trim();
      
      // Skip comments and empty lines
      if (!line || line.startsWith('!')) return;
  
      // Parse hostname
      if (line.startsWith('hostname')) {
        config.hostname = line.split(/\s+/)[1] || '';
      }
  
      // Parse interfaces
      if (line.startsWith('interface')) {
        currentInterface = {
          name: line.split(/\s+/)[1] || '',
          config: [],
          hasACL: false,
          ipAddress: '',
          description: ''
        };
        config.interfaces.push(currentInterface);
        currentSection = 'interface';
      } else if (currentInterface && currentSection === 'interface') {
        if (line.startsWith('interface') || line.startsWith('!')) {
          currentInterface = null;
          currentSection = null;
        } else {
          currentInterface.config.push(line);
          
          if (line.includes('ip access-group')) {
            currentInterface.hasACL = true;
          }
          if (line.includes('ip address')) {
            currentInterface.ipAddress = line;
          }
          if (line.includes('description')) {
            currentInterface.description = line.replace('description', '').trim();
          }
        }
      }
  
      // Parse access lists
      if (line.startsWith('access-list') || line.startsWith('ip access-list')) {
        if (!currentACL || line.startsWith('ip access-list')) {
          currentACL = {
            name: line,
            rules: [],
            type: line.includes('extended') ? 'extended' : 'standard'
          };
          config.accessLists.push(currentACL);
        }
        currentACL.rules.push(line);
      }
  
      // Parse passwords
      if (line.includes('password') || line.includes('secret')) {
        config.passwords.push(line);
      }
  
      // Parse services
      if (line.startsWith('ip http') || line.startsWith('service')) {
        config.services.push(line);
      }
  
      // Parse SNMP
      if (line.includes('snmp')) {
        config.snmp.push(line);
      }
  
      // Parse VTY lines
      if (line.startsWith('line vty') || line.startsWith('line con') || line.startsWith('line aux')) {
        config.vty.push(line);
      }
  
      // Parse routing
      if (line.startsWith('router') || line.startsWith('ip route')) {
        config.routing.push(line);
      }
  
      // Parse NTP
      if (line.includes('ntp')) {
        config.ntp.push(line);
      }
  
      // Parse logging
      if (line.includes('logging')) {
        config.logging.push(line);
      }
  
      // Parse banner
      if (line.includes('banner')) {
        config.banner.push(line);
      }
    });
  
    return config;
  };
  
  const extractConfigMetadata = (config) => {
    return {
      hostname: config.hostname || 'Unknown',
      interfaceCount: config.interfaces.length,
      aclCount: config.accessLists.length,
      hasNTP: config.ntp.length > 0,
      hasLogging: config.logging.length > 0,
      hasSNMP: config.snmp.length > 0,
      routingConfigured: config.routing.length > 0
    };
  };
  
  module.exports = {
    parseConfiguration,
    extractConfigMetadata
  };