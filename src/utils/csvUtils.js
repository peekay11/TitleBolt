// CSV utility functions for trending topics
export const parseCsv = (csvText) => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index];
    });
    return obj;
  });
};

export const csvToString = (data) => {
  if (!data.length) return '';
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => row[header]).join(','))
  ].join('\n');
  
  return csvContent;
};

export const fetchTrendingTopics = async () => {
  try {
    const response = await fetch('/trending-topics.csv');
    const csvText = await response.text();
    const topics = parseCsv(csvText);
    
    return topics
      .sort((a, b) => parseInt(b.count) - parseInt(a.count))
      .slice(0, 5);
  } catch (error) {
    console.error('Error fetching trending topics:', error);
    return [];
  }
};

export const updateTrendingTopic = (topic) => {
  // Get existing topics from localStorage
  const existingTopics = JSON.parse(localStorage.getItem('trendingTopics') || '[]');
  
  // Find if topic exists
  const existingIndex = existingTopics.findIndex(t => 
    t.topic.toLowerCase() === topic.toLowerCase()
  );
  
  if (existingIndex >= 0) {
    // Update count
    existingTopics[existingIndex].count = parseInt(existingTopics[existingIndex].count) + 1;
    existingTopics[existingIndex].lastUsed = new Date().toISOString().split('T')[0];
  } else {
    // Add new topic
    existingTopics.push({
      topic: topic,
      count: 1,
      category: 'User Generated',
      lastUsed: new Date().toISOString().split('T')[0]
    });
  }
  
  // Keep only top 5
  const sortedTopics = existingTopics
    .sort((a, b) => parseInt(b.count) - parseInt(a.count))
    .slice(0, 5);
  
  localStorage.setItem('trendingTopics', JSON.stringify(sortedTopics));
  return sortedTopics;
};