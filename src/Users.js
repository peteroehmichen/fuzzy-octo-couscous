import { Fragment, useEffect, useState } from "react";

export default function Users(props) {
    const [allUsers, setAllUsers] = useState([]);
    const [name, setName] = useState();

    useEffect(() => {
        try {
            const localData = JSON.parse(localStorage.getItem("timeLogs"));
            setAllUsers(Object.keys(localData));
        } catch (error) {
            console.log("No Data in Local Storage", error.message);
        }
    }, []);

    function confirmName() {
        try {
            if (!allUsers.includes(name)) {
                const storage =
                    JSON.parse(localStorage.getItem("timeLogs")) || {};
                storage[name] = null;
                localStorage.setItem("timeLogs", JSON.stringify(storage));
            }
            props.selectName(name);
        } catch (error) {
            console.log("received an error while updating LS:", error.message);
        }
    }

    return (
        <Fragment>
            <div className="title">
                <h1 data-testid="title">Zeiterfassung</h1>
                <h3>Bitte wähle einen Nutzer</h3>
            </div>
            <div className="user-body">
                <p>Bestehenden Nutzer auswählen:</p>
                <select
                    id="existing"
                    defaultValue="choose"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                >
                    <option disabled value="choose">
                        Bitte auswählen...
                    </option>
                    {allUsers &&
                        allUsers.map((user, i) => {
                            return (
                                <option value={user} key={i}>
                                    {user}
                                </option>
                            );
                        })}
                </select>
                <p>
                    Manuelle Eingabe oder neuen Nutzer erstellen
                    <br />
                    <i>(Keine Dopplungen erlaubt)</i>
                </p>
                <input
                    type="text"
                    name="newUser"
                    placeholder="Name"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <button onClick={confirmName} disabled={!name}>
                    Submit
                </button>
            </div>
        </Fragment>
    );
}
