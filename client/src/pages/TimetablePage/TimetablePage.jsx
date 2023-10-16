import React from "react";
import { Box, Typography } from "@mui/material";
import "./TimetablePage.css";
import Timetable from "../../components/Timetable";
import { useState } from "react";

// can update based on what courses user adds
const courses = [
    {
        "courseCode": "CC0001", 
        "courseName": "INQUIRY & COMMUNICATION IN AN INTERDISCIPLINARY WORLD", 
        "courseNumOfAU": "2.0 AU", 
        "indexes": 
            [{
                "indexNo": "82202", 
                "lessons": [{
                    "type": "TUT", "group": "T001", "day": "MON", "time": "0830-1020", "venue": "LHN-TR+22", "remarks": "Teaching Wk2-13"
                }]},
            {
                "indexNo": "82206", 
                "lessons": [{
                    "type": "TUT", "group": "T001", "day": "MON", "time": "0830-1020", "venue": "LHN-TR+22", "remarks": "Teaching Wk2-13"
                }]}, 
            {
                "indexNo": "82209", 
                "lessons": [{"type": "TUT", "group": "T002", "day": "MON", "time": "0830-1020", "venue": "LHN-TR+23", "remarks": "Teaching Wk2-13"
            }]}
        ]    
    },
    {
        "courseCode": "MH1810", 
        "courseName": "MATHEMATICS 1", 
        "courseNumOfAU": "3.0 AU", 
        "indexes": [{
            "indexNo": "10086", 
            "lessons": [{"type": "LEC/STUDIO", "group": "LE2", "day": "FRI", "time": "0830-1020", "venue": "LKC-LT", "remarks": ""}, {"type": "TUT", "group": "CSA", "day": "TUE", "time": "1030-1320", "venue": "TR+18", "remarks": "Teaching Wk2-13"}]}, 
            {"indexNo": "10087", 
            "lessons": [{"type": "LEC/STUDIO", "group": "LE2", "day": "FRI", "time": "0830-1020", "venue": "LKC-LT", "remarks": ""}, {"type": "TUT", "group": "CSB", "day": "TUE", "time": "1130-1220", "venue": "TR+15", "remarks": "Teaching Wk2-4"}, {"type": "TUT", "group": "CSB", "day": "TUE", "time": "1130-1220", "venue": "TR+18", "remarks": "Teaching Wk5-13"}]}]
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
    const [courseList, setCourseList] = useState([])

    return (
        <Box marginTop={"75px"}>
            <Timetable 
                courseList={courses}
                setCourseList={setCourseList}
            />
        </Box>

    );
}

export default TimetablePage;
