'use client'

import { useEffect, useState } from 'react';
import ProgressBar from '../components/ProgressBar';
interface SensorData {
  co2: number;
  temperature: number;
  humidity: number;
}

export default function Home({location} : {location: string}) {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [inRedZone, setInRedZone] = useState(false);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const fetchData = async () => {
            // fetch data by location
          const response = await fetch(`/api/get_data/${location}`, {
            method: 'GET',
          });
          if (response.ok) {
            const dataString = await response.text(); // Get the JSON string
            const data = JSON.parse(dataString); // Parse the JSON string
            setSensorData(data); // Set the component state with parsed data
            // console.log(data); // Log the parsed data (for debugging)
          } else {
            console.error('Error fetching data');
          }
        };

        fetchData();
        const interval = setInterval(fetchData, 2000); // Refresh data every 2 seconds

        return () => clearInterval(interval); // Clear the interval when the component unmounts
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSensorData();
  }, [location]);

  useEffect(() => {
    function handleVisibilityChange() {
      if (document.hidden) {
        const redBar = document.querySelectorAll('.progressbar.red');
        if (redBar.length > 0) {
          setInRedZone(true);
        }
        setInRedZone(false); // Tab is hidden
      } else {
        // Reset the title and set inRedZone based on the progress bar
        const redBar = document.querySelectorAll('.progressbar.red');
        if (redBar.length > 0) {
          setInRedZone(true);
        } else {
          setInRedZone(false);
        }
      }
    }

    // Add event listener for visibility change
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clear the timer when the component unmounts
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [inRedZone]);


  return (
    <div>
      <h1><strong>Sensor Data @ {location}</strong></h1>
      {sensorData ? (
        <div>
          <p><strong>CO2:</strong> {sensorData.co2} ppm</p>
          <ProgressBar
            value={sensorData.co2}
            acceptableRange={{ min: 800, max: 1800 }}
            barRange={{ lower: 0, upper: 3000 }}
            onRedZone={(inRedZone) => setInRedZone(inRedZone)}
          />
          <p><strong>Temperature:</strong> {sensorData.temperature} °C</p>
          <ProgressBar
            value={sensorData.temperature}
            acceptableRange={{ min: 21.1, max: 26.6 }}
            barRange={{ lower: 16, upper: 50 }}
            onRedZone={(inRedZone) => setInRedZone(inRedZone)}
          />
          <p><strong>Humidity:</strong> {sensorData.humidity} RH</p>
          <ProgressBar
            value={sensorData.humidity}
            acceptableRange={{ min: 55, max: 80 }}
            barRange={{ lower: 0, upper: 100 }}
            onRedZone={(inRedZone) => setInRedZone(inRedZone)}
          />
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
