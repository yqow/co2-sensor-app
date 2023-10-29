'use client'

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import ProgressBar from './components/ProgressBar';

import { AcceptableRange } from './types/ProgressBarTypes';
import { barRange } from './types/barRangeTypes';
import RangeSelector from './components/RangeSelector';
import Layout from './components/Layout';
import { db } from '@vercel/postgres';
import { SensorData } from './types/sensorDataTypes';
import Chart, { ChartData } from './components/Chart';
import Home from './home';

interface ChartContextType {
  chartData: ChartData;
  updateData: any;
}

const ChartContext = createContext<ChartContextType>({
  chartData: {
    labels: [],
    datasets: [
      {
        label: 'CO2',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Temperature',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Humidity',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
    ]
  },
  updateData: undefined
});

export { ChartContext };

export default function Main() {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: 'CO2',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Temperature',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Humidity',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
    ]
  });

  const updateData = useCallback((newSensorData: SensorData) => {
    const newLabels = [...chartData.labels, newSensorData.timestamp]
    const newCO2Data = [...chartData.datasets[0].data, newSensorData.co2]
    const newTemperatureData = [...chartData.datasets[1].data, newSensorData.temperature]
    const newHumidityData = [...chartData.datasets[2].data, newSensorData.humidity]
    // Update CO2 data in the state
    setChartData({
      labels: newLabels,
      datasets: [
        { ...chartData.datasets[0], data: newCO2Data },
        { ...chartData.datasets[1], data: newTemperatureData },
        { ...chartData.datasets[2], data: newHumidityData },
      ]

    });
  }, []);

  const contextValue = {chartData, updateData}

  return (
      <Home />
  )
}
