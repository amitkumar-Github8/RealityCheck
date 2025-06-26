import React, { useState } from 'react';
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
  TrendingUp,
  Shield
} from 'lucide-react';
import { supabase } from '../lib/supabase';

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
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
      {/* Article Image */}
      {article.image_url && (
        <div className="relative mb-4">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-40 object-cover rounded-xl"
            onError={(e) => {
              e.currentTarget.src = 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop';
            }}
          />
          <div className="absolute top-3 right-3 flex space-x-2">
            <div className={`px-2 py-1 rounded-full border text-xs font-semibold flex items-center space-x-1 ${imageBadge.bg}`}>
              <Eye className="w-3 h-3" />
              <span className={imageBadge.color}>Image</span>
            </div>
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="space-y-4">
        {/* Title */}
        <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 group-hover:text-purple-300 transition-colors">
          {article.title}
        </h3>

        {/* Snippet */}
        <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
          {article.content.substring(0, 150)}...
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <div className={`px-3 py-1 rounded-full border text-xs font-semibold flex items-center space-x-1 ${imageBadge.bg}`}>
            <imageBadge.icon className="w-3 h-3" />
            <span className={imageBadge.color}>
              {imageBadge.text}
              {article.image_check && ` (${article.image_check.confidence_score}%)`}
            </span>
          </div>
          <div className={`px-3 py-1 rounded-full border text-xs font-semibold flex items-center space-x-1 ${textBadge.bg}`}>
            <Search className="w-3 h-3" />
            <span className={textBadge.color}>
              {textBadge.text}
              {article.text_check && ` (${article.text_check.confidence_score}%)`}
            </span>
          </div>
          <div className="px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-xs font-semibold text-purple-300">
            {article.sector.toUpperCase()}
          </div>
        </div>

        {/* Strategy Summary */}
        {article.strategy && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-4 h-4 text-purple-400" />
              <span className="text-white font-semibold text-sm">Strategy</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(article.strategy.priority_level)}`}>
                {article.strategy.priority_level.toUpperCase()}
              </span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
              {article.strategy.summary}
            </p>
          </div>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-slate-400">
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
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-white/10 border border-white/10 text-white text-sm py-2 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center space-x-1"
          >
            <span>Read Full</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          
          {!feedbackSubmitted ? (
            <div className="flex space-x-1">
              <button
                onClick={() => submitFeedback(true)}
                className="bg-green-500/10 border border-green-500/20 text-green-400 p-2 rounded-lg hover:bg-green-500/20 transition-colors"
                title="Helpful"
              >
                <ThumbsUp className="w-3 h-3" />
              </button>
              <button
                onClick={() => submitFeedback(false)}
                className="bg-red-500/10 border border-red-500/20 text-red-400 p-2 rounded-lg hover:bg-red-500/20 transition-colors"
                title="Not helpful"
              >
                <ThumbsDown className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="bg-purple-500/10 border border-purple-500/20 text-purple-400 px-3 py-2 rounded-lg text-xs">
              Thanks!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;