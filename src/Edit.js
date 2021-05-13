import { Fragment, useEffect, useState } from "react";
import { format, formatISO } from "date-fns";

export default function Edit(props) {
    const [logs, setLogs] = useState();
    const [lineEdit, setLineEdit] = useState({});
    const [lineDelete, setLineDelete] = useState({});
    const [blockOtherEdits, setBlockOtherEdits] = useState(false);
    const [updatedStart, setUpdatedStart] = useState();
    const [updatedEnd, setUpdatedEnd] = useState();

    useEffect(() => {
        try {
            setLogs(JSON.parse(localStorage.getItem("timeLogs"))[props.user]);
        } catch (error) {
            console.log("could not read LS:", error.message);
        }
    }, [props.user]);

    useEffect(() => {
        try {
            const prevStorage = JSON.parse(localStorage.getItem("timeLogs"));
            prevStorage[props.user] = logs;
            localStorage.setItem("timeLogs", JSON.stringify(prevStorage));
        } catch (error) {
            console.log("could not access LS:", error.message);
        }
    }, [props.user, logs]);

    const noData = <p>No previous entries found</p>;

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

    const startButton = <div onClick={logStart}>START a new log</div>;
    const endButton = <div onClick={logEnd}>End current log</div>;

    return (
        <div>
            <div>
                <div>
                    {(!logs || !logs.length) && startButton}
                    {logs && logs[0]?.end && startButton}
                    {logs && logs[0]?.start && !logs[0]?.end && endButton}
                </div>
                <h4>previous logs</h4>
                <table>
                    <thead>
                        <tr>
                            <td>Index</td>
                            <td>Start</td>
                            <td>End</td>
                            <td>Funktionen</td>
                        </tr>
                    </thead>
                    <tbody>
                        {logs &&
                            logs.map((log, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i}</td>
                                        <td>
                                            {!lineEdit[i] &&
                                                format(
                                                    log.start,
                                                    "dd.MM.yyyy', um 'HH:mm' Uhr'"
                                                )}
                                            {lineEdit[i] && (
                                                <input
                                                    type="datetime-local"
                                                    name="start"
                                                    value={format(
                                                        log.start,
                                                        "yyy-MM-dd'T'HH:mm"
                                                    )}
                                                    onChange={(e) => {
                                                        setUpdatedStart(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            )}
                                        </td>
                                        <td>
                                            {!lineEdit[i] &&
                                                log.end &&
                                                format(
                                                    log.end,
                                                    "dd.MM.yyyy', um 'HH:mm' Uhr'"
                                                )}
                                            {lineEdit[i] && log.end && (
                                                <input
                                                    type="datetime-local"
                                                    name="start"
                                                    value={format(
                                                        log.end,
                                                        "yyy-MM-dd'T'HH:mm"
                                                    )}
                                                    onChange={(e) => {
                                                        setUpdatedEnd(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            )}
                                        </td>
                                        <td>
                                            {!lineEdit[i] && (
                                                <button
                                                    disabled={blockOtherEdits}
                                                    onClick={() => {
                                                        setLineEdit({
                                                            ...lineEdit,
                                                            [i]: true,
                                                        });
                                                        setBlockOtherEdits(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    Bearbeiten
                                                </button>
                                            )}
                                            {lineEdit[i] && (
                                                <Fragment>
                                                    <button
                                                        onClick={() => {
                                                            setLineEdit({
                                                                ...lineEdit,
                                                                [i]: false,
                                                            });
                                                            setBlockOtherEdits(
                                                                false
                                                            );
                                                            setUpdatedEnd();
                                                            setUpdatedStart();
                                                        }}
                                                    >
                                                        {" "}
                                                        Abbrechen
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setBlockOtherEdits(
                                                                false
                                                            );
                                                            setLineEdit({
                                                                ...lineEdit,
                                                                [i]: false,
                                                            });
                                                            editLog(i);
                                                        }}
                                                    >
                                                        Speichern
                                                    </button>
                                                </Fragment>
                                            )}
                                        </td>
                                        <td>
                                            {!lineDelete[i] && (
                                                <button
                                                    disabled={blockOtherEdits}
                                                    onClick={() => {
                                                        setLineDelete({
                                                            ...lineDelete,
                                                            [i]: true,
                                                        });
                                                        setBlockOtherEdits(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    Löschen
                                                </button>
                                            )}
                                            {lineDelete[i] && (
                                                <Fragment>
                                                    <button
                                                        onClick={() => {
                                                            setLineDelete({
                                                                ...lineDelete,
                                                                [i]: false,
                                                            });
                                                            setBlockOtherEdits(
                                                                false
                                                            );
                                                        }}
                                                    >
                                                        Abbrechen
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            // TODO edit and save!
                                                            setBlockOtherEdits(
                                                                false
                                                            );
                                                            setLineDelete({
                                                                ...lineDelete,
                                                                [i]: false,
                                                            });
                                                            deleteEntry(i);
                                                        }}
                                                    >
                                                        Löschen
                                                    </button>
                                                </Fragment>
                                            )}
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

// TODO (1) Erstellen Sie ein Formular zum Erfassen von Arbeitszeiten. Das kann entweder als „Start / Stopp“-Knopf zum Tracken eines Logs oder über ein Formular mit Start-Zeit und End-Zeit geschehen.
