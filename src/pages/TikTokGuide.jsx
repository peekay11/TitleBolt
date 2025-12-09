import { useState } from 'react';
import TableOfContents from '../components/features/TableOfContents';
import { generateTitlesWithAI } from '../utils/groqApi';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import TitleCard from '../components/features/TitleCard';
import './PlatformGuide.css';

const TikTokGuide = () => {
  const [topic, setTopic] = useState('');
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(false);

  const sections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'tiktok-algorithm', title: 'TikTok Algorithm' },
    { id: 'hook-strategies', title: 'Hook Strategies' },
    { id: 'trending-formats', title: 'Trending Formats' },
    { id: 'generator', title: 'Hook Generator' }
  ];

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const generated = await generateTitlesWithAI(topic, 'TikTok', 'Short', 'Viral', 'Urgent');
      setTitles(generated);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="platform-guide">
      <div className="container">
        <div className="guide-layout">
          <aside className="guide-sidebar">
            <TableOfContents sections={sections} />
          </aside>

          <main className="guide-content">
            <h1 className="guide-title">TikTok Hook Generator: Viral Captions & Video Hooks</h1>
            
            <section id="intro" className="guide-section">
              <p>
                TikTok hooks are the critical first 1-3 seconds that determine whether viewers scroll past or stop to watch your content. With millions of videos competing for attention, mastering the art of the hook is essential for viral success. This guide reveals proven strategies for creating irresistible TikTok hooks and captions.
              </p>
            </section>

            <section id="tiktok-algorithm" className="guide-section">
              <h2>Understanding the TikTok Algorithm and Watch Time</h2>
              <p>
                TikTok's algorithm prioritizes content that keeps users on the platform. The key metric is watch time—specifically, the percentage of your video that viewers watch. A strong hook that captures attention immediately dramatically increases your completion rate, signaling to TikTok that your content is engaging.
              </p>
              <p>
                The algorithm evaluates your video's performance within the first few hours. Videos with high early engagement (likes, comments, shares, and completion rate) get pushed to larger audiences through the For You Page (FYP). Your hook directly influences these critical early metrics.
              </p>
              <p>
                Unlike YouTube, TikTok doesn't rely heavily on subscriber counts. Even accounts with zero followers can go viral if their hooks and content resonate with viewers. This makes hook optimization the single most important factor for TikTok growth.
              </p>
            </section>

            <section id="hook-strategies" className="guide-section">
              <h2>Proven TikTok Hook Strategies That Stop the Scroll</h2>
              <h3>1. Pattern Interrupts</h3>
              <p>
                Start with something unexpected or visually striking. Examples: "Wait, don't scroll yet," "POV: You just discovered," or showing a surprising visual immediately. Pattern interrupts work because they break the viewer's scrolling rhythm.
              </p>
              
              <h3>2. Curiosity Gaps</h3>
              <p>
                Create immediate curiosity by teasing valuable information. "The secret nobody tells you about..." or "This changed everything..." These hooks promise a payoff that viewers must watch to receive.
              </p>
              
              <h3>3. Relatable Scenarios</h3>
              <p>
                Use "POV:" or "When you..." formats to create instant relatability. "POV: You're trying to..." or "When you finally..." These hooks work because viewers see themselves in the scenario.
              </p>
              
              <h3>4. Urgency and FOMO</h3>
              <p>
                Create urgency with time-sensitive language. "Before you do X, watch this," "Stop doing X immediately," or "You need to know this now." Urgency triggers fear of missing out.
              </p>
            </section>

            <section id="trending-formats" className="guide-section">
              <h2>Trending TikTok Caption Formats for 2024</h2>
              <p>
                <strong>Emoji-Heavy Hooks:</strong> TikTok's younger demographic responds well to emojis. "😱 This hack changed my life" or "🚨 ALERT: You're doing this wrong" grab attention in crowded feeds.
              </p>
              <p>
                <strong>Question Hooks:</strong> Starting with a question engages viewers' curiosity. "Ever wonder why...?" or "What if I told you...?" Questions create mental gaps that viewers want filled.
              </p>
              <p>
                <strong>Numbered Lists:</strong> "3 things you didn't know about..." or "5 mistakes everyone makes..." List formats promise quick, digestible value and perform consistently well.
              </p>
              <p>
                <strong>Controversial Takes:</strong> "Unpopular opinion:" or "Hot take:" These hooks work because controversy drives engagement through comments and shares, boosting algorithmic performance.
              </p>
            </section>

            <section id="generator" className="guide-section">
              <h2>Generate TikTok Hooks Instantly</h2>
              <p>Create viral-worthy TikTok hooks and captions with our AI generator:</p>
              
              <form onSubmit={handleGenerate} className="inline-generator">
                <Input 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter your TikTok topic..."
                  required
                />
                <Button type="submit" size="lg" disabled={loading}>{loading ? 'Generating...' : 'Generate TikTok Hooks'}</Button>
              </form>

              {titles.length > 0 && (
                <div className="results">
                  {titles.map((title, idx) => (
                    <TitleCard key={idx} title={title} />
                  ))}
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TikTokGuide;
