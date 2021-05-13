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

export default function Daily(props) {
    const [logs, setLogs] = useState();

    useEffect(() => {
        try {
            setLogs(JSON.parse(localStorage.getItem("timeLogs"))[props.user]);
        } catch (error) {
            console.log("could not read LS:", error.message);
        }
    }, [props.user]);

    const dailyData = {};
    const dailyFinal = [];
    if (logs) {
        logs.forEach((entry) => {
            let temp = format(entry.end, "dd.MM.yyyy");
            if (dailyData[temp]) {
                dailyData[temp] += differenceInHours(entry.end, entry.start);
            } else {
                dailyData[temp] = differenceInHours(entry.end, entry.start);
            }
        });
        for (const element of Object.keys(dailyData)) {
            dailyFinal.push({ name: element, hours: dailyData[element] });
        }
    }

    return (
        <div className="sections">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={dailyFinal}
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
