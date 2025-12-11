// Free API keys you can get:

export const FREE_APIS = {
  // 1. YouTube Data API - 10,000 requests/day FREE
  // Get at: https://console.developers.google.com/
  YOUTUBE: {
    key: import.meta.env.VITE_YOUTUBE_API_KEY,
    limit: '10,000/day',
    signup: 'https://console.developers.google.com/'
  },

  // 2. Hugging Face - FREE inference API
  // Get at: https://huggingface.co/settings/tokens
  HUGGING_FACE: {
    key: import.meta.env.VITE_HUGGINGFACE_API_KEY,
    limit: 'Unlimited (rate limited)',
    signup: 'https://huggingface.co/join'
  },

  // 3. Cohere - 5M tokens/month FREE
  // Get at: https://dashboard.cohere.ai/
  COHERE: {
    key: import.meta.env.VITE_COHERE_API_KEY,
    limit: '5M tokens/month',
    signup: 'https://dashboard.cohere.ai/'
  },

  // 4. Together AI - $25 FREE credits
  // Get at: https://api.together.xyz/
  TOGETHER: {
    key: import.meta.env.VITE_TOGETHER_API_KEY,
    limit: '$25 free credits',
    signup: 'https://api.together.xyz/'
  },

  // 5. Replicate - FREE tier available
  // Get at: https://replicate.com/
  REPLICATE: {
    key: import.meta.env.VITE_REPLICATE_API_KEY,
    limit: 'Free tier available',
    signup: 'https://replicate.com/'
  },

  // 6. Reddit API - NO KEY NEEDED (public endpoints)
  REDDIT: {
    key: 'none',
    limit: '60 requests/minute',
    signup: 'No signup needed'
  },

  // 7. NewsAPI - 1000 requests/day FREE
  // Get at: https://newsapi.org/
  NEWS_API: {
    key: import.meta.env.VITE_NEWS_API_KEY,
    limit: '1000/day',
    signup: 'https://newsapi.org/register'
  }
};

// Instructions for users to get API keys
export const API_SETUP_INSTRUCTIONS = `
🔑 GET FREE API KEYS TO BOOST ACCURACY:

1. YouTube Data API (10K requests/day FREE):
   - Go to: https://console.developers.google.com/
   - Create project → Enable YouTube Data API v3
   - Create credentials → API Key
   - Add to Vercel: VITE_YOUTUBE_API_KEY

2. Hugging Face (Unlimited FREE):
   - Go to: https://huggingface.co/join
   - Settings → Access Tokens → New Token
   - Add to Vercel: VITE_HUGGINGFACE_API_KEY

3. Cohere (5M tokens/month FREE):
   - Go to: https://dashboard.cohere.ai/
   - Sign up → API Keys → Create Key
   - Add to Vercel: VITE_COHERE_API_KEY

4. Together AI ($25 FREE credits):
   - Go to: https://api.together.xyz/
   - Sign up → API Keys
   - Add to Vercel: VITE_TOGETHER_API_KEY

5. NewsAPI (1000/day FREE):
   - Go to: https://newsapi.org/register
   - Get API key
   - Add to Vercel: VITE_NEWS_API_KEY

🚀 RESULT: 5x more accurate titles with trending data!
`;

export default FREE_APIS;