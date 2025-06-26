# RealityCheck AI

Advanced AI-powered media verification platform that combines reverse image search, fact-checking APIs, and GPT analysis to detect manipulated media and verify claims in real-time.

## 🚀 Features

### 🔍 **Image Verification**
- **TinEye Integration**: Reverse image search to detect reused, manipulated, or miscontextualized images
- **Match Tracking**: Precise count of image matches across the web
- **Timeline Analysis**: Earliest appearance date detection
- **Context URLs**: Source tracking for comprehensive verification

### 📝 **Text Verification**
- **GPT-4 Analysis**: Chain-of-thought reasoning for claim verification
- **Google Fact Check API**: Integration with authoritative fact-checking sources
- **Confidence Scoring**: Reliability metrics for each verification
- **Citation Tracking**: Comprehensive source documentation

### 🎯 **Strategy Generation**
- **AI-Powered Summaries**: Clear problem identification and analysis
- **Actionable Steps**: Specific, prioritized action recommendations
- **Priority Levels**: Critical, high, medium, and low priority classification
- **Stakeholder Identification**: Relevant parties for each situation

### 📊 **Real-Time Dashboard**
- **Live Updates**: Real-time database synchronization via Supabase
- **Sector Filtering**: Politics, technology, health, climate, business categories
- **Search Functionality**: Full-text search across articles and content
- **User Feedback**: Community-driven quality assessment

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for responsive, modern UI design
- **Lucide React** for consistent iconography

### Backend & APIs
- **OpenAI GPT-4** for text analysis and strategy generation
- **TinEye API** for reverse image search capabilities
- **Google Fact Check API** for authoritative verification
- **NewsAPI** for real-time news article fetching
- **RSS Parser** for additional news source integration

### Database & Real-Time
- **Supabase** (PostgreSQL) for data storage
- **Real-time subscriptions** for live UI updates
- **Row Level Security** for data protection
- **Full-text search** capabilities

## 📋 Database Schema

### Tables
- `articles` - News articles and content storage
- `image_checks` - TinEye verification results
- `text_checks` - GPT + Fact Check API results
- `strategies` - AI-generated action plans
- `feedback` - User ratings and feedback

## 🔧 Setup Instructions

### 1. Environment Configuration

Create a `.env` file with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Keys
VITE_NEWSAPI_KEY=your_newsapi_key
VITE_TINEYE_API_KEY=your_tineye_api_key
VITE_TINEYE_PRIVATE_KEY=your_tineye_private_key
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_GOOGLE_API_KEY=your_google_api_key
```

### 2. Database Setup

1. Create a new Supabase project
2. Run the migration file: `supabase/migrations/create_realitycheck_schema.sql`
3. Verify all tables and policies are created correctly

### 3. API Key Setup

#### TinEye API
1. Sign up at [TinEye API](https://tineye.com/api)
2. Get your API key and private key
3. Add to environment variables

#### OpenAI API
1. Create account at [OpenAI](https://platform.openai.com)
2. Generate API key with GPT-4 access
3. Add to environment variables

#### NewsAPI
1. Register at [NewsAPI](https://newsapi.org)
2. Get your free API key
3. Add to environment variables

#### Google Fact Check API
1. Enable the Fact Check Tools API in Google Cloud Console
2. Create credentials and get API key
3. Add to environment variables

### 4. Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 Usage

### Dashboard Features

1. **Article Fetching**: Click "Fetch Articles" to pull latest news
2. **Sector Filtering**: Filter by politics, technology, health, climate, business
3. **Search**: Full-text search across article titles and content
4. **Real-time Updates**: Automatic updates as verification completes

### Article Cards Display

- **Image Badge**: Shows verification status (Verified/Suspicious/Manipulated)
- **Text Badge**: Shows fact-check results (True/False/Mixed/Unverified)
- **Strategy Summary**: AI-generated action recommendations
- **Priority Levels**: Color-coded priority indicators
- **User Feedback**: Thumbs up/down for community validation

## 🔄 Verification Pipeline

### Automated Process
1. **Article Ingestion**: Fetch from NewsAPI/RSS feeds
2. **Image Analysis**: TinEye reverse search if image present
3. **Text Verification**: GPT-4 + Google Fact Check analysis
4. **Strategy Generation**: AI-powered action plan creation
5. **Database Storage**: Real-time updates to Supabase
6. **UI Updates**: Live dashboard refresh via subscriptions

### Manual Process
- Users can provide feedback on verification accuracy
- Community validation through rating system
- Expert review for high-priority items

## 🚀 Deployment

### Recommended Platforms
- **Vercel** (Frontend + Serverless functions)
- **Netlify** (Frontend + Edge functions)
- **Supabase** (Database + Real-time)

### Environment Variables
Ensure all API keys are properly configured in your deployment platform's environment settings.

## 📈 Performance & Scaling

- **Caching**: Implement Redis for API response caching
- **Rate Limiting**: Respect API rate limits with proper queuing
- **Database Optimization**: Indexes for common query patterns
- **CDN**: Use CDN for static assets and images

## 🔒 Security Considerations

- **API Key Protection**: Never expose API keys in client-side code
- **Rate Limiting**: Implement proper rate limiting for API calls
- **Data Validation**: Sanitize all user inputs
- **CORS Configuration**: Proper cross-origin resource sharing setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation for common setup problems
- Review the API documentation for each integrated service

---

**RealityCheck AI** - Empowering truth in the digital age through advanced AI verification technology.