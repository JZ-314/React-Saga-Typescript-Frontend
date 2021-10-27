import React from 'react';

const Notepad = () => {
  return (
    <div className="d-flex flex-column p-3 rounded-3 notepad">
      <div className="d-flex align-items-center justify-content-between">
        <span className="fs-5 fw-bold">NotePad</span>
        <span>A | A</span>
        <button className="btn btn-outline-primary rounded-pill">Clear All</button>
      </div>
      <textarea placeholder="Start writing here" className="mt-2 fs-5 pt-3" />
      <div className="d-flex">
        <button className="btn btn-primary btn-lg w-75">
          <i className="bi-upload icon text-light" />
          <span className="text-light fs-6 ps-2">Upload File</span>
        </button>
        <button className="btn btn-outline-dark ms-3 btn-lg" style={{ background: '#2C2D55' }}>
          <i className="bi-share icon text-light" />
        </button>
      </div>
    </div>
  );
};

export default Notepad;
