import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import "./TimetablePage.css";
import Timetable from "../../components/Timetable";
import { useState } from "react";
import { useSelector } from "react-redux";

function TimetablePage() {
    const [courseList, setCourseList] = useState([]);
    // const [courseIdList, setCourseIdList] = useState([]);
    const {_id} = useSelector((state) => state.user) || "";

    // const getUserPlans = async () => {
    //     const response = await fetch(
    //       `http://localhost:3001/user/${_id}/plans`,
    //       {
    //         method: "GET"
    //       }
    //     )
    
    //     const data = await response.json()
    //     return data
    // }

    // const getCourseList = async (userDefaultPlan) => {
    //     const coursePromises = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:3001/course/`,
    //             {
    //                 method: "GET"
    //             });
    //             if (response.status === 200) {
    //                 const data = await response.json();
    //                 return data;
    //             } else {
    //                 throw new Error(`Failed to fetch courses. Status: ${response.status}`);
    //             }
    //         } catch (error) {
    //             console.error(error);
    //             return null;
    //         }
    //     };

    //     const courses = await new Promise(coursePromises);

    //     const validCourses = data.filter((course) => {
    //         return userDefaultPlan.some((planCourse) => planCourse.courseCode === course.courseCode);
    //     });

    //     return validCourses;
    // }

    // useEffect(() => { 
    //     if(_id) {   
    //         getUserPlans().then((data) => {
    //             console.log(data);
    //             getCourseList(data).then((validCourses) => {
    //                 // console.log(validCourses)
    //                 setCourseList(validCourses)
    //             })
    //           })
    //           .catch((error) => {
    //             console.error(error)
    //           })
    //     }
    // }, []);

    return (
        <Box marginTop={"75px"}>
            <Timetable 
                courseList={courseList}
                setCourseList={setCourseList}
            />
        </Box>

    );
}

export default TimetablePage;
