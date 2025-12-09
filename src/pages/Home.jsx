import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { platforms } from '../utils/titleGenerator';
import { generateTitlesWithAI } from '../utils/groqApi';
import { checkRateLimit, incrementUsage, getTimeUntilReset } from '../utils/rateLimiter';
import PlatformIcon from '../components/ui/PlatformIcon';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import TitleCard from '../components/features/TitleCard';
import './Home.css';

const Home = () => {
  const { isSignedIn } = useUser();
  const [topic, setTopic] = useState('');
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const rateLimit = checkRateLimit(isSignedIn);
    if (!rateLimit.allowed) {
      setError(`Free limit reached (${rateLimit.remaining}/5). Sign in for unlimited generations or try again in ${getTimeUntilReset(rateLimit.resetTime)} hours.`);
      setLoading(false);
      return;
    }
    
    try {
      const generated = await generateTitlesWithAI(topic);
      setTitles(generated);
      if (!isSignedIn) incrementUsage();
    } catch (err) {
      setError('Failed to generate titles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <div className="container">
        <section className="hero">
          <h1 className="hero-title">
            Generate Click-Worthy Titles in <span className="gradient-text">Seconds</span>
          </h1>
          <p className="hero-subtitle">
            AI-powered title generation for YouTube, TikTok, Instagram, Books, Blogs & More
          </p>
          
          <div className="platforms-showcase">
            {platforms.map(platform => (
              <PlatformIcon key={platform.id} platform={platform} />
            ))}
          </div>

          <form onSubmit={handleGenerate} className="quick-generator">
            <Input 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your topic or keyword..."
              required
            />
            <Button type="submit" size="lg" disabled={loading}>
              {loading ? 'Generating...' : 'Generate Titles'}
            </Button>
          </form>
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
        </section>

        {titles.length > 0 && (
          <section className="results">
            <h2>Your Generated Titles ({titles.length})</h2>
            <div className="titles-grid">
              {titles.map((title, idx) => (
                <TitleCard key={idx} title={title} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Home;
