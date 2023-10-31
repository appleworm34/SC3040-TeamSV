import { Box, Typography, TextField, CircularProgress, Button } from "@mui/material";
import CourseInfo from "./CourseInfo.jsx";
import { useEffect, useState } from "react";

const CourseList = ({ setShowCourseInfo, setCourseList, setCourseInfo, searchingBde }) => {
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState("") // Add search state
  const [isLoading, setIsLoading] = useState(false)

  const getAllCourses = async () => {
      const response = await fetch(
        `http://localhost:3001/course/`,
        {
          method: "GET"
        }
      )
  
      const data = await response.json()
      return data
  }

  const getBdeCourses = async () => {
    const response = await fetch(
      `http://localhost:3001/course/bde`,
      {
        method: "GET"
      }
    )

    const data = await response.json()
    return data
  }



  if (searchingBde) {
    // loading bde course list
    useEffect(() => {
      setIsLoading(true)
      getBdeCourses().then((data) => {
        setCourses(data)
        
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
      })
    }, [])

  } else {
    // loading normal course list
    useEffect(() => {
      setIsLoading(true)
      getAllCourses().then((data) => {
        setCourses(data)
        
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
      })
    }, [])
  }



  

  const courseComponent = courses.map((courses) => (
    <CourseInfo
      key = {courses._id}
      id = {courses._id}
      courseCode = {courses.courseCode}
      courseName = {courses.courseName}
      setShowCourseInfo = {setShowCourseInfo}
      setCourseInfo={setCourseInfo}
      
    />
    
  ))
    

  return (
    <Box justifyContent="center" alignItems="center">
      <TextField
        label="Search Courses"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: "1rem", width: "100%" }}
      />
      {isLoading ? 
        <Box 
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress /> 
        </Box>
        : 
        <Box>
          <Box display="flex" flexDirection="column" gap="1.5rem">
            {courseComponent
              .filter(
                (course) =>
                  course.props.courseCode
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  course.props.courseName.toLowerCase().includes(search.toLowerCase())
              )
              .map((filteredCourse) => filteredCourse)}
          </Box>
        </Box>
      }
    </Box>
  )
}

export default CourseList