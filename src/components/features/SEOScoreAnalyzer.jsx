import { FaStar, FaChartLine, FaBolt } from 'react-icons/fa';

const SEOScoreAnalyzer = ({ title }) => {
  const analyzeSEO = (title) => {
    let score = 0;
    const analysis = {};
    
    // Length optimization (30-60 chars ideal)
    const length = title.length;
    if (length >= 30 && length <= 60) {
      score += 25;
      analysis.length = { score: 25, status: 'Perfect', color: 'var(--success)' };
    } else if (length >= 20 && length <= 80) {
      score += 15;
      analysis.length = { score: 15, status: 'Good', color: 'var(--warning)' };
    } else {
      score += 5;
      analysis.length = { score: 5, status: 'Poor', color: 'var(--error)' };
    }
    
    // Power words detection
    const powerWords = ['secret', 'proven', 'best', 'ultimate', 'amazing', 'incredible', 'shocking', 'viral', 'exclusive', 'guaranteed'];
    const foundPowerWords = powerWords.filter(word => 
      title.toLowerCase().includes(word)
    );
    
    if (foundPowerWords.length >= 2) {
      score += 25;
      analysis.powerWords = { score: 25, status: 'Excellent', color: 'var(--success)', count: foundPowerWords.length };
    } else if (foundPowerWords.length === 1) {
      score += 15;
      analysis.powerWords = { score: 15, status: 'Good', color: 'var(--warning)', count: foundPowerWords.length };
    } else {
      score += 0;
      analysis.powerWords = { score: 0, status: 'Missing', color: 'var(--error)', count: 0 };
    }
    
    // Numbers boost engagement
    const hasNumbers = /\d/.test(title);
    if (hasNumbers) {
      score += 20;
      analysis.numbers = { score: 20, status: 'Present', color: 'var(--success)' };
    } else {
      score += 0;
      analysis.numbers = { score: 0, status: 'Missing', color: 'var(--error)' };
    }
    
    // Emotional triggers
    const emotionalWords = ['love', 'hate', 'fear', 'surprise', 'mind', 'heart', 'soul', 'life', 'death', 'money'];
    const hasEmotional = emotionalWords.some(word => 
      title.toLowerCase().includes(word)
    );
    
    if (hasEmotional) {
      score += 15;
      analysis.emotional = { score: 15, status: 'Strong', color: 'var(--success)' };
    } else {
      score += 5;
      analysis.emotional = { score: 5, status: 'Weak', color: 'var(--warning)' };
    }
    
    // Current year relevancy
    const currentYear = new Date().getFullYear();
    const hasCurrentYear = title.includes(currentYear.toString());
    if (hasCurrentYear) {
      score += 15;
      analysis.relevancy = { score: 15, status: 'Current', color: 'var(--success)' };
    } else {
      score += 5;
      analysis.relevancy = { score: 5, status: 'Timeless', color: 'var(--warning)' };
    }
    
    return { score: Math.min(score, 100), analysis };
  };
  
  const { score, analysis } = analyzeSEO(title);
  
  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--success)';
    if (score >= 60) return 'var(--warning)';
    return 'var(--error)';
  };
  
  const getScoreIcon = (score) => {
    if (score >= 80) return <FaBolt />;
    if (score >= 60) return <FaChartLine />;
    return <FaStar />;
  };
  
  return (
    <div className="seo-analyzer">
      <div className="seo-score">
        <div className="score-circle" style={{ borderColor: getScoreColor(score) }}>
          <div className="score-icon" style={{ color: getScoreColor(score) }}>
            {getScoreIcon(score)}
          </div>
          <div className="score-number" style={{ color: getScoreColor(score) }}>
            {score}
          </div>
        </div>
        <div className="score-label">Power Score</div>
      </div>
      
      <div className="analysis-breakdown">
        <div className="analysis-item">
          <span className="analysis-label">Length:</span>
          <span className="analysis-value" style={{ color: analysis.length.color }}>
            {analysis.length.status}
          </span>
        </div>
        <div className="analysis-item">
          <span className="analysis-label">Power Words:</span>
          <span className="analysis-value" style={{ color: analysis.powerWords.color }}>
            {analysis.powerWords.count} found
          </span>
        </div>
        <div className="analysis-item">
          <span className="analysis-label">Numbers:</span>
          <span className="analysis-value" style={{ color: analysis.numbers.color }}>
            {analysis.numbers.status}
          </span>
        </div>
        <div className="analysis-item">
          <span className="analysis-label">Emotion:</span>
          <span className="analysis-value" style={{ color: analysis.emotional.color }}>
            {analysis.emotional.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SEOScoreAnalyzer;