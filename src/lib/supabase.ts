import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Database = {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string;
          title: string;
          content: string;
          url: string;
          image_url: string | null;
          sector: string;
          published_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          url: string;
          image_url?: string | null;
          sector: string;
          published_at: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          url?: string;
          image_url?: string | null;
          sector?: string;
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      image_checks: {
        Row: {
          id: string;
          article_id: string;
          image_url: string;
          match_count: number;
          earliest_date: string | null;
          context_urls: string[];
          confidence_score: number;
          status: 'verified' | 'suspicious' | 'manipulated';
          created_at: string;
        };
        Insert: {
          id?: string;
          article_id: string;
          image_url: string;
          match_count: number;
          earliest_date?: string | null;
          context_urls: string[];
          confidence_score: number;
          status: 'verified' | 'suspicious' | 'manipulated';
          created_at?: string;
        };
        Update: {
          id?: string;
          article_id?: string;
          image_url?: string;
          match_count?: number;
          earliest_date?: string | null;
          context_urls?: string[];
          confidence_score?: number;
          status?: 'verified' | 'suspicious' | 'manipulated';
          created_at?: string;
        };
      };
      text_checks: {
        Row: {
          id: string;
          article_id: string;
          claim_text: string;
          verification_status: 'true' | 'false' | 'mixed' | 'unverified';
          confidence_score: number;
          citations: string[];
          reasoning: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          article_id: string;
          claim_text: string;
          verification_status: 'true' | 'false' | 'mixed' | 'unverified';
          confidence_score: number;
          citations: string[];
          reasoning: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          article_id?: string;
          claim_text?: string;
          verification_status?: 'true' | 'false' | 'mixed' | 'unverified';
          confidence_score?: number;
          citations?: string[];
          reasoning?: string;
          created_at?: string;
        };
      };
      strategies: {
        Row: {
          id: string;
          article_id: string;
          summary: string;
          action_steps: string[];
          priority_level: 'low' | 'medium' | 'high' | 'critical';
          created_at: string;
        };
        Insert: {
          id?: string;
          article_id: string;
          summary: string;
          action_steps: string[];
          priority_level: 'low' | 'medium' | 'high' | 'critical';
          created_at?: string;
        };
        Update: {
          id?: string;
          article_id?: string;
          summary?: string;
          action_steps?: string[];
          priority_level?: 'low' | 'medium' | 'high' | 'critical';
          created_at?: string;
        };
      };
      feedback: {
        Row: {
          id: string;
          article_id: string;
          user_rating: number;
          feedback_text: string | null;
          helpful: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          article_id: string;
          user_rating: number;
          feedback_text?: string | null;
          helpful: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          article_id?: string;
          user_rating?: number;
          feedback_text?: string | null;
          helpful?: boolean;
          created_at?: string;
        };
      };
    };
  };
};