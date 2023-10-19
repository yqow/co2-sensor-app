'use client'

import { useEffect, useState } from 'react';
import ProgressBar from './components/ProgressBar';
import Navbar from './components/Navbar';
interface SensorData {
  co2: number;
  temperature: number;
  humidity: number;
}

export default function Home() {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const fetchData = async () => {
          const response = await fetch('/api/get_data', {
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
  }, []);

  return (
    <div>
      <Navbar />
      <h1><strong>Sensor Data</strong></h1>
      {sensorData ? (
        <div>
          <p> <strong>CO2:</strong> {sensorData.co2} ppm</p>
          <ProgressBar value={sensorData.co2} acceptableRange={{ min: 800, max: 1500 }} barRange={{ lower: 0, upper: 3000 }} />
          <p> <strong>Temperature:</strong> {sensorData.temperature} °C</p>
          <ProgressBar value={sensorData.temperature} acceptableRange={{ min: 21.1, max: 26.6 }} barRange={{ lower: 16, upper: 50 }} />
          <p> <strong>Humidity:</strong> {sensorData.humidity} RH</p>
          <ProgressBar value={sensorData.humidity} acceptableRange={{ min: 70, max: 80 }} barRange={{ lower: 0, upper: 100 }} />
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}