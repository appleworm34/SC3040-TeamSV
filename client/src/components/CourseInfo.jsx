import { Box, Typography } from "@mui/material";

const CourseInfo = ({ id, courseCode, courseName, setShowCourseInfo, setCourseInfo }) => {

  const getCourse = async () => {
    const response = await fetch(
      `http://localhost:3001/course/${id}`,
      {
        method: "GET"
      }
    )

    const data = await response.json()
    return data
  }
  
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" justifyContent="start" alignItems="center" gap="1rem">
        <Box
          onClick={() => {
            // handle click maybe open up a popup that displays all info
            setShowCourseInfo(true)
            getCourse().then((data) => {
              setCourseInfo(data)
            })
            .catch((error) => {
              console.error(error)
            })
          }}
        >
          <Typography
            fontWeight="500"
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            {courseCode + " " + courseName}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default CourseInfo