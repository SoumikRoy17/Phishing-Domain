import { supabase } from '../lib/supabase';
import { getVisualSimilarity, getContentSimilarity, calculateRiskScore } from '../utils/similarity';
import { getWhoisData } from '../utils/whois';
import type { AnalysisResult } from '../types';

export async function analyzeDomain(genuineDomain: string, suspiciousDomain: string): Promise<AnalysisResult> {
  const startTime = performance.now();

  // Store domains
  const [genuineResult, suspiciousResult] = await Promise.all([
    supabase.from('domains').upsert({ domain: genuineDomain, is_genuine: true }).select().single(),
    supabase.from('domains').upsert({ domain: suspiciousDomain, is_genuine: false }).select().single()
  ]);

  if (!genuineResult.data || !suspiciousResult.data) {
    throw new Error('Failed to store domains');
  }

  // Perform analysis
  const whoisData = await getWhoisData(suspiciousDomain);
  const visualSimilarity = await getVisualSimilarity(
    `https://api.screenshotmachine.com?key=${import.meta.env.VITE_SCREENSHOT_API_KEY}&url=${genuineDomain}`,
    `https://api.screenshotmachine.com?key=${import.meta.env.VITE_SCREENSHOT_API_KEY}&url=${suspiciousDomain}`
  );
  const contentSimilarity = getContentSimilarity(genuineDomain, suspiciousDomain);
  const { riskScore, confidenceScore } = calculateRiskScore(visualSimilarity, contentSimilarity, whoisData);

  const detectionTime = performance.now() - startTime;

  // Store analysis result
  await supabase.from('analysis_results').upsert({
    genuine_domain_id: genuineResult.data.id,
    suspicious_domain_id: suspiciousResult.data.id,
    visual_similarity: visualSimilarity.score,
    content_similarity: contentSimilarity.score,
    risk_score: riskScore,
    detection_time: detectionTime,
    confidence_score: confidenceScore
  });

  return {
    genuine: genuineDomain,
    suspicious: suspiciousDomain,
    similarity: riskScore,
    details: {
      domain: suspiciousDomain,
      visualSimilarity: visualSimilarity.score,
      contentSimilarity: contentSimilarity.score,
      registrationInfo: {
        registrationDate: whoisData.creationDate,
        registrar: whoisData.registrar,
        country: whoisData.registrantCountry,
        age: 0 // Calculated on display
      },
      riskScore,
      riskFactors: [],
      detectionTime,
      confidenceScore,
      analysisDetails: {
        visualAnalysis: visualSimilarity,
        contentAnalysis: contentSimilarity,
        registrationAnalysis: {
          score: 0,
          ageRisk: 0,
          registrarTrust: 0,
          geographicRisk: 0
        }
      }
    }
  };
}