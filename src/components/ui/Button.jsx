import './Button.css';

const Button = ({ children, variant = 'primary', size = 'md', onClick, disabled, type = 'button' }) => {
  return (
    <button 
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
