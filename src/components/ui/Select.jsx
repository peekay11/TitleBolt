import './Select.css';

const Select = ({ label, value, onChange, options, required = false }) => {
  return (
    <div className="select-group">
      {label && <label className="select-label">{label} {required && <span className="required">*</span>}</label>}
      <select 
        className="select-field"
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">Select...</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
