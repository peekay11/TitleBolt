// Multi-API title generator for maximum accuracy and variety

// Free APIs we can integrate:
const APIs = {
  // 1. Groq (current) - Fast, good quality
  GROQ: 'groq',
  
  // 2. Hugging Face Inference API - Free tier, many models
  HUGGING_FACE: 'huggingface',
  
  // 3. Cohere Generate API - Free tier 5M tokens/month
  COHERE: 'cohere',
  
  // 4. Together AI - Free tier
  TOGETHER: 'together',
  
  // 5. Replicate - Free tier
  REPLICATE: 'replicate'
};

// YouTube Data API for trending analysis
const getYouTubeTrends = async (topic) => {
  try {
    // Free YouTube Data API - analyze trending titles
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(topic)}&order=viewCount&maxResults=10&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`);
    const data = await response.json();
    return data.items?.map(item => item.snippet.title) || [];
  } catch (error) {
    console.log('YouTube API error:', error);
    return [];
  }
};

// Reddit API for trending discussions
const getRedditTrends = async (topic) => {
  try {
    // Free Reddit API - no key needed
    const response = await fetch(`https://www.reddit.com/search.json?q=${encodeURIComponent(topic)}&sort=hot&limit=10`);
    const data = await response.json();
    return data.data?.children?.map(post => post.data.title) || [];
  } catch (error) {
    console.log('Reddit API error:', error);
    return [];
  }
};

// Google Trends (unofficial API)
const getGoogleTrends = async (topic) => {
  try {
    // Free trends data
    const response = await fetch(`https://trends.google.com/trends/api/dailytrends?hl=en&tz=-480&geo=US`);
    // Parse trending topics related to our keyword
    return [];
  } catch (error) {
    console.log('Trends API error:', error);
    return [];
  }
};

// Hugging Face API
const generateWithHuggingFace = async (prompt) => {
  try {
    const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-large', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 100,
          temperature: 0.8,
          return_full_text: false
        }
      })
    });
    
    const data = await response.json();
    return data[0]?.generated_text || '';
  } catch (error) {
    console.log('Hugging Face API error:', error);
    return '';
  }
};

// Cohere API
const generateWithCohere = async (prompt) => {
  try {
    const response = await fetch('https://api.cohere.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_COHERE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'command-light',
        prompt: prompt,
        max_tokens: 100,
        temperature: 0.8,
        stop_sequences: ['\n']
      })
    });
    
    const data = await response.json();
    return data.generations?.[0]?.text || '';
  } catch (error) {
    console.log('Cohere API error:', error);
    return '';
  }
};

// Enhanced title generation with multiple APIs
export const generateRobustTitles = async (topic, platform = '', format = '', genre = '', mood = '') => {
  const allTitles = [];
  
  try {
    // 1. Get trending data for context
    const [youtubeTrends, redditTrends] = await Promise.all([
      getYouTubeTrends(topic),
      getRedditTrends(topic)
    ]);
    
    const trendingContext = [...youtubeTrends.slice(0, 3), ...redditTrends.slice(0, 3)];
    
    // 2. Generate from multiple AI sources
    const prompt = `Generate 5 engaging ${platform} titles about "${topic}". 
    Format: ${format}, Genre: ${genre}, Mood: ${mood}
    
    Trending context: ${trendingContext.join(', ')}
    
    Requirements:
    - Click-worthy and engaging
    - SEO optimized
    - Platform appropriate
    - Current year ${new Date().getFullYear()}
    
    Titles:`;

    // Try multiple APIs in parallel
    const apiPromises = [
      // Keep existing Groq
      import('../utils/groqApi.js').then(module => 
        module.generateTitlesWithAI(topic, platform, format, genre, mood)
      ).catch(() => []),
      
      // Add Hugging Face
      generateWithHuggingFace(prompt).then(text => 
        text.split('\n').filter(t => t.trim()).slice(0, 3)
      ).catch(() => []),
      
      // Add Cohere
      generateWithCohere(prompt).then(text => 
        text.split('\n').filter(t => t.trim()).slice(0, 3)
      ).catch(() => [])
    ];
    
    const results = await Promise.allSettled(apiPromises);
    
    // Combine all results
    results.forEach(result => {
      if (result.status === 'fulfilled' && Array.isArray(result.value)) {
        allTitles.push(...result.value);
      }
    });
    
    // 3. Add template-based titles as fallback
    const templateTitles = generateTemplateTitles(topic, platform);
    allTitles.push(...templateTitles);
    
    // 4. Remove duplicates and clean up
    const uniqueTitles = [...new Set(allTitles)]
      .filter(title => title && title.length > 10 && title.length < 100)
      .slice(0, 10);
    
    return uniqueTitles.length > 0 ? uniqueTitles : getDefaultTitles(topic);
    
  } catch (error) {
    console.error('Multi-API generation error:', error);
    return getDefaultTitles(topic);
  }
};

// Template-based generation as fallback
const generateTemplateTitles = (topic, platform) => {
  const templates = [
    `How to ${topic} in ${new Date().getFullYear()}`,
    `${topic}: The Complete Guide`,
    `10 ${topic} Tips That Actually Work`,
    `The Truth About ${topic}`,
    `${topic} Mistakes Everyone Makes`,
    `Why ${topic} is Trending Right Now`,
    `${topic}: Before vs After`,
    `The Ultimate ${topic} Strategy`
  ];
  
  return templates.slice(0, 4);
};

// Default titles if all APIs fail
const getDefaultTitles = (topic) => [
  `Everything You Need to Know About ${topic}`,
  `${topic}: A Beginner's Guide`,
  `The Best ${topic} Tips for ${new Date().getFullYear()}`,
  `Why ${topic} Matters More Than Ever`,
  `${topic}: What Experts Don't Tell You`
];

// Analyze title performance using multiple data sources
export const analyzeTitlePerformance = async (title) => {
  try {
    // Check against trending data
    const trends = await getYouTubeTrends(title.split(' ')[0]);
    
    // Simple scoring algorithm
    const score = {
      length: title.length >= 30 && title.length <= 60 ? 10 : 5,
      numbers: /\d/.test(title) ? 8 : 4,
      powerWords: /(ultimate|secret|proven|amazing|incredible)/i.test(title) ? 9 : 5,
      year: new RegExp(new Date().getFullYear()).test(title) ? 7 : 3,
      trending: trends.some(t => t.toLowerCase().includes(title.toLowerCase().split(' ')[0])) ? 10 : 5
    };
    
    const totalScore = Object.values(score).reduce((a, b) => a + b, 0) / 5;
    
    return {
      score: Math.min(totalScore, 10),
      breakdown: score,
      suggestions: generateSuggestions(title, score)
    };
  } catch (error) {
    return { score: 7, breakdown: {}, suggestions: [] };
  }
};

const generateSuggestions = (title, score) => {
  const suggestions = [];
  
  if (score.length < 8) suggestions.push('Consider making title 30-60 characters');
  if (score.numbers < 6) suggestions.push('Add numbers for better performance');
  if (score.powerWords < 7) suggestions.push('Include power words like "Ultimate" or "Secret"');
  if (score.year < 5) suggestions.push(`Add ${new Date().getFullYear()} for relevancy`);
  
  return suggestions;
};