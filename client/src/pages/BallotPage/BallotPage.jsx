import React from "react";
import "./BallotPage.css";
import DropdownModuleSearchBox from "../../components/DropdownModuleSearchBox";
import { useState } from "react";
import { useSelector } from "react-redux";
import MuiTable from "../../components/MuiTable";

function BallotPage() {
    let user = useSelector((state) => state.user)
    // const testData = {
    //     "name":user.name,
    //     "year":user.year,
    //     "modulesTaken":(length(user.modulesTaken)*3).toString(),
    //     "credit_score": 100
    // }

    const testData = [
        {"name":"testname",
        "year":"testyear",
        "modulesTaken":"33",
        "credit_score": "100"}
    ]


    const [DesiredModules, setDesiredModules] = useState([]);
    const [Dates, setDates] = useState([]);

    const eventData = [
        {
            eventName: "Round 1 bidding",
            startDate: "2023-11-01",
            endDate: "2023-11-03",
        },
        {
            eventName: "Round 2 bidding",
            startDate: "2023-11-05",
            endDate: "2023-11-07",
        },
    ];
    
    return (
        <div className="h-screen w-screen pt-32 grid grid-cols-2 grid-rows-2">
            <div className="bg-gray-200 h-full w-full">
                <MuiTable
                    headers={["name", "year", "modulesTaken", "credit_score"]}
                    rows={testData}
                />
            </div>
            <div className="bg-gray-200 h-full w-full">
                <MuiTable
                    headers={["eventName", "startDate", "endDate"]}
                    rows={eventData}
                />
            </div>
            <div className="bg-gray-200 h-full w-full">
                <MuiTable
                    headers={["eventName", "startDate", "endDate"]}
                    rows={eventData}
                />
            </div>
            <div className="bg-gray-200 h-full w-full">
                <MuiTable
                    headers={["eventName", "startDate", "endDate"]}
                    rows={eventData}
                />
            </div>
        </div>
    );
}

export default BallotPage;

{
    /* <section className="student_info">
                <div className="student">
                    <div className="student_name">
                        <h1> Name: {exampleStudent.name} </h1>
                    </div>
                    <div className="year_of_study">
                        <h1> Current year of study: {exampleStudent.year} </h1>
                    </div>
                    <div className="semester">
                        <h1> Semester: {exampleStudent.semester} </h1>
                    </div>
                    <div className="credit_status">
                        <h1> Available credits: {exampleStudent.credit_score} </h1>
                    </div>
                </div>
            </section>
      <DropdownModuleSearchBox /> */
}
