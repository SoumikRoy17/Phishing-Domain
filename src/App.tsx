import React, { useState } from 'react';
import { Shield, Mail, Globe2, AlertTriangle, ShieldCheck, History, BarChart3 } from 'lucide-react';
import DomainScanner from './components/DomainScanner';
import EmailScanner from './components/EmailScanner';
import ScanHistory from './components/ScanHistory';
import Analytics from './components/Analytics';

function App() {
  const [activePage, setActivePage] = useState<'domain' | 'email' | 'history' | 'analytics'>('domain');

  const renderContent = () => {
    switch (activePage) {
      case 'history':
        return <ScanHistory />;
      case 'analytics':
        return <Analytics />;
      case 'email':
        return <EmailScanner />;
      default:
        return <DomainScanner />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <nav className="bg-black/50 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-emerald-500" />
              <span className="text-xl font-bold">PhishGuard Enterprise</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setActivePage('domain')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activePage === 'domain' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Globe2 className="w-4 h-4" />
                <span>Domain Scanner</span>
              </button>
              <button
                onClick={() => setActivePage('email')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activePage === 'email' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Email Scanner</span>
              </button>
              <button
                onClick={() => setActivePage('history')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activePage === 'history' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <History className="w-4 h-4" />
                <span>Scan History</span>
              </button>
              <button
                onClick={() => setActivePage('analytics')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activePage === 'analytics' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: '0.05'
          }}
        />
        <main className="relative py-12 px-4 sm:px-6 lg:px-8">
          {renderContent()}
        </main>
      </div>

      <footer className="bg-black/50 backdrop-blur border-t border-gray-800 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-400">
            <div>
              <h4 className="text-white font-semibold mb-4">About PhishGuard</h4>
              <p className="text-sm">
                Enterprise-grade protection against sophisticated phishing attacks.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Features</h4>
              <ul className="text-sm space-y-2">
                <li>Real-time scanning</li>
                <li>AI-powered analysis</li>
                <li>24/7 monitoring</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Security</h4>
              <ul className="text-sm space-y-2">
                <li>Advanced threat detection</li>
                <li>Continuous updates</li>
                <li>Enterprise compliance</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            <p>© 2025 PhishGuard Enterprise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;