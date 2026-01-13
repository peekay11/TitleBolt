import './LoadingSkeleton.css';

const LoadingSkeleton = ({ type = 'title', count = 5 }) => {
  return (
    <div className="skeleton-container">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`skeleton skeleton-${type}`}>
          <div className="skeleton-shimmer"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;