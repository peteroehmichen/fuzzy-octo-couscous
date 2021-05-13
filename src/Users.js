import { useEffect, useState } from "react";

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
        <div>
            <div>
                <h2>Zeiterfassung</h2>
                <h4>please select your user</h4>
            </div>
            <div>
                <select
                    defaultValue="choose"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                >
                    <option disabled value="choose">
                        choose the User
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
                <p>or create a new User</p>
                <input
                    type="text"
                    name="newUser"
                    placeholder="enter a new name"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <div onClick={confirmName}>Submit</div>
            </div>
        </div>
    );
}

// TODO (0) Select User and maybe create a new user
