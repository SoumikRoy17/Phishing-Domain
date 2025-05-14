export function analyzeDomain(domain: string) {
  // Simple domain analysis without external APIs
  const hasSpecialChars = /[^a-zA-Z0-9-.]/.test(domain);
  const hasSuspiciousTLD = /(\.xyz|\.info|\.tk)$/.test(domain);
  const hasNumbersAndLetters = /\d/.test(domain) && /[a-zA-Z]/.test(domain);
  
  let riskScore = 0;
  
  if (hasSpecialChars) riskScore += 0.4;
  if (hasSuspiciousTLD) riskScore += 0.3;
  if (hasNumbersAndLetters) riskScore += 0.2;
  
  return {
    score: Math.min(1, riskScore),
    details: {
      hasSpecialChars,
      hasSuspiciousTLD,
      hasNumbersAndLetters
    }
  };
}

export function analyzeEmail(email: string) {
  // Simple email analysis without external APIs
  const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const hasSuspiciousDomain = /(\.xyz|\.info|\.tk)$/.test(email);
  const hasUncommonChars = /[^a-zA-Z0-9@._-]/.test(email);
  
  let riskScore = 0;
  
  if (!isValidFormat) riskScore += 0.5;
  if (hasSuspiciousDomain) riskScore += 0.3;
  if (hasUncommonChars) riskScore += 0.2;
  
  return {
    score: Math.min(1, riskScore),
    details: {
      isValidFormat,
      hasSuspiciousDomain,
      hasUncommonChars
    }
  };
}