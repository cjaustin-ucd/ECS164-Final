import React from 'react'
import {useState} from "react"
export default function Clock() {
    const [startAngle, setStartAngle] = useState(0);
  const [endAngle, setEndAngle] = useState(0);
  const [dragging, setDragging] = useState(null);

  const handleMouseDown = (e, hand) => {
    setDragging(hand);
    handleMouseMove(e);
  };

  const handleMouseMove = (e) => {
    if (dragging === 'start' || dragging === 'end') {
      const rect = e.target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);

      if (dragging === 'start') {
        setStartAngle(angle);
      } else if (dragging === 'end') {
        setEndAngle(angle);
      }
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const startHandStyle = {
    transform: `rotate(${startAngle}deg)`
  };

  const endHandStyle = {
    transform: `rotate(${endAngle}deg)`
  };

  return (
    <div style={{ position: 'relative', width: '200px', height: '200px', border: '1px solid #ccc' }} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <svg width="200" height="200" style={{ position: 'absolute', top: 0, left: 0 }}>
        <circle cx="100" cy="100" r="90" stroke="black" strokeWidth="3" fill="none" />
        <line x1="100" y1="100" x2="100" y2="10" stroke="black" strokeWidth="3" transform={`rotate(${startAngle} 100 100)`} onMouseDown={(e) => handleMouseDown(e, 'start')}/>
        <line x1="100" y1="100" x2="100" y2="10" stroke="red" strokeWidth="3" transform={`rotate(${endAngle} 100 100)`} onMouseDown={(e) => handleMouseDown(e, 'end')}/>
        {/* <circle cx="100" cy="100" r="5" fill="black" onMouseDown={(e) => handleMouseDown(e, 'start')} />
        <circle cx="100" cy="10" r="5" fill="red" onMouseDown={(e) => handleMouseDown(e, 'end')} /> */}
      </svg>
      <div >
        <div >Start: {startAngle.toFixed(2)}</div>
        <div >End: {endAngle.toFixed(2)}</div>
      </div>
    </div>
  );
}
