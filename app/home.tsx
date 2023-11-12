'use client'

import { useContext, useEffect, useState } from 'react';
import ProgressBar from './components/ProgressBar';

import { AcceptableRange } from './types/ProgressBarTypes';
import { barRange } from './types/barRangeTypes';
import RangeSelector from './components/RangeSelector';
import Layout from './components/Layout';
import { db } from '@vercel/postgres';
import { SensorData } from './types/sensorDataTypes';
import Chart, { ChartData } from './components/Chart';
import {AcceptableRangeContext} from "./context/acceptableRangeContext"
// import SocketExample from './components/socket';


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
        const newSensorData = JSON.parse(dataString);
        setSensorData(newSensorData);
        console.log(`Fetch data ${newSensorData}`)
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
  // const [acceptableRange, setAcceptableRange] = useState<AcceptableRange>({ min: 800, max: 1800 })
  // const [acceptableRange2, setAcceptableRange2] = useState<AcceptableRange>({ min: 21, max: 27 })
  // const [acceptableRange3, setAcceptableRange3] = useState<AcceptableRange>({ min: 60, max: 80 })

  const { acceptableRangeState, setAcceptableRangeState } = useContext(AcceptableRangeContext)
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
      <h2>Time</h2>
      {sensorData ? (
        <div>
          <p><strong>CO2:</strong> {sensorData.co2} ppm</p>
          <ProgressBar
            value={sensorData.co2}
            acceptableRange={acceptableRangeState.co2AcceptableRange}
            barRange={barRange1}
            onRedZone={(inRedZone) => setInRedZone(inRedZone)}
          />
          <p><strong>Temperature:</strong> {sensorData.temperature} °C</p>
          <ProgressBar
            value={sensorData.temperature}
            acceptableRange={acceptableRangeState.temperatureAcceptableRange}
            barRange={barRange2}
            onRedZone={(inRedZone) => setInRedZone(inRedZone)}
          />
          <p><strong>Humidity:</strong> {sensorData.humidity} RH</p>
          <ProgressBar
            value={sensorData.humidity}
            acceptableRange={acceptableRangeState.humidityAcceptableRange}
            barRange={barRange3}
            onRedZone={(inRedZone) => setInRedZone(inRedZone)}
          />
          {/* {RangeSelector} */}
          <button onClick={() => setIsCO2SelectorPopped(!isCO2SelectorPopped)}>Range selection for CO2</button>
          {isCO2SelectorPopped ? <RangeSelector range={acceptableRangeState.co2AcceptableRange} setRange={(range: AcceptableRange) => {
            setAcceptableRangeState({
              ...acceptableRangeState,
              co2AcceptableRange: range
            })
          }} barRange={barRange1} /> : null}
          <br></br>
          <button onClick={() => setIsTempSelectorPopped(!isTempSelectorPopped)}>Range selection for temperature</button>
          {isTempSelectorPopped ? <RangeSelector range={acceptableRangeState.temperatureAcceptableRange} setRange={(range: AcceptableRange) => {
            setAcceptableRangeState({
              ...acceptableRangeState,
              temperatureAcceptableRange: range
            })
          }} barRange={barRange2} /> : null}
          <br></br>
          <button onClick={() => setIsHumiditySelectorPopped(!isHumiditySelectorPopped)}>Range selection for humidity</button>
          {isHumiditySelectorPopped ? <RangeSelector range={acceptableRangeState.humidityAcceptableRange} setRange={(range: AcceptableRange) => {
            setAcceptableRangeState({
              ...acceptableRangeState,
              humidityAcceptableRange: range
            })
          }} barRange={barRange3} /> : null}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </Layout>
  );
}
