"use client";

import { ReactNode, createContext, useEffect, useState } from "react";

const defaultRange = {
    co2AcceptableRange: { min: 800, max: 1800 },
    temperatureAcceptableRange: { min: 21, max: 27 },
    humidityAcceptableRange: { min: 60, max: 80 }
}

const AcceptableRangeContext = createContext({
    acceptableRangeState: defaultRange,
    setAcceptableRangeState: (arg: any) => { }
});

export const AcceptableRangeProvider = ({ children }: { children: ReactNode }) => {
    const [acceptableRangeState, setAcceptableRangeState] = useState(defaultRange);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedRangeState = window.localStorage.getItem("acceptableRangeState");
            if (storedRangeState === null) {
                window.localStorage.setItem("acceptableRangeState", JSON.stringify(acceptableRangeState));
            } else {
                setAcceptableRangeState(JSON.parse(storedRangeState));
            }
        } else {
            console.log("Windows is undefined or smth")
        }
    }, [])

    const setRangeState = (arg: any) => {
        console.log("SET STORAGE")
        setAcceptableRangeState(arg);
        window.localStorage.setItem("acceptableRangeState", JSON.stringify(arg));
    }

    return (
        <AcceptableRangeContext.Provider value={{ acceptableRangeState, setAcceptableRangeState: setRangeState }}>
            {children}
        </AcceptableRangeContext.Provider>
    )
}


export { AcceptableRangeContext, defaultRange };
export default AcceptableRangeProvider;