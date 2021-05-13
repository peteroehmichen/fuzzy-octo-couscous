import { Fragment, useEffect, useState } from "react";
import { format } from "date-fns";

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
