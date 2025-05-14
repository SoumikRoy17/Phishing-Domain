import React from 'react';
import { BarChart3, TrendingUp, ShieldCheck, AlertTriangle, AlertOctagon } from 'lucide-react';

export default function Analytics() {
  const stats = {
    totalScans: 1247,
    averageScore: 42.5,
    riskDistribution: {
      safe: 65,
      suspicious: 25,
      dangerous: 10
    },
    recentTrend: 'decreasing'
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-gray-800/30 backdrop-blur rounded-2xl shadow-2xl p-8 border border-gray-700/50">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center">
            <BarChart3 className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-100">Analytics Overview</h1>
            <p className="text-gray-400 mt-1">Comprehensive analysis of scan results</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-semibold">Total Scans</h3>
            </div>
            <p className="text-3xl font-bold text-emerald-400">{stats.totalScans}</p>
          </div>
          
          <div className="bg-gray-900/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-semibold">Average Score</h3>
            </div>
            <p className="text-3xl font-bold text-emerald-400">{stats.averageScore}%</p>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              <h3 className="text-lg font-semibold">Risk Level</h3>
            </div>
            <div className="h-2 rounded-full bg-gray-700 mb-4">
              <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${stats.riskDistribution.safe}%` }} />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Safe</span>
              <span className="font-medium text-emerald-400">{stats.riskDistribution.safe}%</span>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertOctagon className="w-6 h-6 text-red-400" />
              <h3 className="text-lg font-semibold">Threat Trend</h3>
            </div>
            <p className="text-3xl font-bold text-emerald-400 capitalize">{stats.recentTrend}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-900/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6">Risk Distribution</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Safe</span>
                  <span className="font-medium text-emerald-400">{stats.riskDistribution.safe}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-700">
                  <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${stats.riskDistribution.safe}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Suspicious</span>
                  <span className="font-medium text-amber-400">{stats.riskDistribution.suspicious}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-700">
                  <div className="h-2 rounded-full bg-amber-500" style={{ width: `${stats.riskDistribution.suspicious}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Dangerous</span>
                  <span className="font-medium text-red-400">{stats.riskDistribution.dangerous}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-700">
                  <div className="h-2 rounded-full bg-red-500" style={{ width: `${stats.riskDistribution.dangerous}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      i === 0 ? 'bg-red-500' : i === 1 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} />
                    <span className="text-gray-300">example{i + 1}.com</span>
                  </div>
                  <span className="text-gray-400">{30 - i * 5}m ago</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}