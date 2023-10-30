import React from 'react'
import { useState } from 'react';
import { Typography, Button, Divider } from '@mui/material'
import BasicTable from './MuiTable'
import AddCourseModal from "./AddCourseModal"
import BiddingTable from './BiddingTable';


function BiddingDashboard() {
    const [bdeList, setBdeList] = useState([]);
    const [resultsList, setResultsList] = useState([]);
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
                            headers={["courseCode", "courseName", "creditsAllocated", "status"]}
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
                            setCouseList={setBdeList}
                        />
                        <Divider/>
                        <BiddingTable
                            bdeList={[
                                {
                                    courseCode: "SC1001",
                                    courseName: "BDE Mod",
                                    creditsAllocated: "20",
                                    status: "Awaiting resultsList",
                                },
                                {
                                    courseCode: "SC1002",
                                    courseName: "Another BDE Mod",
                                    creditsAllocated: "23",
                                    status: "Awaiting resultsList",
                                },
                            ]}
                            setBdeList={setBdeList}
                            resultsList={resultsList}
                            setResultsList={setResultsList}
                        />

                    </div>
                </div>
  )
}

export default BiddingDashboard

