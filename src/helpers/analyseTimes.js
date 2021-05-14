import { format, differenceInHours, parse } from "date-fns";

const formatDefinition = {
    daily: "dd.MM.yyyy",
    monthly: "MM/yyyy",
};

export default function analyseTimes(logs, mode) {
    if (!logs || !mode) return;
    const chartFormat = formatDefinition[mode];
    const tempData = {};
    const finalData = [];

    logs.forEach((entry) => {
        let temp = format(entry.end, chartFormat);
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
            parse(b.name, chartFormat, new Date()) -
            parse(a.name, chartFormat, new Date())
        );
    });

    return finalData;
}
