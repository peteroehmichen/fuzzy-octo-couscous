import { useState } from "react";

export default function InnerFrame(props) {
    const [activeTab, setActiveTab] = useState(props.children[0].props.label);
    const SelectActiveTab = (e) => {
        setActiveTab(e.target.innerText);
    };

    return (
        <div className="frame">
            <div className="tabs">
                {props.children.map((tab, i) => {
                    return (
                        <div
                            className={`tab ${
                                activeTab === tab.props.label ? "active" : ""
                            }`}
                            key={i}
                            onClick={SelectActiveTab}
                        >
                            {tab.props.label}
                        </div>
                    );
                })}
            </div>
            {props.children.find((tab) => tab.props.label === activeTab)}
        </div>
    );
}
