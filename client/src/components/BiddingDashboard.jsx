import React from "react";
import { useState } from "react";
import { Typography, Button, Divider } from "@mui/material";
import BasicTable from "./MuiTable";
import AddCourseModal from "./AddCourseModal";
import BiddingTable from "./BiddingTable";

function BiddingDashboard({creditScore}) {
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

    const [isAddCourseModalOpen, setAddCourseModalOpen] = useState(false);

    // For AddCourseModal
    const closePopup = () => {
        setAddCourseModalOpen(false);
    };
    const openPopup = () => {
        setAddCourseModalOpen(true);
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
            </div>

            {/* Module Bidding Form */}
            <div className="bg-white-200 p-16 h-full w-full">
                <div className="p-4">
                    <Typography
                        variant="h4"
                        component="div"
                        textAlign="center"
                        bgcolor={"lightgrey"}
                    >
                        FORM FOR THE MODULE BIDDING: TO BE ADDED
                    </Typography>
                </div>
                {/* <CourseForm/> */}
                <Button onClick={openPopup}>Add Courses</Button>
                <AddCourseModal
                    isOpen={isAddCourseModalOpen}
                    handleClose={closePopup}
                    courseList={bdeList}
                    setCourseList={setBdeList}
                    searchingBde={false} //TODO: Need to change when theres BDE available
                />
                <Divider />
                <BiddingTable
                    bdeList={bdeList}
                    setBdeList={setBdeList}
                    resultsList={resultsList}
                    setResultsList={setResultsList}
                    pointList={pointList}
                    setPointList={setPointList}
                    creditScore={creditScore}
                />
            </div>
        </div>
    );
}

export default BiddingDashboard;
