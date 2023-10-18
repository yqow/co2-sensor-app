'use client'

import { useEffect, useState } from 'react';

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
      <h1>Sensor Data</h1>
      {sensorData ? (
        <div>
          <p>CO2: {sensorData.co2} ppm</p>
          <p>Temperature: {sensorData.temperature} °C</p>
          <p>Humidity: {sensorData.humidity} RH</p>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}