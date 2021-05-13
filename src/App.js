import Users from "./Users";
import { useState } from "react";
import InnerFrame from "./InnerFrame";
import Edit from "./Edit";
import Summary from "./Summary";

function App() {
    const [name, setName] = useState("");

    const withUserNavigation = (
        <div className="inner-header">
            <div>
                <b>Aktiver Nutzer: {name}</b>
            </div>
            <div
                onClick={() => {
                    setName(false);
                }}
            >
                ❌
            </div>
        </div>
    );

    return (
        <div className="App">
            {!name && <Users selectName={setName} />}
            {name && withUserNavigation}
            {name && (
                <InnerFrame>
                    <Edit label="Zeiten hinzufügen / bearbeiten" user={name} />
                    <Summary
                        label="Arbeitszeiten pro Tag"
                        user={name}
                        mode="daily"
                    />
                    <Summary
                        label="Arbeitszeiten pro Monat"
                        user={name}
                        mode="monthly"
                    />
                </InnerFrame>
            )}
        </div>
    );
}

export default App;
