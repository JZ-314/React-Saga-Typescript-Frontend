import React, { useState } from 'react';

type RangeProps = {
  label: string;
  id: string;
};

const Range = ({ label, id }: RangeProps) => {
  const [range, setRange] = useState(0);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRange(Number(e.target.value));
  };

  return (
    <div className="d-flex flex-column range-component">
      <div className="d-flex justify-content-between mb-3">
        <label className="fs-5" htmlFor={id}>
          {label}
        </label>
        <span className="fs-5">{`${range}%`}</span>
      </div>
      <input
        type="range"
        id={id}
        name={id}
        min="0"
        max="100"
        className="w-100"
        onChange={onChange}
      />
    </div>
  );
};

export default Range;
