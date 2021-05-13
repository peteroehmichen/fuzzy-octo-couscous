import { useState } from "react";

export default function InnerFrame(props) {
    const [activeTab, setActiveTab] = useState(props.children[0].props.label);
    const SelectActiveTab = (e) => {
        setActiveTab(e.target.innerText);
    };

    return (
        <div className="auth-nav-frame">
            <div className="tab-list">
                {props.children.map((tab, i) => {
                    return (
                        <div
                            className={`tab-list-item ${
                                activeTab === tab.props.label
                                    ? "tab-list-active"
                                    : ""
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
