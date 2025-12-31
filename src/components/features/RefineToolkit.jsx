import { useState } from 'react';
import { FaSync, FaExpandArrowsAlt, FaCompressArrowsAlt, FaEdit } from 'react-icons/fa';
import { generateUltraRobustTitles } from '../../utils/ultraRobustGenerator';

const RefineToolkit = ({ title, onTitleUpdate, platform, category }) => {
  const [loading, setLoading] = useState(false);
  const [activeAction, setActiveAction] = useState('');
  
  const handleSpin = async () => {
    setLoading(true);
    setActiveAction('spin');
    try {
      const variations = await generateUltraRobustTitles(title, platform, '', category, 'creative');
      const newTitle = variations[0] || title;
      onTitleUpdate(newTitle);
    } catch (error) {
      console.error('Spin failed:', error);
    }
    setLoading(false);
    setActiveAction('');
  };
  
  const handleExpand = async () => {
    setLoading(true);
    setActiveAction('expand');
    try {
      const expandedPrompt = `Make this title longer and more descriptive: "${title}"`;
      const variations = await generateUltraRobustTitles(expandedPrompt, platform, '', category, 'detailed');
      const newTitle = variations[0] || title;
      onTitleUpdate(newTitle);
    } catch (error) {
      console.error('Expand failed:', error);
    }
    setLoading(false);
    setActiveAction('');
  };
  
  const handleCompress = async () => {
    setLoading(true);
    setActiveAction('compress');
    try {
      const compressedPrompt = `Make this title shorter and punchier: "${title}"`;
      const variations = await generateUltraRobustTitles(compressedPrompt, platform, '', category, 'concise');
      const newTitle = variations[0] || title;
      onTitleUpdate(newTitle);
    } catch (error) {
      console.error('Compress failed:', error);
    }
    setLoading(false);
    setActiveAction('');
  };
  
  const handleOptimize = async () => {
    setLoading(true);
    setActiveAction('optimize');
    try {
      const optimizePrompt = `Optimize this title for SEO and engagement: "${title}"`;
      const variations = await generateUltraRobustTitles(optimizePrompt, platform, '', category, 'optimized');
      const newTitle = variations[0] || title;
      onTitleUpdate(newTitle);
    } catch (error) {
      console.error('Optimize failed:', error);
    }
    setLoading(false);
    setActiveAction('');
  };
  
  const tools = [
    {
      id: 'spin',
      icon: <FaSync />,
      label: 'Spin',
      description: 'Rewrite with different words',
      action: handleSpin
    },
    {
      id: 'expand',
      icon: <FaExpandArrowsAlt />,
      label: 'Expand',
      description: 'Make longer & detailed',
      action: handleExpand
    },
    {
      id: 'compress',
      icon: <FaCompressArrowsAlt />,
      label: 'Compress',
      description: 'Make shorter & punchier',
      action: handleCompress
    },
    {
      id: 'optimize',
      icon: <FaEdit />,
      label: 'Optimize',
      description: 'Boost SEO & engagement',
      action: handleOptimize
    }
  ];
  
  return (
    <div className="refine-toolkit">
      <div className="toolkit-header">
        <h4>Refine Tools</h4>
      </div>
      <div className="toolkit-actions">
        {tools.map(tool => (
          <button
            key={tool.id}
            className={`refine-action ${activeAction === tool.id ? 'loading' : ''}`}
            onClick={tool.action}
            disabled={loading}
            title={tool.description}
          >
            <div className="action-icon">
              {activeAction === tool.id && loading ? (
                <div className="spinner"></div>
              ) : (
                tool.icon
              )}
            </div>
            <span className="action-label">{tool.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RefineToolkit;