import { useState } from 'react';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { platforms, formats, genres, moods } from '../utils/titleGenerator';
import { generateUltraRobustTitles } from '../utils/ultraRobustGenerator';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import './Generator.css';

const Generator = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  
  if (!isSignedIn) {
    return (
      <div className="generator-page">
        <div className="container">
          <div className="auth-required">
            <h1>Advanced Generator</h1>
            <p>Sign in to access the advanced title generator with custom filters</p>
            <SignInButton mode="modal">
              <Button size="lg">Sign In to Continue</Button>
            </SignInButton>
          </div>
        </div>
      </div>
    );
  }
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('');
  const [format, setFormat] = useState('');
  const [genre, setGenre] = useState('');
  const [mood, setMood] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const generated = await generateUltraRobustTitles(topic, platform, format, genre, mood);
      // Redirect to Loading page first for maximum ad exposure
      navigate('/loading', { state: { titles: generated } });
    } catch (err) {
      setError('Failed to generate titles. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="generator-page">
      <div className="container">
        <div className="generator-main">
            <h1 className="page-title">Advanced Title Generator</h1>
            <p className="page-subtitle">Fine-tune your titles with specific parameters</p>

            <form onSubmit={handleGenerate} className="generator-form">
              <Input 
                label="Topic / Keyword"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Productivity Tips"
                required
              />

              <Select 
                label="Platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                options={platforms.map(p => p.name)}
                required
              />

              <Select 
                label="Content Format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                options={formats}
                required
              />

              <Select 
                label="Genre / Category"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                options={genres}
                required
              />

              <Select 
                label="Mood / Tone"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                options={moods}
                required
              />

              <Button type="submit" size="lg" disabled={loading}>
                {loading ? 'Generating...' : 'Generate Specific Titles'}
              </Button>
            </form>
            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}


          </div>
      </div>
    </div>
  );
};

export default Generator;
