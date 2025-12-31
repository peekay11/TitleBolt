import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { generateUltraRobustTitles } from '../utils/ultraRobustGenerator';
import { checkRateLimit, incrementUsage, getTimeUntilReset } from '../utils/rateLimiter';
import { saveFavorite, removeFavorite, getFavorites } from '../utils/storage';

import CategorySelector from '../components/features/CategorySelector';
import EnhancedTitleCard from '../components/features/EnhancedTitleCard';
import BestPracticesGuide from '../components/features/BestPracticesGuide';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import '../components/features/EnhancedFeatures.css';
import './Home.css';

const EnhancedHome = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  
  const [topic, setTopic] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedTitles, setGeneratedTitles] = useState([]);
  const [favorites, setFavorites] = useState(getFavorites());

  const handleGenerate = async (e) => {
    e.preventDefault();
    
    if (!selectedCategory) {
      setError('Please select a category first');
      return;
    }
    
    setLoading(true);
    setError('');
    
    const rateLimit = checkRateLimit(isSignedIn);
    if (!rateLimit.allowed) {
      setError(`Free limit reached (${rateLimit.remaining}/5). Sign in for unlimited generations or try again in ${getTimeUntilReset(rateLimit.resetTime)} hours.`);
      setLoading(false);
      return;
    }
    
    try {
      const titles = await generateUltraRobustTitles(topic, '', '', selectedCategory, '');
      setGeneratedTitles(titles.map(title => ({
        id: Date.now() + Math.random(),
        text: title,
        category: selectedCategory,
        platform: 'Multi-Platform'
      })));
      
      if (!isSignedIn) incrementUsage();
    } catch (err) {
      setError('Failed to generate titles. Please try again.');
    }
    
    setLoading(false);
  };

  const handleCopy = (title) => {
    // Copy feedback could be added here
  };

  const handleShare = (title) => {
    // Share analytics could be tracked here
  };

  const handleFavorite = (title) => {
    const titleObj = generatedTitles.find(t => t.text === title);
    if (!titleObj) return;
    
    const isFavorited = favorites.some(fav => fav.text === title);
    
    if (isFavorited) {
      removeFavorite(title);
      setFavorites(favorites.filter(fav => fav.text !== title));
    } else {
      saveFavorite(titleObj);
      setFavorites([...favorites, titleObj]);
    }
  };

  const isFavorite = (title) => {
    return favorites.some(fav => fav.text === title);
  };

  return (
    <div className="enhanced-home">
      <div className="container">
        <div className="main-content">
          <div className="generator-section">
            <section className="hero">
              <h1 className="hero-title">
                Professional Title Generator
              </h1>
              <p className="hero-subtitle">
                Create high-converting titles optimized for your niche with real-time SEO scoring
              </p>
            </section>

            <CategorySelector 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            <form onSubmit={handleGenerate} className="enhanced-generator-form">
              <Input 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your topic or keyword..."
                required
              />
              <Button 
                type="submit" 
                size="lg" 
                disabled={loading || !selectedCategory}
              >
                {loading ? 'Generating Optimized Titles...' : 'Generate Smart Titles'}
              </Button>
            </form>

            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}

            {generatedTitles.length > 0 && (
              <div className="results-section">
                <h2 className="results-title">
                  Generated Titles ({generatedTitles.length})
                </h2>
                <div className="titles-list">
                  {generatedTitles.map(titleObj => (
                    <EnhancedTitleCard
                      key={titleObj.id}
                      title={titleObj.text}
                      platform={titleObj.platform}
                      category={titleObj.category}
                      onCopy={handleCopy}
                      onShare={handleShare}
                      onFavorite={handleFavorite}
                      isFavorite={isFavorite(titleObj.text)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="sidebar">
            <BestPracticesGuide />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default EnhancedHome;