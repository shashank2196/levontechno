import React from 'react';

const Light = ({ color, active, timer }) => {
  return (
    <div className={`light ${color} ${active ? 'active' : ''}`}>
      {active && <span className="timer">{timer}</span>}
    </div>
  );
};

export default Light;
