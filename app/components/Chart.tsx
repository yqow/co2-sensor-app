"use client";
import { useState, useEffect, useCallback, memo, useContext } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ChartContext } from "../page";

// Register ChartJS components using ChartJS.register
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
);

interface ChartDetails {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
}

interface ChartData {
    labels: Date[];
    datasets: ChartDetails[];
}

export type { ChartData };

const RealTimeChart = () => {
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch real-time CO2 data (replace with your API call)
                const newSensorData = await fetch('/api/get_data').then((res) => res.json());
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
            } catch (error) {
                console.error('Error fetching CO2 data:', error);
            }
        };

        const updateInterval = setInterval(fetchData, 5000); // Update CO2 every 5 seconds

        return () => clearInterval(updateInterval); // Clear the interval when unmounting
    }, []);

    console.log(chartData)

    return (
        <div>
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
    );
};

export default memo(RealTimeChart)
