import React, { useState, useEffect } from "react";
import "./ForumPage.css";
import DropdownModuleSearchBox from "../../components/DropdownModuleSearchBox";
import RadioForm from "../../components/Radioform";
import MuiCheckBox from "../../components/MuiCheckBox";

// For swapping of modules
function ForumPage() {
    const [ModToSwap, setModToSwap] = useState("");
    const [IndexToSwap, setIndexToSwap] = useState([])

    const onRadioChange = (value) => {
        setModToSwap(value);
        console.log("Selected module: ", ModToSwap);
    };

    const onCheckboxChange = (value) => {
        if (IndexToSwap.includes(value)) {
            setIndexToSwap(IndexToSwap.filter((option) => option!=value));
        } else {
            setIndexToSwap([...IndexToSwap, value]);
        }
        console.log("Selected indexes are ", IndexToSwap);
    }

    const exampleStudentModule = {
        "CC0001": ["10101", ["10102", "10103"], "Pending"],
        "MH1810": ["20202", ["20203", "20204"], "Pending"],
        "SP0061": ["30303", ["30301"], "Pending"]
    }

    return ( //TODO: Change into table format, where each entry is a new row element
        <div className="page"> 
            <section className="mod_information_section">
                <div className="mod_information">
                    <div className="course_code">
                        <h1> Course code </h1>
                        <h1> CC0001 </h1>
                    </div>
                    <div className="current_index">
                        <h1> Current Index </h1>
                        <h1> {exampleStudentModule.CC0001[0]} </h1>
                    </div>
                    <div className="desired_index">
                        <h1> Desired Index </h1>
                        <h1> {exampleStudentModule.CC0001[1]} </h1>
                    </div>
                    <div className="status">
                        <h1> Status </h1>
                        <h1> {exampleStudentModule.CC0001[2]} </h1>
                    </div>
                </div>
            </section>
            <section className="mod_swapping_section">
                <RadioForm
                    options={["SC1001", "SC1002", "SC1003", "AD1102", "AB1601"]} // TOOD: link to API call to current registered modules
                    onRadioChange={onRadioChange}
                    className="radioform_mods"
                />

                <MuiCheckBox
                    options={["10101", "10102", "10103"]} // TODO: link to API call to available indexes to module swap
                    onCheckboxChange={onCheckboxChange}
                    className="checkbox_index"
                />
            </section>
        </div>
    );
}

export default ForumPage;
