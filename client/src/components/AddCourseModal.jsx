import React from 'react';
import { Modal, Paper, Typography, Button, Box } from '@mui/material';
import { useState } from 'react';
import CourseList from './CourseList';
import { ArrowBack } from '@mui/icons-material';

const AddCourseModal = ({ isOpen, handleClose, children, courseList, setCourseList }) => {
  const [showCourseInfo, setShowCourseInfo] = useState(false)
  const [courseInfo, setCourseInfo] = useState({})

  const handleAddCourseClick = () => {
    // Check if the course is already in the courseList
    const isCourseInList = courseList.some(
      (existingCourse) => existingCourse._id === courseInfo._id
    );

    if (!isCourseInList) {
      // If the course is not in the list, add it
      const updatedCourseList = [...courseList, courseInfo];
      setCourseList(updatedCourseList);
    }

    // Close the modal
    handleClose();
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '1000px',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    overflowY: 'auto', // Make the content scrollable
    maxHeight: '80vh'
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div style={modalStyle}>
        <Paper style={{ padding: '16px' }}>
          {showCourseInfo ? (
            <Box>
              <Box display="flex" alignItems="center">
                <Button
                  onClick={() => setShowCourseInfo(false)}
                >
                  <ArrowBack />
                </Button>
                <Typography variant="h6">Course Info</Typography>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography sx={{ padding: "10px"}}variant="h6">{courseInfo.courseCode}</Typography>
                <Typography sx={{ padding: "10px"}}variant="h6">{courseInfo.courseName}</Typography>
                <Box sx={{width: "230px"}}></Box>
                <Button onClick={()=>{handleAddCourseClick()}}>Add</Button>
              </Box>
              <Typography>{courseInfo.desc}</Typography>
            </Box>
          ) : (
            <div>
              {children}
              <CourseList 
                setShowCourseInfo={setShowCourseInfo}
                setCourseList={setCourseList}
                setCourseInfo={setCourseInfo}
              />
            </div>
          )}
        </Paper>
      </div>
    </Modal>
  );
};

export default AddCourseModal;
