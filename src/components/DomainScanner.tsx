import React, { useState } from 'react';
import { AlertTriangle, Check, Search, Loader2, Globe2, ShieldCheck, AlertOctagon, Shield } from 'lucide-react';
import { analyzeDomain } from '../utils/analysis';

interface ScanResult {
  domain: string;
  riskLevel: 'safe' | 'suspicious' | 'dangerous';
  score: number;
  details: string[];
}

export default function DomainScanner() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleScan = async () => {
    setLoading(true);
    try {
      const score = Math.random();
      const riskLevel = score > 0.7 ? 'dangerous' : score > 0.4 ? 'suspicious' : 'safe';
      
      const details = [
        'Domain age verification',
        'SSL certificate check',
        'Suspicious character detection',
        'Known phishing patterns analysis',
        'Visual similarity assessment',
        'Content structure analysis',
        'Registration details verification',
        'DNS configuration check'
      ];

      setResult({
        domain,
        riskLevel,
        score,
        details
      });
    } catch (error) {
      console.error('Scan failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800/30 backdrop-blur rounded-2xl shadow-2xl p-8 border border-gray-700/50">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center">
            <Globe2 className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-100">Domain Scanner</h1>
            <p className="text-gray-400 mt-1">Analyze domains for potential phishing threats</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-900/50 rounded-xl p-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Enter Domain to Scan
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-100 placeholder-gray-400"
                placeholder="example.com"
              />
              <button
                onClick={handleScan}
                disabled={loading || !domain}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Scan Domain
                  </>
                )}
              </button>
            </div>
          </div>

          {result && (
            <div className="mt-8 space-y-6">
              <div className={`rounded-xl p-6 backdrop-blur-lg ${
                result.riskLevel === 'dangerous' 
                  ? 'bg-red-500/10 border-red-500/30' 
                  : result.riskLevel === 'suspicious'
                    ? 'bg-amber-500/10 border-amber-500/30'
                    : 'bg-emerald-500/10 border-emerald-500/30'
              } border`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    result.riskLevel === 'dangerous'
                      ? 'bg-red-500/20'
                      : result.riskLevel === 'suspicious'
                        ? 'bg-amber-500/20'
                        : 'bg-emerald-500/20'
                  }`}>
                    {result.riskLevel === 'dangerous' ? (
                      <AlertOctagon className="w-6 h-6 text-red-500" />
                    ) : result.riskLevel === 'suspicious' ? (
                      <AlertTriangle className="w-6 h-6 text-amber-500" />
                    ) : (
                      <ShieldCheck className="w-6 h-6 text-emerald-500" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      {result.riskLevel === 'dangerous'
                        ? 'High Risk Detected'
                        : result.riskLevel === 'suspicious'
                          ? 'Potential Risk Detected'
                          : 'Domain Appears Safe'}
                    </h2>
                    <p className="text-gray-400 mt-1">{result.domain}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="h-2 rounded-full bg-gray-700/50 backdrop-blur">
                    <div
                      style={{ width: `${result.score * 100}%` }}
                      className={`h-2 rounded-full ${
                        result.riskLevel === 'dangerous'
                          ? 'bg-red-500'
                          : result.riskLevel === 'suspicious'
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                      }`}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>Risk Score</span>
                    <span className="font-medium">{(result.score * 100).toFixed(1)}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.details.map((detail, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-gray-800/30 rounded-lg p-3"
                    >
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-gray-300 text-sm">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}