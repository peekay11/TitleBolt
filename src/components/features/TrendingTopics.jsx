import { useState, useEffect } from 'react';
import { fetchTrendingTopics } from '../../utils/csvUtils';
import { FaChartLine, FaFire } from 'react-icons/fa';
import './TrendingTopics.css';

const TrendingTopics = ({ onTopicClick }) => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrendingTopics();
  }, []);

  const loadTrendingTopics = async () => {
    setLoading(true);
    
    // Combine CSV topics with localStorage topics
    const csvTopics = await fetchTrendingTopics();
    const localTopics = JSON.parse(localStorage.getItem('trendingTopics') || '[]');
    
    // Merge and sort
    const allTopics = [...csvTopics, ...localTopics];
    const uniqueTopics = allTopics.reduce((acc, current) => {
      const existing = acc.find(item => item.topic.toLowerCase() === current.topic.toLowerCase());
      if (existing) {
        existing.count = parseInt(existing.count) + parseInt(current.count);
      } else {
        acc.push(current);
      }
      return acc;
    }, []);
    
    const sortedTopics = uniqueTopics
      .sort((a, b) => parseInt(b.count) - parseInt(a.count))
      .slice(0, 5);
    
    setTopics(sortedTopics);
    setLoading(false);
  };

  const handleTopicClick = (topic) => {
    if (onTopicClick) {
      onTopicClick(topic.topic);
    }
  };

  if (loading) {
    return (
      <section className="trending-topics">
        <div className="container">
          <h2 className="trending-title">
            <FaChartLine /> Trending Topics
          </h2>
          <div className="trending-grid">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="trending-item skeleton loading-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="trending-topics">
      <div className="container">
        <h2 className="trending-title">
          <FaChartLine /> Trending Topics
        </h2>
        <p className="trending-subtitle">
          Popular topics creators are using right now
        </p>
        
        <div className="trending-grid stagger-animation">
          {topics.map((topic, index) => (
            <div 
              key={topic.topic}
              className="trending-item glass-card"
              onClick={() => handleTopicClick(topic)}
            >
              <div className="trending-rank">
                {index === 0 && <FaFire className="fire-icon" />}
                #{index + 1}
              </div>
              <h3 className="trending-topic">{topic.topic}</h3>
              <div className="trending-meta">
                <span className="trending-count">{topic.count} titles</span>
                <span className="trending-category">{topic.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingTopics;