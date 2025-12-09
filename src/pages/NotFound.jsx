import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container">
        <div className="not-found-content">
          <h1 className="error-code">404</h1>
          <h2 className="error-title">Page Not Found</h2>
          <p className="error-message">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="error-actions">
            <Link to="/">
              <Button size="lg">Go Home</Button>
            </Link>
            <Link to="/generator">
              <Button variant="secondary" size="lg">Try Generator</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
