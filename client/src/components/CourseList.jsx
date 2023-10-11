import { Box, Typography } from "@mui/material";
import CourseInfo from "./CourseInfo.jsx"
import { useEffect, useState } from "react";

const CourseList = () => {
  const [courses, setCourses] = useState([])

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

  useEffect(() => {
    getAllCourses().then((data) => {
      setCourses(data)
      // console.log(courses)
    })
    .catch((error) => {
      console.error(error)
    })
  }, [])

  const courseComponent = courses.map((courses) => (
    <CourseInfo
      key = {courses._id}
      id = {courses._id}
      courseCode = {courses.courseCode}
      courseName = {courses.courseName}
    />
  ))
    

  return (
    <Box justifyContent="center" alignItems="center">
      <Typography
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        All Courses
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {courseComponent}
      </Box>
    </Box>
  )
}

export default CourseList