import React, { useState, useEffect } from 'react';
import { Shield, Eye, Search, TrendingUp, Users, Globe } from 'lucide-react';
import Dashboard from './components/Dashboard';
import { supabase } from './lib/supabase';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [stats, setStats] = useState({
    articlesAnalyzed: 0,
    imageChecks: 0,
    textVerifications: 0,
    activeUsers: 0
  });

  useEffect(() => {
    // Load real-time stats from Supabase
    loadStats();
    
    // Subscribe to real-time updates
    const subscription = supabase
      .channel('stats')
      .on('postgres_changes', { event: '*', schema: 'public' }, () => {
        loadStats();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadStats = async () => {
    try {
      const [articles, imageChecks, textChecks] = await Promise.all([
        supabase.from('articles').select('id', { count: 'exact' }),
        supabase.from('image_checks').select('id', { count: 'exact' }),
        supabase.from('text_checks').select('id', { count: 'exact' })
      ]);

      setStats({
        articlesAnalyzed: articles.count || 0,
        imageChecks: imageChecks.count || 0,
        textVerifications: textChecks.count || 0,
        activeUsers: Math.floor(Math.random() * 500) + 100 // Mock active users
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  if (showDashboard) {
    return <Dashboard onBack={() => setShowDashboard(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse-slow"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white">RealityCheck AI</span>
              <p className="text-purple-300 text-sm">Advanced Media Verification</p>
            </div>
          </div>
          <button
            onClick={() => setShowDashboard(true)}
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-full hover:bg-white/20 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <Eye className="w-5 h-5" />
            <span className="font-semibold">Launch Dashboard</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
              Verify Media
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent block">
                Detect Truth
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Advanced AI-powered platform combining reverse image search, fact-checking APIs, 
              and GPT analysis to detect manipulated media and verify claims in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => setShowDashboard(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <Search className="w-6 h-6" />
                <span>Start Verification</span>
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-3">
                <Globe className="w-6 h-6" />
                <span>View Demo</span>
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 group">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Image Verification</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                TinEye reverse image search integration to detect reused, manipulated, or miscontextualized images with precise match tracking.
              </p>
              <div className="text-purple-300 text-sm font-semibold">
                • Reverse image search • Match count tracking • Earliest date detection
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 group">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Fact Verification</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                GPT-4 chain-of-thought reasoning combined with Google Fact Check API for comprehensive claim verification and citation tracking.
              </p>
              <div className="text-green-300 text-sm font-semibold">
                • GPT analysis • Fact-check API • Confidence scoring • Citation tracking
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 group">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Real-time Analysis</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                Live news monitoring with automated verification, strategy generation, and real-time database updates via Supabase.
              </p>
              <div className="text-pink-300 text-sm font-semibold">
                • Live monitoring • Auto-verification • Strategy AI • Real-time updates
              </div>
            </div>
          </div>

          {/* Live Stats */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Live Platform Statistics</h2>
              <p className="text-slate-300">Real-time data from our verification network</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2 flex items-center justify-center space-x-2">
                  <TrendingUp className="w-8 h-8 text-purple-400" />
                  <span>{stats.articlesAnalyzed.toLocaleString()}</span>
                </div>
                <div className="text-slate-300 font-medium">Articles Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2 flex items-center justify-center space-x-2">
                  <Eye className="w-8 h-8 text-blue-400" />
                  <span>{stats.imageChecks.toLocaleString()}</span>
                </div>
                <div className="text-slate-300 font-medium">Image Checks</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2 flex items-center justify-center space-x-2">
                  <Search className="w-8 h-8 text-green-400" />
                  <span>{stats.textVerifications.toLocaleString()}</span>
                </div>
                <div className="text-slate-300 font-medium">Text Verifications</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2 flex items-center justify-center space-x-2">
                  <Users className="w-8 h-8 text-pink-400" />
                  <span>{stats.activeUsers.toLocaleString()}</span>
                </div>
                <div className="text-slate-300 font-medium">Active Users</div>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Powered by Advanced AI</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-white/10 p-4 rounded-2xl mb-4">
                  <span className="text-2xl font-bold text-white">GPT-4</span>
                </div>
                <p className="text-slate-300 text-sm">Chain-of-thought reasoning</p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 p-4 rounded-2xl mb-4">
                  <span className="text-2xl font-bold text-white">TinEye</span>
                </div>
                <p className="text-slate-300 text-sm">Reverse image search</p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 p-4 rounded-2xl mb-4">
                  <span className="text-2xl font-bold text-white">Google</span>
                </div>
                <p className="text-slate-300 text-sm">Fact Check API</p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 p-4 rounded-2xl mb-4">
                  <span className="text-2xl font-bold text-white">Supabase</span>
                </div>
                <p className="text-slate-300 text-sm">Real-time database</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;