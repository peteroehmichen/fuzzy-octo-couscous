import { useEffect, useState } from "react";
import DateInTable from "./DateInTable";
import EditTimesButton from "./EditTimesButton";

export default function Edit({ user }) {
    const [logs, setLogs] = useState();
    const [lineEdit, setLineEdit] = useState({});
    const [lineDelete, setLineDelete] = useState({});
    const [blockOtherEdits, setBlockOtherEdits] = useState(false);
    const [updatedStart, setUpdatedStart] = useState();
    const [updatedEnd, setUpdatedEnd] = useState();

    useEffect(() => {
        try {
            setLogs(JSON.parse(localStorage.getItem("timeLogs"))[user]);
        } catch (error) {
            console.log("could not read LS:", error.message);
        }
    }, [user]);

    useEffect(() => {
        try {
            const prevStorage = JSON.parse(localStorage.getItem("timeLogs"));
            prevStorage[user] = logs;
            localStorage.setItem("timeLogs", JSON.stringify(prevStorage));
        } catch (error) {
            console.log("could not access LS:", error.message);
        }
    }, [user, logs]);

    const noData = <p>No previous entries found</p>;

    function toggleBlocks(index, purpose) {
        return function (action) {
            setBlockOtherEdits(!blockOtherEdits);

            if (purpose === "edit") {
                setLineEdit({
                    ...lineEdit,
                    [index]: !lineEdit[index],
                });
            }

            if (purpose === "delete") {
                setLineDelete({
                    ...lineDelete,
                    [index]: !lineDelete[index],
                });
            }

            if (action === "cancel") {
                setUpdatedEnd();
                setUpdatedStart();
            }

            if (action === "confirm") {
                if (purpose === "edit") {
                    editLog(index);
                } else if (purpose === "delete") {
                    deleteEntry(index);
                }
            }
        };
    }

    function logStart() {
        const newLogs = logs ? [...logs] : [];
        newLogs.unshift({ start: Date.now() });
        setLogs(newLogs);
    }

    function logEnd() {
        const newLogs = [...logs];
        newLogs[0].end = Date.now();
        setLogs(newLogs);
    }

    function deleteEntry(index) {
        const newLogs = [...logs];
        newLogs.splice(index, 1);
        setLogs(newLogs);
    }

    function editLog(index) {
        const newStart = updatedStart ? new Date(updatedStart) : false;
        const newEnd = updatedEnd ? new Date(updatedEnd) : false;
        const newLogs = [...logs];
        if (newStart) {
            newLogs[index].start = newStart.valueOf();
        }
        if (newEnd) {
            newLogs[index].end = newEnd.valueOf();
        }

        setLogs(newLogs);
    }

    const startButton = (
        <button className="start-stop" onClick={logStart}>
            <p>🟢</p>
            <h3>Starte eine neue Zeiterfassung</h3>
        </button>
    );
    const endButton = (
        <button className="start-stop" onClick={logEnd}>
            <p>🛑</p>
            <h3>Beende die aktuelle Zeiterfassung</h3>
        </button>
    );

    return (
        <div className="sections">
            <div>
                {(!logs || !logs.length) && startButton}
                {logs && logs[0]?.end && startButton}
                {logs && logs[0]?.start && !logs[0]?.end && endButton}
            </div>
            <h3>Bisher erfasste Zeiten</h3>
            <div className="times-table">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Funktionen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs &&
                            logs.map((log, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1})</td>
                                        <td>
                                            <DateInTable
                                                editMode={lineEdit[i]}
                                                loggedTime={log.start}
                                                editedTime={setUpdatedStart}
                                            />
                                        </td>
                                        <td>
                                            <DateInTable
                                                editMode={lineEdit[i]}
                                                loggedTime={log.end}
                                                editedTime={setUpdatedEnd}
                                            />
                                        </td>
                                        <td>
                                            <EditTimesButton
                                                purpose="edit"
                                                toggleBlocks={toggleBlocks(
                                                    i,
                                                    "edit"
                                                )}
                                                editMode={lineEdit[i]}
                                                disabled={blockOtherEdits}
                                            />
                                        </td>
                                        <td>
                                            <EditTimesButton
                                                purpose="delete"
                                                toggleBlocks={toggleBlocks(
                                                    i,
                                                    "delete"
                                                )}
                                                editMode={lineDelete[i]}
                                                disabled={blockOtherEdits}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                {!logs && noData}
            </div>
        </div>
    );
}
