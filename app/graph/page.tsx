'use client'
import React, { useContext, useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LineController,
    LineControllerChartOptions
} from 'chart.js'
import { AcceptableRangeContext } from '../context/acceptableRangeContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)


interface Dataset {
    id: number;
    label: string;
    data: number[];
}

interface ChartData {
    labels: string[];
    datasets: Dataset[];
}

const minutesDiff = (dateTimeValue2: Date, dateTimeValue1: Date) => {
    var differenceValue =(dateTimeValue2.getTime() - dateTimeValue1.getTime()) / 1000;
    return Math.floor(Math.abs(Math.round(differenceValue)));
 }


const page = () => {
    const [duration, setDuration] = useState<string>("30");
    const [curTime, setCurTime] = useState<Date>(new Date());
    const [data, setData] = useState<ChartData>({ labels: [], datasets: [] });

    const last30Mins = () => {
        console.log("Clicked 30 min")
        setDuration("30");
    }

    const last1hour = () => {
        console.log("Clicked 1 hour")
        setDuration("60")
    }

    const setRealtime = () => {
        console.log("Clicked Realtime")
        const currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() - 10)
        setCurTime(currentTime);
        setDuration("realtime");
    }

    useEffect(() => {
        const fetchData = async () => {
            console.log("Running for fetching with duration ", duration)
            try {
                // Fetch real-time CO2 data (replace with your API call)
                const minDiff = minutesDiff(curTime, new Date());
                if (duration === "realtime") {
                    console.log("Minute diff = ", minDiff)
                }
                const queryParams = duration !== "realtime" ? `?duration=${parseInt(duration, 10) * 60}` : `?duration=${minDiff}`;
                const newSensorData = await fetch(`/api/get_data${queryParams}`).then((res) => res.json());
                const result = newSensorData.result
                setData({
                    labels: result.map((d: { timestamp: string }) => d.timestamp.slice(0, -5)),
                    datasets: [
                        {
                            id: 1,
                            label: "CO2",
                            data: result.map((d: { co2: number }) => d.co2),
                        },
                        {
                            id: 2,
                            label: "Temperature",
                            data: result.map((d: { temperature: number }) => d.temperature),
                        },
                        {
                            id: 3,
                            label: "Humidity",
                            data: result.map((d: { humidity: number }) => d.humidity),
                        },
                    ]
                })
            } catch (error) {
                console.error('Error fetching CO2 data:', error);
            }
        };
        fetchData();
        if (duration !== "realtime") {
            console.log("Should call for 30/60 mins")
            return () => {}
        } else {
            const updateInterval = setInterval(fetchData, 5000); // Update CO2 every 5 seconds
            console.log("Should call for realtime")
            return () => clearInterval(updateInterval); // Clear the interval when unmounting
        }

    }, [duration, curTime]);

    const {acceptableRangeState, setAcceptableRangeState} = useContext(AcceptableRangeContext)
    
    const renderChart = (chartData: ChartData) => {
        const shouldRedraw = duration !== "realtime"
        return (
            <>
               <Line redraw={shouldRedraw} data={{...chartData, datasets: [chartData.datasets[0]]}} datasetIdKey='id' />
               <Line redraw={shouldRedraw} data={{...chartData, datasets: [chartData.datasets[1]]}} datasetIdKey='id' />
               <Line redraw={shouldRedraw} data={{...chartData, datasets: [chartData.datasets[2]]}} datasetIdKey='id' />
            </>
        )
    }

    console.log(JSON.stringify(acceptableRangeState))

    return (
        <div>
            <div className="flex flex-row">
                <Nav.Link href="/">Home</Nav.Link>
                <button className="text-green-600 ml-4" onClick={last30Mins}>
                    Last 30 minutes
                </button>
                <button className="text-yellow-600 ml-4" onClick={last1hour}>
                    Last 1 hour
                </button>
                <button className="text-blue-600 ml-4" onClick={setRealtime}>
                    Realtime
                </button>
            </div>
            <div id="myChart">
                {renderChart(data)}
            </div>
        </div>
    )
}

export default page



