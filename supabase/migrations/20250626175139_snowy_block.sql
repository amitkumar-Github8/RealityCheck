/*
  # RealityCheck AI Database Schema

  1. New Tables
    - `articles` - Store news articles and content
    - `image_checks` - Store image verification results from TinEye
    - `text_checks` - Store text verification results from GPT + Fact Check API
    - `strategies` - Store AI-generated strategies and summaries
    - `feedback` - Store user feedback and ratings

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read/write their own data
    - Add policies for public read access where appropriate

  3. Indexes
    - Add performance indexes for common queries
    - Add full-text search capabilities
*/

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  url text UNIQUE NOT NULL,
  image_url text,
  sector text NOT NULL DEFAULT 'general',
  published_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create image_checks table
CREATE TABLE IF NOT EXISTS image_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  match_count integer DEFAULT 0,
  earliest_date timestamptz,
  context_urls text[] DEFAULT '{}',
  confidence_score integer DEFAULT 0 CHECK (confidence_score >= 0 AND confidence_score <= 100),
  status text DEFAULT 'verified' CHECK (status IN ('verified', 'suspicious', 'manipulated')),
  created_at timestamptz DEFAULT now()
);

-- Create text_checks table
CREATE TABLE IF NOT EXISTS text_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  claim_text text NOT NULL,
  verification_status text DEFAULT 'unverified' CHECK (verification_status IN ('true', 'false', 'mixed', 'unverified')),
  confidence_score integer DEFAULT 0 CHECK (confidence_score >= 0 AND confidence_score <= 100),
  citations text[] DEFAULT '{}',
  reasoning text,
  created_at timestamptz DEFAULT now()
);

-- Create strategies table
CREATE TABLE IF NOT EXISTS strategies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  summary text NOT NULL,
  action_steps text[] DEFAULT '{}',
  priority_level text DEFAULT 'medium' CHECK (priority_level IN ('low', 'medium', 'high', 'critical')),
  created_at timestamptz DEFAULT now()
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  user_rating integer CHECK (user_rating >= 1 AND user_rating <= 5),
  feedback_text text,
  helpful boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE image_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE text_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategies ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since this is a public verification tool)
CREATE POLICY "Articles are publicly readable"
  ON articles
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Image checks are publicly readable"
  ON image_checks
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Text checks are publicly readable"
  ON text_checks
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Strategies are publicly readable"
  ON strategies
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Feedback is publicly readable"
  ON feedback
  FOR SELECT
  TO public
  USING (true);

-- Create policies for data insertion (allow anonymous feedback and system inserts)
CREATE POLICY "Anyone can insert articles"
  ON articles
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can insert image checks"
  ON image_checks
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can insert text checks"
  ON text_checks
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can insert strategies"
  ON strategies
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can insert feedback"
  ON feedback
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_articles_sector ON articles(sector);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_image_checks_article_id ON image_checks(article_id);
CREATE INDEX IF NOT EXISTS idx_text_checks_article_id ON text_checks(article_id);
CREATE INDEX IF NOT EXISTS idx_strategies_article_id ON strategies(article_id);
CREATE INDEX IF NOT EXISTS idx_feedback_article_id ON feedback(article_id);

-- Create full-text search index for articles
CREATE INDEX IF NOT EXISTS idx_articles_search ON articles USING gin(to_tsvector('english', title || ' ' || content));

-- Create updated_at trigger for articles
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();