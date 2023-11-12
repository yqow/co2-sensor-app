import React, { useEffect, useState } from 'react';
import { spawn } from 'child_process';

interface ProgressBarProps {
  value: number;
  acceptableRange: { min: number; max: number };
  barRange: { lower: number; upper: number };
  onRedZone: (inRedZone: boolean) => void;
}

const Progressbar: React.FC<ProgressBarProps> = ({
  value,
  acceptableRange,
  barRange,
}) => {
  let percentage = ((value - barRange.lower) / (barRange.upper - barRange.lower)) * 100;
  let progressColorClass = 'light-green';

  if (value > acceptableRange.min && value < acceptableRange.max) {
    progressColorClass = 'light-green';
  } else if (value > acceptableRange.min * 0.9 && value < acceptableRange.max * 1.1) {
    progressColorClass = 'yellow';
  } else {
    progressColorClass = 'red';
  }

  useEffect(() => {
    if (progressColorClass === 'red') {
      console.log("Progress bar red")
      fetch ("/api/solenoid").then(() => {
        console.log("Done fetching api/solenoid")
      })
      let timerId = setInterval(() => {
        document.title =
          document.title === 'CCS Sensor Data'
            ? 'ALERT: Sensor Data in Red Zone!'
            : 'CCS Sensor Data';
      }, 1000);

      return () => {
        clearInterval(timerId);
      };
    } else {
      document.title = 'CCS Sensor Data';
    }
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
