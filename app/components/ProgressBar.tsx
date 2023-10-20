import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  value: number;
  acceptableRange: { min: number; max: number };
  barRange: { lower: number; upper: number };
  onRedZone: (inRedZone: boolean) => void; // Ensure the type matches your intended use
}

const Progressbar: React.FC<ProgressBarProps> = ({
  value,
  acceptableRange,
  barRange,
}) => {
  let percentage = 0;
  percentage = ((value - barRange.lower) / (barRange.upper - barRange.lower)) * 100;
  let progressColorClass = 'green'; // Default to green

  if (value > acceptableRange.min && value < acceptableRange.max) {
    progressColorClass = 'light-green';
  } else if (value > acceptableRange.min * 0.9 && value < acceptableRange.max * 1.1) {
    progressColorClass = 'yellow'; // If outside +-10%, set to yellow
  } else {
    progressColorClass = 'red';
  }

  useEffect(() => {
    // Start a timer to update the title every second if in the red zone
    let timerId: NodeJS.Timeout | null = null;

    if (progressColorClass === 'red') {
      timerId = setInterval(() => {
        document.title =
          document.title === 'CCS Sensor Data'
            ? 'ALERT: Sensor Data in Red Zone!'
            : 'CCS Sensor Data';
      }, 1000); // Update the title every second
    } else {
      // Reset the title and clear the timer
      document.title = 'CCS Sensor Data';
      if (timerId) {
        clearInterval(timerId);
      }
    }

    return () => {
      // Cleanup: clear the timer when the component unmounts
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [progressColorClass]);

  return (
    <div className="progressbar-container">
      <div className={`progressbar ${progressColorClass}`} style={{ width: `${percentage}%` }}>
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
            animation: blinker 1s linear infinite;
          }
          @keyframes blinker {
            0% {
              background-color: red;
            }
            50% {
              background-color: transparent;
            }
            100% {
              background-color: red;
            }
        `}</style>
      </div>
    </div>
  );
};

export default Progressbar;
