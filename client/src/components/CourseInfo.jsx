import { Box, Typography } from "@mui/material";

const CourseInfo = ({ id, courseCode, courseName }) => {
  // const [course, setCourse] = useState([])

  // const getCourse = async () => {
  //   const response = await fetch(
  //     `https://localhost:3001/courses/${id}`,
  //     {
  //       method: "GET"
  //     }
  //   )

  //   const data = response.json()
  // }

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" justifyContent="start" alignItems="center" gap="1rem">
        <Box
          onClick={() => {
            // handle click maybe open up a popup that displays all info
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