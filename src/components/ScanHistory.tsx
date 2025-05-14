import React from 'react';
import { Calendar, Search, Shield, AlertTriangle, AlertOctagon } from 'lucide-react';
import { format } from 'date-fns';

interface ScanRecord {
  id: string;
  type: 'domain' | 'email';
  target: string;
  riskLevel: 'safe' | 'suspicious' | 'dangerous';
  score: number;
  timestamp: Date;
}

const mockHistory: ScanRecord[] = [
  {
    id: '1',
    type: 'domain',
    target: 'example.com',
    riskLevel: 'safe',
    score: 0.2,
    timestamp: new Date('2025-04-24T10:00:00')
  },
  {
    id: '2',
    type: 'email',
    target: 'suspicious@test.com',
    riskLevel: 'suspicious',
    score: 0.6,
    timestamp: new Date('2025-04-24T09:45:00')
  },
  {
    id: '3',
    type: 'domain',
    target: 'malicious-site.com',
    riskLevel: 'dangerous',
    score: 0.9,
    timestamp: new Date('2025-04-24T09:30:00')
  }
];

export default function ScanHistory() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-gray-800/30 backdrop-blur rounded-2xl shadow-2xl p-8 border border-gray-700/50">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-100">Scan History</h1>
              <p className="text-gray-400 mt-1">View and analyze past scan results</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search scans..."
                className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-100 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Type</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Target</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Risk Level</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Score</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {mockHistory.map((record) => (
                <tr key={record.id} className="border-b border-gray-700/50 hover:bg-gray-700/20">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      <span className="capitalize">{record.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-300">{record.target}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {record.riskLevel === 'dangerous' ? (
                        <AlertOctagon className="w-4 h-4 text-red-500" />
                      ) : record.riskLevel === 'suspicious' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                      ) : (
                        <Shield className="w-4 h-4 text-emerald-500" />
                      )}
                      <span className={`capitalize ${
                        record.riskLevel === 'dangerous'
                          ? 'text-red-400'
                          : record.riskLevel === 'suspicious'
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                      }`}>
                        {record.riskLevel}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-gray-700">
                        <div
                          style={{ width: `${record.score * 100}%` }}
                          className={`h-2 rounded-full ${
                            record.riskLevel === 'dangerous'
                              ? 'bg-red-500'
                              : record.riskLevel === 'suspicious'
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                          }`}
                        />
                      </div>
                      <span className="text-gray-400">{(record.score * 100).toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-400">
                    {format(record.timestamp, 'MMM d, yyyy HH:mm')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}