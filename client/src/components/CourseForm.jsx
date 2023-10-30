import React from "react";
import { useState, useEffect } from "react";

function AllocatePoints(props) {
    return (
        <div className="allocate-points-box">
            <input
                className="search-box"
                type="number"
                placeholder="Allocate Points..."
                onChange={props.onPointsChange}
                value={props.points}
            />
        </div>
    );
}

function CourseForm({courseList}) {
    const maxResults = 3;
    const options = [
        "SC1001",
        "SC1002",
        "SC1003",
        "SC2004",
        "SC2005",
        "AD1102",
        "AC1301",
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const [points, setPoints] = useState();

    const handleInputChange = (e) => {
        const inputValue = e.target.value.toUpperCase();
        setSearchTerm(inputValue);
        const filtered = options.filter((option) =>
            option.toUpperCase().includes(inputValue)
        );
        setSearchResults(filtered.slice(0, maxResults));
    };

    const handleOptionSelect = (option) => {
        setSearchTerm(option);
        setSearchResults([]);
    };

    const handlePoints = (event) => {
        setPoints(event.target.value);
    };

    //edit here to get the 2 data values
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(searchTerm);
        console.log(points);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="dropdown-search-box">
                    <input
                        className="search-box"
                        type="text"
                        placeholder="Search options..."
                        onChange={handleInputChange}
                        value={searchTerm}
                    />
                    {searchResults.length > 0 && (
                        <ul className="dropdown-options">
                            {searchResults.map((option, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <AllocatePoints points={points} onPointsChange={handlePoints} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CourseForm;
