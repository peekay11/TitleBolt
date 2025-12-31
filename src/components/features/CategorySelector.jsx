import { FaGamepad, FaDollarSign, FaHeart, FaLaptopCode, FaUtensils, FaDumbbell, FaGraduationCap, FaHome } from 'react-icons/fa';

const CategorySelector = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    {
      id: 'gaming',
      name: 'Gaming',
      icon: <FaGamepad />,
      description: 'Gaming reviews, tutorials, and entertainment',
      keywords: ['gameplay', 'review', 'guide', 'tips', 'walkthrough']
    },
    {
      id: 'finance',
      name: 'Finance',
      icon: <FaDollarSign />,
      description: 'Money, investing, and financial advice',
      keywords: ['money', 'invest', 'save', 'budget', 'profit']
    },
    {
      id: 'lifestyle',
      name: 'Lifestyle',
      icon: <FaHeart />,
      description: 'Life tips, relationships, and personal growth',
      keywords: ['life', 'tips', 'habits', 'success', 'happiness']
    },
    {
      id: 'technology',
      name: 'Technology',
      icon: <FaLaptopCode />,
      description: 'Tech reviews, tutorials, and industry news',
      keywords: ['tech', 'review', 'tutorial', 'guide', 'latest']
    },
    {
      id: 'food',
      name: 'Food & Cooking',
      icon: <FaUtensils />,
      description: 'Recipes, cooking tips, and food reviews',
      keywords: ['recipe', 'cooking', 'delicious', 'easy', 'homemade']
    },
    {
      id: 'fitness',
      name: 'Health & Fitness',
      icon: <FaDumbbell />,
      description: 'Workouts, nutrition, and wellness',
      keywords: ['workout', 'fitness', 'healthy', 'exercise', 'nutrition']
    },
    {
      id: 'education',
      name: 'Education',
      icon: <FaGraduationCap />,
      description: 'Learning, tutorials, and skill development',
      keywords: ['learn', 'tutorial', 'guide', 'course', 'skill']
    },
    {
      id: 'home',
      name: 'Home & DIY',
      icon: <FaHome />,
      description: 'Home improvement, crafts, and DIY projects',
      keywords: ['DIY', 'home', 'craft', 'project', 'decor']
    }
  ];
  
  return (
    <div className="category-selector">
      <h3 className="selector-title">Choose Your Niche</h3>
      <div className="categories-grid">
        {categories.map(category => (
          <div
            key={category.id}
            className={`category-card ${selectedCategory === category.id ? 'selected' : ''}`}
            onClick={() => onCategoryChange(category.id)}
          >
            <div className="category-icon">
              {category.icon}
            </div>
            <div className="category-info">
              <h4 className="category-name">{category.name}</h4>
              <p className="category-description">{category.description}</p>
            </div>
            <div className="category-keywords">
              {category.keywords.slice(0, 3).map(keyword => (
                <span key={keyword} className="keyword-tag">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;