import React, { useEffect } from "react";
import "./BallotPage.css";
import BiddingDashboard from "../../components/BiddingDashboard";
import { useState } from "react";
import { useSelector } from "react-redux";
import BasicTable from "../../components/MuiTable";
import { Typography } from "@mui/material";

function BallotPage() {
    let user = useSelector((state) => state.user);
    const testData = [{
        "name":user.name,
        "year":user.year,
        "modulesTaken":((user.modulesTaken.length)*3).toString(),
        "credit_score": 100 //user.credit,
    }]

    // const testData = [
    //     {
    //         name: "testname",
    //         year: "testyear",
    //         modulesTaken: "33",
    //         credit_score: "100",
    //     },
    // ];

    const eventData = [
        {
            eventName: "Round 1 bidding",
            startDate: "2023-11-01",
            endDate: "2023-11-03",
        },
    ];
    

    return (
        <div className="pt-32 flex flex-row justify-around h-screen w-screen">
            {/* Left hand side */}
            <div className="flex-auto w-64">
                <div className="flex flex-col">
                    <div className="bg-white-200 p-16 h-full w-full">
                        <div className="p-4">
                            <Typography
                                variant="h4"
                                component="div"
                                textAlign="center"
                                bgcolor={"lightgrey"}
                            >
                                Student Information
                            </Typography>
                        </div>
                        <BasicTable
                            headers={[
                                "name",
                                "year",
                                "modulesTaken",
                                "credit_score",
                            ]}
                            rows={testData}
                        />
                    </div>
                    <div className="bg-white-200 p-16 h-full w-full">
                        <div className="p-4">
                            <Typography
                                variant="h4"
                                component="div"
                                textAlign="center"
                                bgcolor={"lightgrey"}
                            >
                                Bidding dates:
                            </Typography>
                        </div>
                        <BasicTable
                            headers={["eventName", "startDate", "endDate"]}
                            rows={eventData}
                        />
                    </div>
                </div>
            </div>

            {/* Right hand side */}
            <div className="flex-auto w-128">
                <BiddingDashboard creditScore={parseInt(testData[0].credit_score, 10)}/>
            </div>
        </div>
    );
}

export default BallotPage;
