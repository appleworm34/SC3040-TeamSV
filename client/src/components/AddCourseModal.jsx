import React from 'react';
import { Modal, Paper, Typography, Button, Box, fabClasses } from '@mui/material';
import { useState } from 'react';
import CourseList from './CourseList';
import { ArrowBack } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const AddCourseModal = ({ isOpen, handleClose, children, courseList, setCourseList }) => {
  const [showCourseInfo, setShowCourseInfo] = useState(false);
  const [courseInfo, setCourseInfo] = useState({});
  const user = useSelector((state) => state.user);
  const [searchingBde, setSearchingBde] = useState(false);

  // const patchModulesAdded = async () => {
  //   const response = await fetch(
  //     `http://localhost:3001/user/add/${user._id}/${courseInfo._id}`,
  //     {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const data = await response.json();
  // };

  const handleAddCourseClick = () => {
    // Check if the course is already in the courseList
    const isCourseInList = courseList.length > 0 ? courseList.some(
      (existingCourse) => existingCourse._id === courseInfo._id
    ) : false;

    if (!isCourseInList) {
      // If the course is not in the list, add it
      const updatedCourseList = [...courseList, courseInfo];
      setCourseList(updatedCourseList);
    }
    // patchModulesAdded();
    setShowCourseInfo(false);
    // Close the modal
    handleClose();
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '800px',
    bgcolor: 'white',
    borderRadius: '8px',
    overflowY: 'auto',
    maxHeight: '80vh',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  };

  const backButtonStyle = {
    marginLeft: '-16px', // align to the left
  };

  const addCourseButtonContainerStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const contentStyle = {
    padding: '32px',
    paddingBottom: '32px',
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div style={modalStyle}>
        <Paper>
          {showCourseInfo ? (
            <Box style={contentStyle}>
              <Box style={headerStyle}>
                <Button onClick={() => setShowCourseInfo(false)} style={backButtonStyle}>
                  <ArrowBack />
                </Button>
                <Typography variant="h6">Course Info</Typography>
                <Box style={addCourseButtonContainerStyle}>
                  <Button onClick={handleAddCourseClick} variant="contained" color="primary">
                    Add
                  </Button>
                </Box>
              </Box>
              <Typography variant="h6" gutterBottom>
                {courseInfo.courseCode}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {courseInfo.courseName}
              </Typography>
              <Typography>{courseInfo.desc}</Typography>
            </Box>
          ) : (
            <div style={contentStyle}>
              {children}
              <CourseList
                setShowCourseInfo={setShowCourseInfo}
                setCourseList={setCourseList}
                setCourseInfo={setCourseInfo}
                searchingBde={searchingBde}
              />
            </div>
          )}
        </Paper>
      </div>
    </Modal>
  );
};

export default AddCourseModal;
