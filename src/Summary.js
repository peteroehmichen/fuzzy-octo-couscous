import { useEffect, useState } from "react";
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
import analyseTimes from "./helpers/analyseTimes";

export default function Summary(props) {
    const [logs, setLogs] = useState();

    useEffect(() => {
        try {
            setLogs(JSON.parse(localStorage.getItem("timeLogs"))[props.user]);
        } catch (error) {
            console.log("could not read LS:", error.message);
        }
    }, [props.user]);

    const chartData = analyseTimes(logs, props.mode);

    return (
        <div className="sections">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={chartData}
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
