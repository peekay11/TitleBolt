import './AdSlot.css';

const AdSlot = ({ type, className = '' }) => {
  const dimensions = {
    leaderboard: { width: '728px', height: '90px' },
    banner: { width: '320px', height: '50px' },
    rectangle: { width: '300px', height: '250px' },
    skyscraper: { width: '160px', height: '600px' }
  };

  const size = dimensions[type] || dimensions.rectangle;

  return (
    <div 
      className={`ad-slot ad-${type} ${className}`}
      style={{ minHeight: size.height, maxWidth: size.width }}
    >
      Ad Space ({size.width} × {size.height})
    </div>
  );
};

export default AdSlot;
