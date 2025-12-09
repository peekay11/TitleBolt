import { useState, useEffect } from 'react';
import './TableOfContents.css';

const TableOfContents = ({ sections }) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="toc">
      <h3 className="toc-title">Table of Contents</h3>
      <ul className="toc-list">
        {sections.map((section) => (
          <li 
            key={section.id}
            className={`toc-item ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => scrollToSection(section.id)}
          >
            {section.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
