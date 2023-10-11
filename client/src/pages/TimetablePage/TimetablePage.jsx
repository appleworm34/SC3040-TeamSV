import React from "react";
import "./TimetablePage.css";
import Timetable from "../../components/Timetable";

function TimetablePage() {
    return (
        <div className="mainContainer">
            <div className="leftColumn">
                <Timetable />
            </div>
            <div className="rightColumn">
              <h1> This is for the forms </h1>
            </div>
        </div>
    );
}

export default TimetablePage;
