import './Input.css';

const Input = ({ label, value, onChange, placeholder, type = 'text', required = false }) => {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label} {required && <span className="required">*</span>}</label>}
      <input 
        type={type}
        className="input-field"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Input;
