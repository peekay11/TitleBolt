import { useState } from 'react';
import TableOfContents from '../components/features/TableOfContents';
import { generateTitlesWithAI } from '../utils/groqApi';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import TitleCard from '../components/features/TitleCard';
import './PlatformGuide.css';

const YouTubeGuide = () => {
  const [topic, setTopic] = useState('');
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(false);

  const sections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'why-titles-matter', title: 'Why Titles Matter' },
    { id: 'best-practices', title: 'Best Practices' },
    { id: 'common-mistakes', title: 'Common Mistakes' },
    { id: 'generator', title: 'Title Generator' }
  ];

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const generated = await generateTitlesWithAI(topic, 'YouTube', 'Video', 'Tutorial', 'Engaging');
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
            <h1 className="guide-title">YouTube Title Generator: Create Click-Worthy Video Titles</h1>
            
            <section id="intro" className="guide-section">
              <p>
                Creating compelling YouTube titles is essential for video success. Your title is the first thing viewers see and plays a crucial role in whether they click on your video. This comprehensive guide will teach you how to craft titles that drive views, engagement, and channel growth.
              </p>
            </section>

            <section id="why-titles-matter" className="guide-section">
              <h2>Why YouTube Titles Matter for Your Channel Growth</h2>
              <p>
                YouTube titles directly impact your video's performance in multiple ways. First, they influence click-through rates (CTR), which is a key metric YouTube uses to recommend videos. A higher CTR signals to YouTube's algorithm that your content is valuable, leading to more impressions and views.
              </p>
              <p>
                Second, titles affect your video's searchability. YouTube is the second-largest search engine globally, and optimizing your titles with relevant keywords helps your content appear in search results. Strategic keyword placement in titles can dramatically increase organic discovery.
              </p>
              <p>
                Third, compelling titles set viewer expectations. When your title accurately represents your content while creating curiosity, viewers are more likely to watch longer, improving your retention rate—another critical ranking factor.
              </p>
            </section>

            <section id="best-practices" className="guide-section">
              <h2>YouTube Title Best Practices for Maximum Views</h2>
              <h3>1. Front-Load Your Keywords</h3>
              <p>
                Place your primary keyword at the beginning of your title. YouTube's algorithm and viewers both prioritize the first words they see. For example, "SEO Tips: 10 Strategies to Rank #1" is better than "10 Strategies to Rank #1 with SEO Tips."
              </p>
              
              <h3>2. Keep It Under 60 Characters</h3>
              <p>
                YouTube truncates titles after approximately 60 characters in search results. Ensure your core message fits within this limit to avoid cut-off text that reduces clarity and CTR.
              </p>
              
              <h3>3. Use Power Words</h3>
              <p>
                Incorporate emotional triggers like "Ultimate," "Proven," "Secret," "Essential," or "Complete" to increase appeal. These words create urgency and value perception without being clickbait.
              </p>
              
              <h3>4. Include Numbers</h3>
              <p>
                Titles with numbers (e.g., "7 Ways," "Top 5," "3 Steps") perform exceptionally well because they promise specific, digestible content. List-based titles consistently generate higher CTRs.
              </p>
            </section>

            <section id="common-mistakes" className="guide-section">
              <h2>Common YouTube Title Mistakes to Avoid</h2>
              <p>
                <strong>Clickbait Without Delivery:</strong> While curiosity-driven titles work, misleading viewers damages your retention rate and channel reputation. Always deliver on your title's promise.
              </p>
              <p>
                <strong>Keyword Stuffing:</strong> Overloading titles with keywords makes them unreadable and can trigger spam filters. Focus on natural language that incorporates 1-2 primary keywords.
              </p>
              <p>
                <strong>Being Too Vague:</strong> Generic titles like "Amazing Video" or "You Need to See This" don't communicate value. Be specific about what viewers will learn or experience.
              </p>
              <p>
                <strong>Ignoring Your Audience:</strong> Titles should speak directly to your target audience's interests and pain points. Research what language and topics resonate with your niche.
              </p>
            </section>

            <section id="generator" className="guide-section">
              <h2>Generate YouTube Titles Instantly</h2>
              <p>Use our AI-powered generator to create optimized YouTube titles based on your topic:</p>
              
              <form onSubmit={handleGenerate} className="inline-generator">
                <Input 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter your video topic..."
                  required
                />
                <Button type="submit" size="lg" disabled={loading}>{loading ? 'Generating...' : 'Generate YouTube Titles'}</Button>
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

export default YouTubeGuide;
