import React from 'react';

type InputProps = {
  id: string;
  type: string;
  name?: string;
  icon?: string;
  placeholder?: string;
  label?: string;
  aria?: string;
  helperText?: string;
  value: string;
  onChange: any;
  required?: boolean;
};

const MainInput = ({
  label,
  id,
  type,
  name,
  aria,
  helperText,
  placeholder,
  icon,
  value,
  onChange,
  required,
}: InputProps) => {
  return (
    <div className="main-input-component">
      {label && (
        <label htmlFor={id} className="form-label fs-6">
          {label}
        </label>
      )}
      <div className="main-input-component__container">
        {icon && <i className={`fas fa-${icon} icon`}></i>}
        <input
          type={type}
          className="form-control fs-6"
          name={name}
          id={id}
          aria-describedby={aria}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
      {helperText && <div className="form-text">{helperText}</div>}
    </div>
  );
};

export default MainInput;
