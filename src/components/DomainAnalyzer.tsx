import React, { useState } from 'react';
import { Shield, AlertTriangle, Check, Search, Calendar, Globe, Loader2 } from 'lucide-react';
import type { AnalysisResult, BulkAnalysisResult } from '../types';
import { getVisualSimilarity, getContentSimilarity, calculateRiskScore, getRiskLevel } from '../utils/similarity';
import { getWhoisData, analyzeRegistrationInfo } from '../utils/whois';

export default function DomainAnalyzer() {
  const [genuineDomain, setGenuineDomain] = useState('');
  const [suspiciousDomain, setSuspiciousDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [bulkResults, setBulkResults] = useState<BulkAnalysisResult[]>([]);
  const [mode, setMode] = useState<'single' | 'bulk'>('single');

  const analyzeDomains = async () => {
    setLoading(true);
    try {
      const whoisData = await getWhoisData(suspiciousDomain);
      const genuineUrl = `https://api.screenshotmachine.com?key=YOUR_KEY&url=${genuineDomain}`;
      const suspiciousUrl = `https://api.screenshotmachine.com?key=YOUR_KEY&url=${suspiciousDomain}`;

      const visualSimilarity = await getVisualSimilarity(genuineUrl, suspiciousUrl);
      const contentSimilarity = getContentSimilarity(genuineDomain, suspiciousDomain);
      const riskScore = calculateRiskScore(visualSimilarity, contentSimilarity, whoisData);
      const riskFactors = analyzeRegistrationInfo(whoisData);

      setResult({
        genuine: genuineDomain,
        suspicious: suspiciousDomain,
        similarity: riskScore,
        details: {
          domain: suspiciousDomain,
          visualSimilarity,
          contentSimilarity,
          registrationInfo: {
            registrationDate: whoisData.creationDate,
            registrar: whoisData.registrar,
            country: whoisData.registrantCountry,
            age: 30
          },
          riskScore,
          riskFactors
        }
      });
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-100">Domain Analysis</h1>
        </div>

        <div className="space-y-8">
          <div className="flex gap-4">
            <button
              onClick={() => setMode('single')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                mode === 'single' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Single Domain
            </button>
            <button
              onClick={() => setMode('bulk')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                mode === 'bulk' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Bulk Analysis
            </button>
          </div>

          {mode === 'single' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Genuine Domain
                </label>
                <input
                  type="text"
                  value={genuineDomain}
                  onChange={(e) => setGenuineDomain(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-400"
                  placeholder="example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Suspicious Domain
                </label>
                <input
                  type="text"
                  value={suspiciousDomain}
                  onChange={(e) => setSuspiciousDomain(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-400"
                  placeholder="examp1e.com"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Domains List (one per line)
              </label>
              <textarea
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-400 h-32"
                placeholder="example1.com&#10;example2.com&#10;example3.com"
              />
            </div>
          )}

          {mode === 'single' && (
            <button
              onClick={analyzeDomains}
              disabled={loading || !genuineDomain || !suspiciousDomain}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Analyze Domain
                </>
              )}
            </button>
          )}

          {mode === 'single' && result && (
            <div className="mt-8 space-y-6">
              <div className="bg-gray-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  {result.details.riskScore > 0.7 ? (
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                  ) : (
                    <Check className="w-6 h-6 text-green-500" />
                  )}
                  <h2 className="text-xl font-semibold">Analysis Results</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <p className="text-gray-400 mb-1">Visual Similarity</p>
                    <p className="text-2xl font-semibold">
                      {(result.details.visualSimilarity * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <p className="text-gray-400 mb-1">Content Similarity</p>
                    <p className="text-2xl font-semibold">
                      {(result.details.contentSimilarity * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-400 mb-2">Risk Score</p>
                  <div className="relative pt-1">
                    <div className="h-2 rounded-full bg-gray-600">
                      <div
                        style={{ width: `${result.details.riskScore * 100}%` }}
                        className={`h-2 rounded-full ${
                          result.details.riskScore > 0.7 ? 'bg-red-500' : 'bg-green-500'
                        }`}
                      />
                    </div>
                    <p className="mt-2 text-2xl font-semibold">
                      {(result.details.riskScore * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="font-medium mb-4">Domain Registration Info</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <p>Registration Date: {new Date(result.details.registrationInfo.registrationDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-gray-400" />
                      <p>Registrar: {result.details.registrationInfo.registrar}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <p>Country: {result.details.registrationInfo.country}</p>
                    </div>
                  </div>
                </div>

                {result.details.riskFactors && result.details.riskFactors.length > 0 && (
                  <div className="mt-6 bg-red-900/20 border border-red-900/50 rounded-lg p-4">
                    <h3 className="font-medium mb-2 text-red-400">Risk Factors</h3>
                    <ul className="list-disc list-inside space-y-1 text-red-300">
                      {result.details.riskFactors.map((factor, index) => (
                        <li key={index}>{factor}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}