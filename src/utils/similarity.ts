import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import similarity from 'similarity';
import { WhoisData } from '../types';
import { getDomainAge } from './whois';

export async function loadModel() {
  const model = await mobilenet.load();
  return model;
}

export async function getVisualSimilarity(img1Url: string, img2Url: string): Promise<{
  score: number;
  matchedElements: string[];
  colorSimilarity: number;
  layoutSimilarity: number;
}> {
  try {
    const startTime = performance.now();
    const model = await loadModel();
    
    const img1 = new Image();
    const img2 = new Image();
    
    img1.crossOrigin = 'anonymous';
    img2.crossOrigin = 'anonymous';
    
    img1.src = img1Url;
    img2.src = img2Url;
    
    await Promise.all([
      new Promise(resolve => img1.onload = resolve),
      new Promise(resolve => img2.onload = resolve)
    ]);

    const [activation1, activation2] = await Promise.all([
      model.infer(img1, true),
      model.infer(img2, true)
    ]);

    const similarity = Math.abs(tf.metrics.cosineProximity(activation1, activation2).dataSync()[0]);
    
    // Mock additional visual analysis metrics
    const colorSimilarity = similarity * 0.9 + Math.random() * 0.1;
    const layoutSimilarity = similarity * 0.85 + Math.random() * 0.15;
    
    const matchedElements = ['header', 'logo', 'navigation', 'footer'].filter(() => Math.random() > 0.3);

    return {
      score: similarity,
      matchedElements,
      colorSimilarity,
      layoutSimilarity
    };
  } catch (error) {
    console.error('Error calculating visual similarity:', error);
    return {
      score: 0,
      matchedElements: [],
      colorSimilarity: 0,
      layoutSimilarity: 0
    };
  }
}

export function getContentSimilarity(content1: string, content2: string): {
  score: number;
  matchedKeywords: string[];
  structureSimilarity: number;
} {
  const score = similarity(content1, content2);
  
  // Mock content analysis details
  const commonKeywords = ['login', 'account', 'secure', 'verify'];
  const matchedKeywords = commonKeywords.filter(() => Math.random() > 0.4);
  const structureSimilarity = score * 0.95 + Math.random() * 0.05;

  return {
    score,
    matchedKeywords,
    structureSimilarity
  };
}

export function calculateRiskScore(
  visualAnalysis: ReturnType<typeof getVisualSimilarity> extends Promise<infer T> ? T : never,
  contentAnalysis: ReturnType<typeof getContentSimilarity>,
  whoisData: WhoisData
): {
  riskScore: number;
  confidenceScore: number;
  registrationAnalysis: {
    score: number;
    ageRisk: number;
    registrarTrust: number;
    geographicRisk: number;
  };
} {
  const weights = {
    visual: 0.35,
    content: 0.35,
    age: 0.2,
    registration: 0.1
  };

  const domainAge = getDomainAge(whoisData.creationDate);
  const ageRisk = Math.max(0, 1 - (domainAge / 365));
  
  const registrarTrust = whoisData.registrar === 'Unknown' ? 1 : 0.2;
  const geographicRisk = whoisData.registrantCountry === 'Unknown' ? 1 : 0.3;
  
  const registrationScore = (registrarTrust + geographicRisk) / 2;
  
  const riskScore = (
    visualAnalysis.score * weights.visual +
    contentAnalysis.score * weights.content +
    ageRisk * weights.age +
    registrationScore * weights.registration
  );

  // Calculate confidence based on available data quality
  const confidenceScore = (
    (visualAnalysis.matchedElements.length > 0 ? 0.3 : 0) +
    (contentAnalysis.matchedKeywords.length > 0 ? 0.3 : 0) +
    (whoisData.registrar !== 'Unknown' ? 0.2 : 0) +
    (whoisData.registrantCountry !== 'Unknown' ? 0.2 : 0)
  );

  return {
    riskScore,
    confidenceScore,
    registrationAnalysis: {
      score: registrationScore,
      ageRisk,
      registrarTrust,
      geographicRisk
    }
  };
}

export function getRiskLevel(score: number): 'high' | 'medium' | 'low' {
  if (score >= 0.7) return 'high';
  if (score >= 0.4) return 'medium';
  return 'low';
}