import { useEffect, useState } from "react";
import { format, differenceInHours, parse } from "date-fns";

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

export default function Summary(props) {
    const [logs, setLogs] = useState();

    useEffect(() => {
        try {
            setLogs(JSON.parse(localStorage.getItem("timeLogs"))[props.user]);
        } catch (error) {
            console.log("could not read LS:", error.message);
        }
    }, [props.user]);

    const formatDefinition = props.mode === "daily" ? "dd.MM.yyyy" : "MM/yyyy";
    const tempData = {};
    const finalData = [];
    if (logs) {
        logs.forEach((entry) => {
            let temp = format(entry.end, formatDefinition);
            if (tempData[temp]) {
                tempData[temp] += differenceInHours(entry.end, entry.start);
            } else {
                tempData[temp] = differenceInHours(entry.end, entry.start);
            }
        });
        for (const element of Object.keys(tempData)) {
            finalData.push({ name: element, hours: tempData[element] });
        }
        finalData.sort((a, b) => {
            return (
                parse(b.name, formatDefinition, new Date()) -
                parse(a.name, formatDefinition, new Date())
            );
        });
    }

    return (
        <div className="sections">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={finalData}
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
