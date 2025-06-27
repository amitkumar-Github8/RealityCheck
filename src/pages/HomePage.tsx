import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Brain, 
  MessageSquare, 
  Upload, 
  TrendingUp, 
  Shield, 
  Zap,
  ArrowRight,
  Sparkles,
  Globe,
  Search
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const HomePage: React.FC = () => {
  const { isDark } = useTheme();

  const features = [
    {
      icon: TrendingUp,
      title: 'Global Pulse',
      description: 'Real-time media verification and fact-checking across global news sources',
      path: '/global-pulse',
      color: 'from-blue-500 to-cyan-500',
      delay: 0.1
    },
    {
      icon: Brain,
      title: 'Insight Engine',
      description: 'Upload documents and get AI-powered research insights and analysis',
      path: '/insight-engine',
      color: 'from-purple-500 to-pink-500',
      delay: 0.2
    },
    {
      icon: MessageSquare,
      title: 'Oracle Room',
      description: 'Chat with advanced AI models for research and strategic guidance',
      path: '/oracle-room',
      color: 'from-green-500 to-emerald-500',
      delay: 0.3
    }
  ];

  const stats = [
    { label: 'Articles Verified', value: '2.4M+', icon: Shield },
    { label: 'AI Models', value: '12+', icon: Brain },
    { label: 'Active Users', value: '50K+', icon: Globe },
    { label: 'Research Papers', value: '180K+', icon: Search }
  ];

  return (
    <div className={`min-h-screen pt-20 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50'
    }`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse ${
          isDark ? 'bg-purple-500' : 'bg-purple-300'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse ${
          isDark ? 'bg-pink-500' : 'bg-pink-300'
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse ${
          isDark ? 'bg-blue-500' : 'bg-blue-300'
        }`}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-20"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full backdrop-blur-sm border transition-all duration-300 ${
              isDark 
                ? 'bg-white/5 border-white/10 text-purple-300' 
                : 'bg-white/50 border-purple-200 text-purple-700'
            }`}>
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Next-Generation Intelligence Platform</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-6xl md:text-8xl font-bold mb-8 leading-tight transition-colors ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Reality Meets
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent block">
              Intelligence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed transition-colors ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Advanced AI-powered platform combining real-time fact verification, 
            document analysis, and strategic intelligence to navigate the information age.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link to="/global-pulse">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl flex items-center justify-center space-x-3 transition-all duration-300"
              >
                <Eye className="w-6 h-6" />
                <span>Explore Global Pulse</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            
            <Link to="/insight-engine">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`backdrop-blur-sm border px-10 py-4 rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center space-x-3 transition-all duration-300 ${
                  isDark
                    ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                    : 'bg-white/50 border-slate-200 text-slate-700 hover:bg-white/70'
                }`}
              >
                <Upload className="w-6 h-6" />
                <span>Upload for Research</span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Link to={feature.path}>
                  <div className={`backdrop-blur-sm border rounded-3xl p-8 transition-all duration-500 shadow-xl hover:shadow-2xl ${
                    isDark
                      ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                      : 'bg-white/50 border-slate-200 hover:bg-white/70 hover:border-slate-300'
                  }`}>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`bg-gradient-to-r ${feature.color} p-4 rounded-2xl w-fit mb-6 shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h3 className={`text-2xl font-bold mb-4 transition-colors ${
                      isDark ? 'text-white group-hover:text-purple-300' : 'text-slate-900 group-hover:text-purple-700'
                    }`}>
                      {feature.title}
                    </h3>
                    
                    <p className={`leading-relaxed mb-6 transition-colors ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {feature.description}
                    </p>
                    
                    <div className={`flex items-center space-x-2 font-semibold transition-colors ${
                      isDark ? 'text-purple-300' : 'text-purple-600'
                    }`}>
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className={`backdrop-blur-sm border rounded-3xl p-8 mb-12 shadow-xl ${
            isDark
              ? 'bg-white/5 border-white/10'
              : 'bg-white/50 border-slate-200'
          }`}
        >
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold mb-2 transition-colors ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Platform Intelligence
            </h2>
            <p className={`transition-colors ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Real-time metrics from our verification network
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg ${
                    isDark
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  }`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className={`text-3xl font-bold mb-2 transition-colors ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm font-medium transition-colors ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className={`text-center py-16 rounded-3xl backdrop-blur-sm border shadow-xl ${
            isDark
              ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20'
              : 'bg-gradient-to-r from-purple-100/50 to-pink-100/50 border-purple-200'
          }`}
        >
          <h2 className={`text-4xl font-bold mb-6 transition-colors ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Ready to Explore Truth?
          </h2>
          <p className={`text-xl mb-8 transition-colors ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Join thousands of researchers, journalists, and analysts using RealityCheck AI
          </p>
          <Link to="/global-pulse">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-2xl font-bold text-xl shadow-2xl flex items-center justify-center space-x-3 mx-auto transition-all duration-300"
            >
              <Zap className="w-6 h-6" />
              <span>Start Exploring</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;