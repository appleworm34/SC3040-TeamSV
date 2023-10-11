import e from "cors";
import React from "react";
import { useState } from "react";

function RadioForm({ options, onRadioChange }) {
    const [selectedOption, setSelectedOption] = useState("");

    const handleRadioChange = (e) => {
        setSelectedOption(e.target.value);
        onRadioChange(selectedOption);
    };
    return (
        <div className="radioform_mods">
            {options.map((option, index) => (
                <label
                    key={index}
                    className={selectedOption === option ? "selected" : ""}
                >
                    <input
                        type="radio"
                        value={option}
                        checked={selectedOption === option}
                        onChange={handleRadioChange}
                    />
                    {option}
                </label>
            ))}
        </div>
    );
}

export default RadioForm;
