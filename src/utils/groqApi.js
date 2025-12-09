const GROQ_API_KEY = import.meta.env?.VITE_GROQ_API_KEY || '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';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const generateTitlesWithAI = async (topic, platform = '', format = '', genre = '', mood = '') => {
  const currentDate = new Date(Date.now());
  const year = currentDate.getFullYear();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  
  const contextPrompt = platform 
    ? `Generate 15 creative, click-worthy ${platform} titles for the topic: "${topic}". 
       Context: Current date is ${month} ${year}. 
       Platform: ${platform}
       Format: ${format}
       Genre: ${genre}
       Mood/Tone: ${mood}
       
       Requirements:
       - ALWAYS use ${year} when including a year in titles (never use outdated years)
       - Make titles relevant to current trends in ${month} ${year}
       - Follow ${platform} best practices
       - Match the ${mood} tone
       - Optimize for ${genre} content
       - Each title should be unique and engaging
       
       Return ONLY the titles, one per line, no numbering or extra text.`
    : `Generate 15 creative, click-worthy titles for the topic: "${topic}".
       Context: Current date is ${month} ${year}.
       
       Requirements:
       - ALWAYS use ${year} when including a year in titles (never use outdated years)
       - Make titles relevant to current trends in ${month} ${year}
       - Cover multiple platforms (YouTube, TikTok, Instagram, Blog, etc.)
       - Vary the style and tone
       - Each title should be unique and engaging
       
       Return ONLY the titles, one per line, no numbering or extra text.`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are an expert content title generator. Generate engaging, SEO-optimized titles that drive clicks and views. Always consider current trends and the current year in your suggestions.'
          },
          {
            role: 'user',
            content: contextPrompt
          }
        ],
        temperature: 0.9,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate titles');
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';
    const titles = content.split('\n').filter(line => line.trim().length > 0);
    
    return titles.slice(0, 15);
  } catch (error) {
    console.error('Error generating titles:', error);
    throw error;
  }
};
