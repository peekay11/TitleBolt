import { FaLightbulb, FaChartLine, FaEye, FaClock, FaHashtag, FaHeart } from 'react-icons/fa';

const BestPracticesGuide = () => {
  const sections = [
    {
      title: "📊 Title Performance Factors",
      practices: [
        {
          icon: <FaHashtag />,
          title: 'Use Numbers',
          description: 'Titles with numbers get 36% more clicks. "10 Tips" outperforms "Tips".',
          example: '"5 Ways to..." vs "Ways to..."'
        },
        {
          icon: <FaClock />,
          title: 'Optimal Length',
          description: 'Keep titles 30-60 characters for best SEO and social media performance.',
          example: 'Google shows ~60 chars in search results'
        }
      ]
    },
    {
      title: "🔥 Engagement Boosters",
      practices: [
        {
          icon: <FaLightbulb />,
          title: 'Power Words',
          description: 'Words like "Secret", "Proven", "Ultimate" increase engagement by 40%.',
          example: '"Ultimate Guide" vs "Guide"'
        },
        {
          icon: <FaEye />,
          title: 'Emotional Triggers',
          description: 'Titles that evoke curiosity, fear, or excitement get more clicks.',
          example: '"Shocking Truth" vs "Information"'
        }
      ]
    },
    {
      title: "⚡ SEO Optimization",
      practices: [
        {
          icon: <FaChartLine />,
          title: 'Current Year',
          description: 'Adding the current year increases perceived relevancy by 25%.',
          example: `"Best Tools ${new Date().getFullYear()}" vs "Best Tools"`
        },
        {
          icon: <FaHeart />,
          title: 'Benefit-Focused',
          description: 'Focus on what the reader will gain, not just the topic.',
          example: '"Save 2 Hours Daily" vs "Time Management"'
        }
      ]
    }
  ];
  
  const powerWords = [
    'Ultimate', 'Secret', 'Proven', 'Amazing', 'Incredible', 'Shocking',
    'Exclusive', 'Guaranteed', 'Essential', 'Complete', 'Perfect', 'Best'
  ];
  
  return (
    <div className="best-practices-guide">
      <div className="guide-header">
        <h3>📚 Headline Best Practices</h3>
        <p>Learn why certain titles perform better</p>
      </div>
      
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="practices-section">
          <h4 className="section-title">{section.title}</h4>
          <div className="practices-list">
            {section.practices.map((practice, index) => (
              <div key={index} className="practice-item">
                <div className="practice-icon">
                  {practice.icon}
                </div>
                <div className="practice-content">
                  <h5 className="practice-title">{practice.title}</h5>
                  <p className="practice-description">{practice.description}</p>
                  <div className="practice-example">
                    <strong>Example:</strong> {practice.example}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="power-words-section">
        <h4>🔥 High-Impact Power Words</h4>
        <div className="power-words-grid">
          {powerWords.map(word => (
            <span key={word} className="power-word">
              {word}
            </span>
          ))}
        </div>
      </div>
      
      <div className="performance-stats">
        <h4>📊 Performance Stats</h4>
        <div className="stat-item">
          <span className="stat-number">36%</span>
          <span className="stat-label">More clicks with numbers</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">40%</span>
          <span className="stat-label">Higher engagement with power words</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">25%</span>
          <span className="stat-label">Better relevancy with current year</span>
        </div>
      </div>
    </div>
  );
};

export default BestPracticesGuide;