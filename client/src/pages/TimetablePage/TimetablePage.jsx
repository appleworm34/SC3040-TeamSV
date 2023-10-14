import React from "react";
import { Box, Typography } from "@mui/material";
import "./TimetablePage.css";
import Timetable from "../../components/Timetable";

// can update based on what courses user adds
const courses = [
    {
      "courseCode": "SP0062", 
      "courseName": "SCIENCE & TECHNOLOGY FOR HUMANITY", 
      "courseNumOfAU": "3.0 AU", 
      "indexes": 
        [{
          "indexNo": "22127", 
          "lessons": 
            [{
              "type": "SEM", 
              "group": "S1", 
              "day": "WED", 
              "time": "1430-1620", 
              "venue": "LHS-TR+36", 
              "remarks": ""
            }]
          }, 
          {
          "indexNo": "22128", 
          "lessons": 
            [{
              "type": "SEM", 
              "group": "S2", 
              "day": "WED", 
              "time": "1730-1920", 
              "venue": "LHS-TR+35", 
              "remarks": ""
            }]
        }]
    },
    {
      "courseCode": "SP0061", 
      "courseName": "SCIENCE & TECHNOLOGY FOR HUMANITY", 
      "courseNumOfAU": "3.0 AU", 
      "indexes": 
        [{
          "indexNo": "22127", 
          "lessons": 
            [{
              "type": "SEM", 
              "group": "S1", 
              "day": "WED", 
              "time": "1430-1620", 
              "venue": "LHS-TR+36", 
              "remarks": ""
            }]
          }, 
          {
          "indexNo": "22128", 
          "lessons": 
            [{
              "type": "SEM", 
              "group": "S2", 
              "day": "WED", 
              "time": "1730-1920", 
              "venue": "LHS-TR+35", 
              "remarks": ""
            }]
        }]
    }
]

function TimetablePage() {
    return (
        <Box marginTop={"75px"}>
            <Timetable courseList={courses}/>
        </Box>

    );
}

export default TimetablePage;
