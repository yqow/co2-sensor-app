'use client'

import { useEffect, useState } from 'react';
import ProgressBar from './components/ProgressBar';

import { AcceptableRange } from './types/ProgressBarTypes';
import { barRange } from './types/barRangeTypes';
import RangeSelector from './components/RangeSelector';
import Layout from './components/Layout';
import { db } from '@vercel/postgres';
interface SensorData {
  co2: number;
  temperature: number;
  humidity: number;
}


export default function Home() {
  // const client = db.connect();
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [inRedZone, setInRedZone] = useState(false);
  useEffect(() => {
    const getSensorData = async () => {
      await fetch('/api/get_data', {
        method: 'GET',
      }).then(async (res) => {
        const dataString = await res.text(); // Get the JSON string
        const data = JSON.parse(dataString);
        setSensorData(data);
        console.log(`Fetch data ${data}`)
      }).catch(err => {
        console.error(`Fetch data error ${err}`)
      });
    };
    getSensorData();
    const interval = setInterval(() => {
      getSensorData();
    }, 5000);
    return () => clearInterval(interval);
  }, [])

  // useEffect(() => {
  //   const fetchSensorData = async () => {
  //     try {
  //       const fetchData = async () => {
  //         const response = await fetch('/api/get_data', {
  //           method: 'GET',
  //         });

  //         if (response.ok) {
  //           const dataString = await response.text(); // Get the JSON string
  //           const data = JSON.parse(dataString); // Parse the JSON string
  //           setSensorData(data); // Set the component state with parsed data
  //           // console.log(data); // Log the parsed data (for debugging)
  //         } else {
  //           console.error('Error fetching data');
  //         }
  //       };

  //       fetchData();
  //       const interval = setInterval(fetchData, 5000); // Refresh data every 2 seconds

  //       return () => clearInterval(interval); // Clear the interval when the component unmounts
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchSensorData();
  // }, []);

  const [acceptableRange, setAcceptableRange] = useState<AcceptableRange>({ min: 800, max: 1800 })
  const [acceptableRange2, setAcceptableRange2] = useState<AcceptableRange>({ min: 21, max: 27 })
  const [acceptableRange3, setAcceptableRange3] = useState<AcceptableRange>({ min: 60, max: 80 })
  const barRange1: barRange = { lower: 0, upper: 5000 }
  const barRange2: barRange = { lower: 0, upper: 50 }
  const barRange3: barRange = { lower: 0, upper: 100 }
  const [isCO2SelectorPopped, setIsCO2SelectorPopped] = useState(false);
  const [isTempSelectorPopped, setIsTempSelectorPopped] = useState(false);
  const [isHumiditySelectorPopped, setIsHumiditySelectorPopped] = useState(false);

  useEffect(() => {
    function handleVisibilityChange() {
      if (document.hidden) {
        const redBar = document.querySelector('.progressbar-red');
        if (redBar) {
          setInRedZone(true);
        } else {
          setInRedZone(false); // Tab is hidden
        }
      } else {
        // Reset the title and set inRedZone based on the progress bar
        const redBar = document.querySelector('.progressbar-red');
        if (redBar) {
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
  }, [sensorData]);


  useEffect(() => {
    // Start a timer to update the title every second if in the red zone
    let timerId: NodeJS.Timeout | null = null;

    if (inRedZone) {
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
  }, [inRedZone])

  return (
    <Layout>
      <h1><strong>Sensor Data</strong></h1>
      {sensorData ? (
        <div>
          <p><strong>CO2:</strong> {sensorData.co2} ppm</p>
          <ProgressBar
            value={sensorData.co2}
            acceptableRange={acceptableRange}
            barRange={barRange1}
            onRedZone={(inRedZone) => setInRedZone(inRedZone)}
          />
          <p><strong>Temperature:</strong> {sensorData.temperature} °C</p>
          <ProgressBar
            value={sensorData.temperature}
            acceptableRange={acceptableRange2}
            barRange={barRange2}
            onRedZone={(inRedZone) => setInRedZone(inRedZone)}
          />
          <p><strong>Humidity:</strong> {sensorData.humidity} RH</p>
          <ProgressBar
            value={sensorData.humidity}
            acceptableRange={acceptableRange3}
            barRange={barRange3}
            onRedZone={(inRedZone) => setInRedZone(inRedZone)}
          />
          {/* {RangeSelector} */}
          <button onClick={() => setIsCO2SelectorPopped(!isCO2SelectorPopped)}>Range selection for CO2</button>
          {isCO2SelectorPopped ? <RangeSelector range={acceptableRange} setRange={setAcceptableRange} barRange={barRange1} /> : null}
          <br></br>
          <button onClick={() => setIsTempSelectorPopped(!isTempSelectorPopped)}>Range selection for temperature</button>
          {isTempSelectorPopped ? <RangeSelector range={acceptableRange2} setRange={setAcceptableRange2} barRange={barRange2} /> : null}
          <br></br>
          <button onClick={() => setIsHumiditySelectorPopped(!isHumiditySelectorPopped)}>Range selection for humidity</button>
          {isHumiditySelectorPopped ? <RangeSelector range={acceptableRange3} setRange={setAcceptableRange3} barRange={barRange3} /> : null}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </Layout>
  );
}
