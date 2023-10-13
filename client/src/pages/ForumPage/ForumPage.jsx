import React, { useState, useEffect } from "react";
import "./ForumPage.css";
import DropdownModuleSearchBox from "../../components/DropdownModuleSearchBox";
import RadioForm from "../../components/Radioform";

// For swapping of modules
function ForumPage() {
    const [selectedRadioValue, setSelectedRadioValue] = useState("");

    const handleRadioChange = (value) => {
        setSelectedRadioValue(value);
    };
    return (
        <div className="page">
            <section className="mod_information_section">
                <div className="mod_information">
                    <div className="course_code">
                        <h1> Course code </h1>
                    </div>
                    <div className="current_index">
                        <h1> Current Index </h1>
                    </div>
                    <div className="desired_index">
                        <h1> Desired Index </h1>
                    </div>
                    <div className="status">
                        <h1> Status </h1>
                    </div>
                </div>
            </section>
            <DropdownModuleSearchBox />
            <section>
                <RadioForm
                    options={["SC1001", "SC1002", "SC1003", "AD1102", "AB1601"]}
                    onRadioChange={handleRadioChange}
                    className="radioform_mods"
                />
                <h1 className="radioform"> Selected option is {selectedRadioValue} </h1>
            </section>
        </div>
    );
}

export default ForumPage;
