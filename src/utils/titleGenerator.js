const templates = {
  youtube: {
    tutorial: ['How to {topic} in 2024 (Step-by-Step)', '{topic}: Complete Beginner\'s Guide', 'Master {topic} in 10 Minutes', 'The ONLY {topic} Tutorial You Need'],
    review: ['Is {topic} Worth It? Honest Review', '{topic} Review: The Truth Nobody Tells You', 'I Tried {topic} for 30 Days - Here\'s What Happened'],
    listicle: ['Top 10 {topic} Tips That Actually Work', '7 {topic} Mistakes You\'re Making Right Now', '5 {topic} Secrets Pros Don\'t Want You to Know']
  },
  tiktok: {
    urgent: ['{topic} hack you NEED to try 😱', 'POV: You just discovered {topic}', 'Wait until you see this {topic} trick'],
    emotional: ['This {topic} changed my life 💔', 'Why {topic} makes me cry every time', 'The {topic} story that broke the internet']
  },
  instagram: {
    carousel: ['{topic} explained in 10 slides', 'Swipe for {topic} secrets →', 'Everything about {topic} you need to know'],
    simple: ['Your daily dose of {topic} ✨', '{topic} but make it aesthetic', 'Just {topic} things 💫']
  },
  book: {
    authoritative: ['The {topic} Manifesto', '{topic}: A Revolutionary Approach', 'Beyond {topic}: The Future of Innovation'],
    curious: ['What If {topic} Changed Everything?', 'The Hidden World of {topic}', 'Unraveling the Mystery of {topic}']
  },
  blog: {
    educational: ['Understanding {topic}: A Comprehensive Guide', 'The Science Behind {topic}', '{topic} Explained: What You Need to Know'],
    news: ['Breaking: New {topic} Developments in 2024', 'The Latest {topic} Trends You Can\'t Ignore']
  },
  twitter: {
    thread: ['🧵 Everything I learned about {topic} (thread)', 'Hot take on {topic} 👇', 'Let\'s talk about {topic}. A thread:']
  }
};

export const generateQuickTitles = (topic) => {
  if (!topic.trim()) return [];
  
  const titles = [];
  const allTemplates = Object.values(templates).flatMap(platform => 
    Object.values(platform).flat()
  );
  
  allTemplates.slice(0, 15).forEach(template => {
    titles.push(template.replace('{topic}', topic));
  });
  
  return titles;
};

export const generateSpecificTitles = (topic, platform, format, genre, mood) => {
  if (!topic.trim()) return [];
  
  const titles = [];
  const platformTemplates = templates[platform.toLowerCase()] || {};
  const genreTemplates = platformTemplates[genre.toLowerCase()] || [];
  
  genreTemplates.forEach(template => {
    titles.push(template.replace('{topic}', topic));
  });
  
  // Add mood variations
  const moodPrefixes = {
    urgent: ['URGENT:', 'BREAKING:', 'ALERT:'],
    emotional: ['💔', '😭', '❤️'],
    authoritative: ['Expert Guide:', 'Professional:', 'Definitive:'],
    curious: ['What if...', 'Ever wondered...', 'Did you know...'],
    clickbait: ['You Won\'t Believe', 'Shocking:', 'This Changed Everything:']
  };
  
  const prefix = moodPrefixes[mood.toLowerCase()]?.[0] || '';
  if (prefix && titles.length > 0) {
    titles.push(`${prefix} ${titles[0]}`);
  }
  
  // Ensure minimum 10 titles
  while (titles.length < 10) {
    titles.push(`${topic}: ${format} for ${platform} (${genre} style)`);
  }
  
  return titles.slice(0, 15);
};

export const platforms = [
  { id: 'youtube', name: 'YouTube' },
  { id: 'tiktok', name: 'TikTok' },
  { id: 'instagram', name: 'Instagram' },
  { id: 'book', name: 'Book' },
  { id: 'blog', name: 'Blog' },
  { id: 'twitter', name: 'X/Twitter' }
];

export const formats = ['Video', 'Short', 'Carousel', 'Article', 'Chapter', 'Thread', 'Post'];
export const genres = ['Tutorial', 'Review', 'Listicle', 'News', 'Comedy', 'Educational', 'Story'];
export const moods = ['Urgent', 'Emotional', 'Authoritative', 'Curious', 'Simple', 'Clickbait'];
