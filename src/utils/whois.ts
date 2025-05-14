import { WhoisData } from '../types';

// Mock WHOIS data service for frontend demonstration
export async function getWhoisData(domain: string): Promise<WhoisData> {
  const startTime = performance.now();
  
  // Simulate API call delay with variable response time
  const responseTime = Math.random() * 300 + 200; // 200-500ms
  await new Promise(resolve => setTimeout(resolve, responseTime));

  // Generate mock data based on domain characteristics
  const isCommonTLD = domain.endsWith('.com') || domain.endsWith('.org') || domain.endsWith('.net');
  const isSuspiciousTLD = domain.endsWith('.xyz') || domain.endsWith('.info') || domain.endsWith('.biz');
  
  const today = new Date();
  const mockCreationDate = new Date(today.setMonth(today.getMonth() - Math.floor(Math.random() * 24)));

  // Suspicious domains are more likely to have unknown or less trustworthy data
  const registrar = isCommonTLD 
    ? 'Major Domain Registrar Inc.'
    : isSuspiciousTLD 
      ? 'Unknown'
      : Math.random() > 0.5 
        ? 'Regional Registrar LLC'
        : 'Unknown';

  const country = isCommonTLD
    ? 'United States'
    : isSuspiciousTLD
      ? 'Unknown'
      : ['United States', 'Unknown', 'Netherlands', 'Russia', 'China'][Math.floor(Math.random() * 5)];

  return {
    domainName: domain,
    registrar,
    creationDate: mockCreationDate.toISOString(),
    registrantCountry: country
  };
}

export function getDomainAge(registrationDate: string): number {
  const regDate = new Date(registrationDate);
  return Math.floor((new Date().getTime() - regDate.getTime()) / (1000 * 60 * 60 * 24));
}

export function analyzeRegistrationInfo(whoisData: WhoisData): string[] {
  const riskFactors: string[] = [];
  const domainAge = getDomainAge(whoisData.creationDate);

  if (domainAge < 30) {
    riskFactors.push('Domain registered less than 30 days ago');
  }

  if (whoisData.registrar === 'Unknown') {
    riskFactors.push('Unknown registrar information');
  }

  if (whoisData.registrantCountry === 'Unknown') {
    riskFactors.push('Unknown registration country');
  }

  // Additional risk factors based on TLD and registration patterns
  if (whoisData.domainName.endsWith('.xyz') || whoisData.domainName.endsWith('.info')) {
    riskFactors.push('Suspicious top-level domain (TLD)');
  }

  if (whoisData.registrantCountry !== 'Unknown' && 
      ['Russia', 'China'].includes(whoisData.registrantCountry)) {
    riskFactors.push('Registration in high-risk country');
  }

  return riskFactors;
}