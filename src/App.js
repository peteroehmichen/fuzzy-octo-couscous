import Users from "./Users";
import { useState } from "react";
import InnerFrame from "./InnerFrame";
import Edit from "./Edit";
import Monthly from "./Monthly";
import Daily from "./Daily";

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
                    <Daily label="Arbeitszeiten pro Tag" user={name} />
                    <Monthly label="Arbeitszeiten pro Monat" user={name} />
                </InnerFrame>
            )}
        </div>
    );
}

export default App;
