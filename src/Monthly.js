import { useEffect, useState } from "react";
import { format, differenceInHours } from "date-fns";

// import React, { PureComponent } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function Monthly(props) {
    const [logs, setLogs] = useState();

    useEffect(() => {
        try {
            setLogs(JSON.parse(localStorage.getItem("timeLogs"))[props.user]);
        } catch (error) {
            console.log("could not read LS:", error.message);
        }
    }, [props.user]);

    const monthlyData = {};
    const monthlyFinal = [];
    if (logs) {
        logs.forEach((entry) => {
            let temp = format(entry.end, "MM/yyyy");
            if (monthlyData[temp]) {
                monthlyData[temp] += differenceInHours(entry.end, entry.start);
            } else {
                monthlyData[temp] = differenceInHours(entry.end, entry.start);
            }
        });
        for (const element of Object.keys(monthlyData)) {
            monthlyFinal.push({ name: element, hours: monthlyData[element] });
        }
    }

    return (
        <div className="sections">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={monthlyFinal}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="hours" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
