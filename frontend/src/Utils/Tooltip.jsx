import React, { useState, useRef, useEffect } from 'react';

const Tooltip = ({ message, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({});
  const tooltipRef = useRef(null);

  const handleMouseEnter = (event) => {
    setIsHovered(true);

    // Calculate tooltip position
    const tooltipElement = tooltipRef.current;
    if (tooltipElement) {
      const { left, right, width } = tooltipElement.getBoundingClientRect();
      const windowWidth = window.innerWidth;

      // Center the tooltip by default
      let positionStyle = {
        left: '50%',
        transform: 'translateX(-50%)',
      };

      // Adjust position if it overflows on the left or right
      if (left < 0) {
        positionStyle = { left: '0', transform: 'translateX(0)' };
      } else if (right > windowWidth) {
        positionStyle = { right: '0', transform: 'translateX(0)' };
      }

      setTooltipPosition(positionStyle);
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div
          ref={tooltipRef}
          className="absolute top-full mt-3 w-max max-w-xs px-2 py-1 text-sm text-white bg-black rounded-md shadow-lg"
          style={{ ...tooltipPosition }}
        >
          {message}
        </div>
      )}
      {children}
    </div>
  );
};

export default Tooltip;