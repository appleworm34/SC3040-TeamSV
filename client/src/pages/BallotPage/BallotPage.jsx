import React from "react";
import "./BallotPage.css";
import DropdownModuleSearchBox from "../../components/DropdownModuleSearchBox";
import { useState } from "react";
import { useSelector } from "react-redux";
import MuiTable from "../../components/MuiTable";
import { Typography } from "@mui/material";

function BallotPage() {
    let user = useSelector((state) => state.user);
    // const testData = {
    //     "name":user.name,
    //     "year":user.year,
    //     "modulesTaken":(length(user.modulesTaken)*3).toString(),
    //     "credit_score": 100
    // }

    const testData = [
        {
            name: "testname",
            year: "testyear",
            modulesTaken: "33",
            credit_score: "100",
        },
    ];

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
        <div className="pt-32 flex flex-row justify-around h-screen w-screen">
            {/* Left hand side */}
            <div className="flex-auto w-64">
                <div className="flex flex-col">
                    <div className="bg-white-200 h-full w-full">
                        <div className="p-4">
                            <Typography
                                variant="h4"
                                component="div"
                                textAlign="center"
                            >
                                Student Information
                            </Typography>
                        </div>
                        <MuiTable
                            headers={[
                                "name",
                                "year",
                                "modulesTaken",
                                "credit_score",
                            ]}
                            rows={testData}
                        />
                    </div>
                    <div className="bg-white-200 pt-32 h-full w-full">
                        <div className="p-4">
                            <Typography
                                variant="h4"
                                component="div"
                                textAlign="center"
                            >
                                Bidding dates:
                            </Typography>
                        </div>
                        <MuiTable
                            headers={["eventName", "startDate", "endDate"]}
                            rows={eventData}
                        />
                    </div>
                </div>
            </div>



            {/* Right hand side */}
            <div className="flex-auto w-128">
                <div className="flex flex-col">
                    <div className="bg-white-200 h-full w-full">
                        <div className="p-4">
                            <Typography
                                variant="h4"
                                component="div"
                                textAlign="center"
                            >
                                Results
                            </Typography>
                        </div>
                        <MuiTable
                            headers={["eventName", "startDate", "endDate"]}
                            rows={eventData}
                        />
                    </div>
                    <div className="bg-white-200 pt-32 h-full w-full">
                        <div className="p-4">
                            <Typography
                                variant="h4"
                                component="div"
                                textAlign="center"
                            >
                                FORM FOR THE MODULE BIDDING: TO BE ADDED
                            </Typography>
                        </div>
                        <MuiTable
                            headers={["eventName", "startDate", "endDate"]}
                            rows={eventData}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BallotPage;
