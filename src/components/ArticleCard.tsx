import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Clock, 
  Eye, 
  Search, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  ThumbsUp, 
  ThumbsDown,
  Target,
  Shield
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useTheme } from '../contexts/ThemeContext';

interface Article {
  id: string;
  title: string;
  content: string;
  url: string;
  image_url: string | null;
  sector: string;
  published_at: string;
  image_check?: {
    status: 'verified' | 'suspicious' | 'manipulated';
    confidence_score: number;
    match_count: number;
  };
  text_check?: {
    verification_status: 'true' | 'false' | 'mixed' | 'unverified';
    confidence_score: number;
  };
  strategy?: {
    summary: string;
    priority_level: 'low' | 'medium' | 'high' | 'critical';
  };
}

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { isDark } = useTheme();
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getImageBadge = () => {
    if (!article.image_check) {
      return {
        icon: Clock,
        text: 'Processing',
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/10 border-yellow-500/20'
      };
    }

    switch (article.image_check.status) {
      case 'verified':
        return {
          icon: CheckCircle,
          text: 'Verified',
          color: 'text-green-400',
          bg: 'bg-green-500/10 border-green-500/20'
        };
      case 'suspicious':
        return {
          icon: AlertTriangle,
          text: 'Suspicious',
          color: 'text-yellow-400',
          bg: 'bg-yellow-500/10 border-yellow-500/20'
        };
      case 'manipulated':
        return {
          icon: XCircle,
          text: 'Manipulated',
          color: 'text-red-400',
          bg: 'bg-red-500/10 border-red-500/20'
        };
      default:
        return {
          icon: Clock,
          text: 'Processing',
          color: 'text-yellow-400',
          bg: 'bg-yellow-500/10 border-yellow-500/20'
        };
    }
  };

  const getTextBadge = () => {
    if (!article.text_check) {
      return {
        icon: Clock,
        text: 'Processing',
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/10 border-yellow-500/20'
      };
    }

    switch (article.text_check.verification_status) {
      case 'true':
        return {
          icon: CheckCircle,
          text: 'Verified',
          color: 'text-green-400',
          bg: 'bg-green-500/10 border-green-500/20'
        };
      case 'mixed':
        return {
          icon: AlertTriangle,
          text: 'Mixed',
          color: 'text-yellow-400',
          bg: 'bg-yellow-500/10 border-yellow-500/20'
        };
      case 'false':
        return {
          icon: XCircle,
          text: 'False',
          color: 'text-red-400',
          bg: 'bg-red-500/10 border-red-500/20'
        };
      default:
        return {
          icon: Clock,
          text: 'Unverified',
          color: 'text-slate-400',
          bg: 'bg-slate-500/10 border-slate-500/20'
        };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-500/10';
      case 'high': return 'text-orange-400 bg-orange-500/10';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10';
      case 'low': return 'text-green-400 bg-green-500/10';
      default: return 'text-slate-400 bg-slate-500/10';
    }
  };

  const submitFeedback = async (helpful: boolean) => {
    try {
      await supabase.from('feedback').insert({
        article_id: article.id,
        user_rating: helpful ? 5 : 1,
        helpful,
        feedback_text: null
      });
      setFeedbackSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const imageBadge = getImageBadge();
  const textBadge = getTextBadge();

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={`backdrop-blur-sm border rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 group ${
        isDark
          ? 'bg-white/5 border-white/10 hover:bg-white/10'
          : 'bg-white/50 border-slate-200 hover:bg-white/70'
      }`}
    >
      {/* Article Image */}
      {article.image_url && (
        <div className="relative mb-6">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-48 object-cover rounded-2xl"
            onError={(e) => {
              e.currentTarget.src = 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop';
            }}
          />
          <div className="absolute top-4 right-4 flex space-x-2">
            <div className={`px-3 py-1 rounded-full border text-xs font-semibold flex items-center space-x-1 backdrop-blur-sm ${imageBadge.bg}`}>
              <Eye className="w-3 h-3" />
              <span className={imageBadge.color}>Image</span>
            </div>
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="space-y-4">
        {/* Title */}
        <h3 className={`font-bold text-lg leading-tight line-clamp-2 transition-colors group-hover:text-purple-400 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          {article.title}
        </h3>

        {/* Snippet */}
        <p className={`text-sm leading-relaxed line-clamp-3 transition-colors ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {article.content.substring(0, 150)}...
        </p>

        {/* Verification Badges */}
        <div className="flex flex-wrap gap-2">
          <div className={`px-3 py-1 rounded-full border text-xs font-semibold flex items-center space-x-1 backdrop-blur-sm ${imageBadge.bg}`}>
            <imageBadge.icon className="w-3 h-3" />
            <span className={imageBadge.color}>
              {imageBadge.text}
              {article.image_check && ` (${article.image_check.confidence_score}%)`}
            </span>
          </div>
          <div className={`px-3 py-1 rounded-full border text-xs font-semibold flex items-center space-x-1 backdrop-blur-sm ${textBadge.bg}`}>
            <Search className="w-3 h-3" />
            <span className={textBadge.color}>
              {textBadge.text}
              {article.text_check && ` (${article.text_check.confidence_score}%)`}
            </span>
          </div>
          <div className="px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-xs font-semibold text-purple-300 backdrop-blur-sm">
            {article.sector.toUpperCase()}
          </div>
        </div>

        {/* Reality Digest */}
        {article.strategy && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`backdrop-blur-sm border rounded-2xl p-4 ${
              isDark
                ? 'bg-white/5 border-white/10'
                : 'bg-white/50 border-slate-200'
            }`}
          >
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-4 h-4 text-purple-400" />
              <span className={`font-semibold text-sm transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Reality Digest
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(article.strategy.priority_level)}`}>
                {article.strategy.priority_level.toUpperCase()}
              </span>
            </div>
            <p className={`text-xs leading-relaxed line-clamp-2 transition-colors ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {article.strategy.summary}
            </p>
          </motion.div>
        )}

        {/* Meta Information */}
        <div className={`flex items-center justify-between text-xs transition-colors ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          <div className="flex items-center space-x-2">
            <Clock className="w-3 h-3" />
            <span>{formatDate(article.published_at)}</span>
          </div>
          {article.image_check && (
            <div className="flex items-center space-x-2">
              <Shield className="w-3 h-3" />
              <span>{article.image_check.match_count} matches</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 backdrop-blur-sm border text-sm py-3 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 ${
              isDark
                ? 'bg-white/10 border-white/10 text-white hover:bg-white/20'
                : 'bg-white/50 border-slate-200 text-slate-700 hover:bg-white/70'
            }`}
          >
            <span>Read Full</span>
            <ExternalLink className="w-3 h-3" />
          </motion.a>
          
          {!feedbackSubmitted ? (
            <div className="flex space-x-1">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => submitFeedback(true)}
                className="bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded-2xl hover:bg-green-500/20 transition-all duration-300"
                title="Helpful"
              >
                <ThumbsUp className="w-3 h-3" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => submitFeedback(false)}
                className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-2xl hover:bg-red-500/20 transition-all duration-300"
                title="Not helpful"
              >
                <ThumbsDown className="w-3 h-3" />
              </motion.button>
            </div>
          ) : (
            <div className="bg-purple-500/10 border border-purple-500/20 text-purple-400 px-4 py-3 rounded-2xl text-xs font-semibold">
              Thanks!
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;