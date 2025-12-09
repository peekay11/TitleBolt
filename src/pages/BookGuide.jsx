import { useState } from 'react';
import TableOfContents from '../components/features/TableOfContents';
import { generateTitlesWithAI } from '../utils/groqApi';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import TitleCard from '../components/features/TitleCard';
import './PlatformGuide.css';

const BookGuide = () => {
  const [topic, setTopic] = useState('');
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(false);

  const sections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'chapter-titles', title: 'Chapter Title Importance' },
    { id: 'naming-strategies', title: 'Naming Strategies' },
    { id: 'genre-specific', title: 'Genre-Specific Tips' },
    { id: 'generator', title: 'Title Generator' }
  ];

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const generated = await generateTitlesWithAI(topic, 'Book', 'Chapter', 'Educational', 'Authoritative');
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
            <h1 className="guide-title">Book Chapter Title Ideas: Craft Compelling Chapter Names</h1>
            
            <section id="intro" className="guide-section">
              <p>
                Book chapter titles serve as signposts that guide readers through your narrative or content. Whether you're writing fiction, non-fiction, or educational material, well-crafted chapter titles enhance reader engagement, improve navigation, and create anticipation for what's ahead. This comprehensive guide explores strategies for creating memorable chapter titles that elevate your book.
              </p>
            </section>

            <section id="chapter-titles" className="guide-section">
              <h2>Why Chapter Titles Matter in Modern Publishing</h2>
              <p>
                Chapter titles significantly impact the reading experience. In fiction, they can foreshadow events, establish mood, or create intrigue without spoiling the plot. In non-fiction, they serve as a roadmap, helping readers navigate to specific information and understand the book's structure at a glance.
              </p>
              <p>
                From a marketing perspective, compelling chapter titles in your table of contents can influence purchase decisions. Potential readers often preview the table of contents before buying, and intriguing chapter titles demonstrate the value and organization of your content.
              </p>
              <p>
                Chapter titles also improve the digital reading experience. E-readers and audiobook apps use chapter titles for navigation, making descriptive titles essential for user experience. Well-named chapters help readers return to specific sections and share favorite parts with others.
              </p>
            </section>

            <section id="naming-strategies" className="guide-section">
              <h2>Effective Chapter Naming Strategies for Authors</h2>
              <h3>1. Descriptive Titles</h3>
              <p>
                Clearly communicate the chapter's content. Examples: "The Science of Habit Formation" or "Understanding Market Volatility." This approach works exceptionally well for non-fiction, educational content, and business books where clarity is paramount.
              </p>
              
              <h3>2. Thematic Titles</h3>
              <p>
                Use metaphors or themes that connect to your book's central message. "The Storm Before Calm" or "Seeds of Change" create emotional resonance while hinting at content. This strategy works across genres.
              </p>
              
              <h3>3. Question-Based Titles</h3>
              <p>
                Pose questions that the chapter answers. "What Makes Leaders Effective?" or "Can We Reverse Climate Change?" Questions create curiosity and promise answers, encouraging readers to continue.
              </p>
              
              <h3>4. Action-Oriented Titles</h3>
              <p>
                Use verbs to create momentum. "Building Your Foundation," "Overcoming Resistance," or "Launching Your Vision." Action titles work particularly well for self-help, business, and instructional books.
              </p>
            </section>

            <section id="genre-specific" className="guide-section">
              <h2>Genre-Specific Chapter Title Approaches</h2>
              <p>
                <strong>Fiction:</strong> Balance intrigue with clarity. Avoid spoilers while creating anticipation. Single-word titles ("Betrayal," "Revelation") or cryptic phrases ("The Letter," "Three Days Earlier") work well for maintaining mystery.
              </p>
              <p>
                <strong>Non-Fiction:</strong> Prioritize clarity and SEO. Use keywords that readers might search for. "Chapter 3: Social Media Marketing Strategies" is more valuable than "Chapter 3: Going Viral" for discoverability and navigation.
              </p>
              <p>
                <strong>Self-Help:</strong> Focus on transformation and benefits. "From Chaos to Clarity" or "Discovering Your Purpose" promise personal growth. Readers of self-help books want to know exactly what they'll gain from each chapter.
              </p>
              <p>
                <strong>Academic/Technical:</strong> Use precise, descriptive titles with relevant terminology. "Neural Network Architecture Fundamentals" or "Quantitative Research Methodologies" help readers locate specific information quickly.
              </p>
            </section>

            <section id="generator" className="guide-section">
              <h2>Generate Book Chapter Titles Instantly</h2>
              <p>Create compelling chapter titles for your book with our AI-powered generator:</p>
              
              <form onSubmit={handleGenerate} className="inline-generator">
                <Input 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter your chapter topic..."
                  required
                />
                <Button type="submit" size="lg" disabled={loading}>{loading ? 'Generating...' : 'Generate Chapter Titles'}</Button>
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

export default BookGuide;
