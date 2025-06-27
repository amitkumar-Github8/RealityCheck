import NewsAPI from 'newsapi';
import { supabase } from '../lib/supabase';
import { detectImageManipulation } from './detectImageManipulation';
import { verifyTextClaim } from './verifyTextClaim';
import { summarizeAndStrategize } from './summarizeAndStrategize';

const newsapi = new NewsAPI(import.meta.env.VITE_NEWSAPI_KEY || 'demo-key');

export async function fetchArticles(sector: string = 'general') {
  try {
    console.log(`Fetching articles for sector: ${sector}`);
    
    // Fetch from NewsAPI
    let articles = [];
    
    if (import.meta.env.VITE_NEWSAPI_KEY && import.meta.env.VITE_NEWSAPI_KEY !== 'demo-key') {
      const response = await newsapi.v2.topHeadlines({
        category: sector === 'general' ? undefined : sector,
        language: 'en',
        pageSize: 20
      });
      articles = response.articles || [];
    } else {
      // Use mock data when API key is not available
      articles = generateMockArticles(sector);
    }

    // Process and store articles
    for (const article of articles) {
      if (!article.title || !article.description) continue;

      try {
        // Check if article already exists
        const { data: existingArticle } = await supabase
          .from('articles')
          .select('id')
          .eq('url', article.url)
          .single();

        if (existingArticle) continue;

        // Insert article
        const { data: insertedArticle, error: insertError } = await supabase
          .from('articles')
          .insert({
            title: article.title,
            content: article.description || article.content || '',
            url: article.url,
            image_url: article.urlToImage,
            sector: sector,
            published_at: article.publishedAt || new Date().toISOString()
          })
          .select()
          .single();

        if (insertError || !insertedArticle) {
          console.error('Error inserting article:', insertError);
          continue;
        }

        // Process image if available
        if (article.urlToImage) {
          processImageCheck(insertedArticle.id, article.urlToImage);
        }

        // Process text verification
        processTextVerification(insertedArticle.id, article.title + ' ' + article.description);

      } catch (error) {
        console.error('Error processing article:', error);
      }
    }

    console.log(`Successfully processed ${articles.length} articles`);
    return articles;

  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
}

async function processImageCheck(articleId: string, imageUrl: string) {
  try {
    const result = await detectImageManipulation(imageUrl);
    
    await supabase.from('image_checks').insert({
      article_id: articleId,
      image_url: imageUrl,
      match_count: result.matchCount || 0,
      earliest_date: result.earliestDate,
      context_urls: result.contextUrls || [],
      confidence_score: Math.floor(result.confidence || 85),
      status: result.status || 'verified'
    });
  } catch (error) {
    console.error('Error processing image check:', error);
  }
}

async function processTextVerification(articleId: string, text: string) {
  try {
    const result = await verifyTextClaim(text);
    
    // Insert text check
    await supabase.from('text_checks').insert({
      article_id: articleId,
      claim_text: text.substring(0, 500), // Limit text length
      verification_status: result.verificationStatus || 'unverified',
      confidence_score: result.confidenceScore || 75,
      citations: result.citations || [],
      reasoning: result.reasoning || 'Automated verification completed'
    });

    // Generate strategy
    const strategy = await summarizeAndStrategize(result);
    
    await supabase.from('strategies').insert({
      article_id: articleId,
      summary: strategy.summary,
      action_steps: strategy.actionSteps,
      priority_level: strategy.priorityLevel || 'medium'
    });

  } catch (error) {
    console.error('Error processing text verification:', error);
  }
}

function generateMockArticles(sector: string) {
  const mockArticles = [
    {
      title: "AI-Generated Content Detection Reaches New Milestone",
      description: "Researchers develop advanced algorithms capable of identifying synthetic media with 99.2% accuracy, marking a significant breakthrough in combating misinformation.",
      url: "https://example.com/ai-detection-milestone",
      urlToImage: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      content: "Advanced AI detection systems are revolutionizing how we identify manipulated content across digital platforms."
    },
    {
      title: "Social Media Platforms Implement Real-Time Fact Checking",
      description: "Major social networks roll out automated fact-checking systems powered by machine learning to combat the spread of false information.",
      url: "https://example.com/social-media-fact-check",
      urlToImage: "https://images.pexels.com/photos/267399/pexels-photo-267399.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      content: "Real-time verification systems are being deployed across major social media platforms to enhance information integrity."
    },
    {
      title: "Government Agencies Adopt Advanced Media Verification Tools",
      description: "Federal departments implement cutting-edge image and text verification systems to ensure the authenticity of official communications.",
      url: "https://example.com/government-verification-tools",
      urlToImage: "https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      content: "Government agencies are leading the adoption of sophisticated verification technologies to maintain public trust."
    },
    {
      title: "Deepfake Detection Technology Shows Promise in Early Trials",
      description: "New neural network architectures demonstrate exceptional capability in identifying sophisticated deepfake videos and images.",
      url: "https://example.com/deepfake-detection-trials",
      urlToImage: "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      content: "Breakthrough deepfake detection algorithms are showing unprecedented accuracy in identifying synthetic media content."
    },
    {
      title: "Educational Institutions Launch Media Literacy Programs",
      description: "Universities and schools introduce comprehensive curricula focused on digital media verification and critical thinking skills.",
      url: "https://example.com/media-literacy-programs",
      urlToImage: "https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      content: "Educational institutions are prioritizing media literacy to prepare students for the digital information age."
    }
  ];

  return mockArticles.map(article => ({
    ...article,
    title: `[${sector.toUpperCase()}] ${article.title}`
  }));
}