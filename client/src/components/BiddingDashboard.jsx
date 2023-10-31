import React from "react";
import { useState } from "react";
import { Typography, Button, Divider, Chip } from "@mui/material";
import BasicTable from "./MuiTable";
        import BiddingTable from "./BiddingTable";

function BiddingDashboard({ creditScore }) {
    const [bdeList, setBdeList] = useState([
        // {
        //     courseCode: "SC1001",
        //     courseName: "BDE Mod",
        //     creditsAllocated: "2",
        //     status: "Awaiting resultsList",
        // },
        // {
        //     courseCode: "SC1002",
        //     courseName: "Another BDE Mod",
        //     creditsAllocated: "2",
        //     status: "Awaiting resultsList",
        // },
    ]);
    const [resultsList, setResultsList] = useState([
        // {
        //     courseCode: "SC1001",
        //     courseName: "BDE Mod",
        //     creditsAllocated: "2",
        //     status: "Awaiting resultsList",
        // },
        // {
        //     courseCode: "SC1002",
        //     courseName: "Another BDE Mod",
        //     creditsAllocated: "2",
        //     status: "Awaiting resultsList",
        // },
    ]);
    const [pointList, setPointList] = useState([
        // {
        //     courseCode: "SC1001",
        //     points: 2,
        // },
        // {
        //     courseCode: "SC1002",
        //     points: 2,
        // },
    ]);
    const [creditAllocationValidity, setCreditAllocationValidity] =
        useState(true);

    const [isEditCourseDialogOpen, setIsEditCourseDialogOpen] = useState(false);


    const handleOpenEditCourseDialog = () => {
        setIsEditCourseDialogOpen(true);
    };
    const handleCloseEditCourseDialog = () => {
        setIsEditCourseDialogOpen(false);
    };
    return (
        <div className="flex flex-col">

            
            {/* results tab */}
            <div className="bg-white-200 p-16 h-full w-full">
                <div className="p-4">
                    <Typography
                        variant="h4"
                        component="div"
                        textAlign="center"
                        bgcolor={"lightgrey"}
                    >
                        Results
                    </Typography>
                </div>
                <BasicTable
                    headers={[
                        "courseCode",
                        "courseName",
                        "creditsAllocated",
                        "status",
                    ]}
                    rows={resultsList}
                />
                <div className="flex justify-center pt-12">
                    <Button onClick={handleOpenEditCourseDialog}> 
                        Click to edit course
                    </Button>
                </div>
                <Divider/>
            </div>

            {/* Module Bidding Form */}
            <div className="bg-white-200 h-full w-full">
                <BiddingTable
                    bdeList={bdeList}
                    setBdeList={setBdeList}
                    resultsList={resultsList}
                    setResultsList={setResultsList}
                    pointList={pointList}
                    setPointList={setPointList}
                    creditScore={creditScore}
                    creditAllocationValidity={creditAllocationValidity}
                    setCreditAllocationValidity={setCreditAllocationValidity}
                    handleCloseEditCourseDialog={handleCloseEditCourseDialog}
                    isEditCourseDialogOpen={isEditCourseDialogOpen}

                />

            </div>
        </div>
    );
}

export default BiddingDashboard;
