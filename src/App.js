import "./App.css";
import Users from "./Users";
import { useState } from "react";
import InnerFrame from "./InnerFrame";
import Edit from "./Edit";
import Summary from "./Summary";

function App() {
    const [name, setName] = useState("");

    const withUserNavigation = (
        <div>
            Current User: {name}{" "}
            <div
                onClick={() => {
                    setName(false);
                }}
            >
                Change User
            </div>
        </div>
    );

    return (
        <div>
            {!name && <Users selectName={setName} />}
            {name && withUserNavigation}
            {name && (
                <InnerFrame>
                    <Summary label="view Statistics" user={name} />
                    <Edit label="edit / new" user={name} />
                </InnerFrame>
            )}
        </div>
    );
}

export default App;
