import React from 'react';

interface ProgressBarProps {
  value: number;
  acceptableRange: { min: number; max: number };
  barRange: { lower: number; upper: number };
}

const Progressbar: React.FC<ProgressBarProps> = ({ value, acceptableRange, barRange }) => {
  let percentage = 0;

  percentage = ((value - barRange.lower) / (barRange.upper - barRange.lower)) * 100;
  let progressColorClass = 'green'; // Default to green
  if (value > acceptableRange.min && value < acceptableRange.max) {
    progressColorClass = 'light-green'
  }
  else if (value > acceptableRange.min * 0.9 && value < acceptableRange.max * 1.1) {
    progressColorClass = 'yellow'; // If outside +-10%, set to yellow
  } else {
    progressColorClass = 'red';
  }

  return (
    <div className="progressbar-container">
      <div
        className={`progressbar ${progressColorClass}`}
        style={{ width: `${percentage}%` }}
      >
        <style jsx>{`
          .progressbar-container {
            width: 100%;
            height: 20px;
            border: 1px solid #ccc;
            position: relative;
          }
          .progressbar {
            height: 100%;
            transition: width 0.5s;
          }
          .light-green {
            background-color: lightgreen;
          }
          .yellow {
            background-color: yellow;
          }
          .red {
            background-color: red;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Progressbar;
