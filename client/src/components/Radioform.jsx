import e from "cors";
import React from "react";
import { useState } from "react";

function RadioForm({ options, onRadioChange }) {
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleRadioChange = (e) => {
        const newValue = e.target.value;
        console.log("Radio form value changed to: ", selectedOption)
        setSelectedOption(newValue);
        onRadioChange(newValue);
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
            <h1 className="radioform"> Selected option is {selectedOption} </h1>
        </div>
    );
}

export default RadioForm;
