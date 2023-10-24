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

    const getUserAddedModules = async () => {
        const response = await fetch(
          `http://localhost:3001/user/${_id}/added_courses`,
          {
            method: "GET"
          }
        )
    
        const data = await response.json()
        return data
    }

    const getCourseList = async (courseIdList) => {
        const coursePromises = courseIdList.map(async (id) => {
            try {
                const response = await fetch(`http://localhost:3001/course/${id}`,
                {
                    method: "GET"
                });
                if (response.status === 200) {
                    const data = await response.json();
                    return data;
                } else {
                    throw new Error(`Failed to fetch course with ID ${id}. Status: ${response.status}`);
                }
            } catch (error) {
                console.error(error);
                return null;
            }
        });

        const courses = await Promise.all(coursePromises);
        const validCourses = courses.filter((course) => course !== null);
        return validCourses;
    }

    useEffect(() => { 
        if(_id) {   
            getUserAddedModules().then((data) => {
                // console.log(data)
                getCourseList(data).then((validCourses) => {
                    // console.log(validCourses)
                    setCourseList(validCourses)
                })
              })
              .catch((error) => {
                console.error(error)
              })
        }
    }, []);

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
