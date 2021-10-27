import React from 'react';

type SwitchProps = {
  label: string;
  isInline?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const Switch = ({ label, isInline, onChange }: SwitchProps) => {
  return (
    <div
      className={`form-check form-switch d-flex ps-0 switch-component ${
        isInline ? '' : 'justify-content-between'
      }`}
    >
      <label className="form-check-label fs-5" htmlFor="flexSwitchCheckDefault">
        {label}
      </label>
      <input
        className="form-check-input"
        type="checkbox"
        id="flexSwitchCheckDefault"
        onChange={onChange}
      />
    </div>
  );
};

export default Switch;
