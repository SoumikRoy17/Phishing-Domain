export interface DomainAnalysis {
  domain: string;
  visualSimilarity: number;
  contentSimilarity: number;
  registrationInfo: {
    registrationDate: string;
    registrar: string;
    country: string;
    age: number;
  };
  riskScore: number;
  riskFactors: string[];
  detectionTime: number;
  confidenceScore: number;
  analysisDetails: {
    visualAnalysis: {
      score: number;
      matchedElements: string[];
      colorSimilarity: number;
      layoutSimilarity: number;
    };
    contentAnalysis: {
      score: number;
      matchedKeywords: string[];
      structureSimilarity: number;
    };
    registrationAnalysis: {
      score: number;
      ageRisk: number;
      registrarTrust: number;
      geographicRisk: number;
    };
  };
}

export interface AnalysisResult {
  genuine: string;
  suspicious: string;
  similarity: number;
  details: DomainAnalysis;
  format?: 'detailed' | 'summary' | 'json';
}

export interface WhoisData {
  domainName: string;
  registrar: string;
  creationDate: string;
  registrantCountry: string;
}

export interface BulkAnalysisResult {
  domain: string;
  riskScore: number;
  riskLevel: 'high' | 'medium' | 'low';
  registrationDate: string;
  similarTo?: string;
  detectionTime: number;
  confidenceScore: number;
}