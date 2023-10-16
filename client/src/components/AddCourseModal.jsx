import React from 'react';
import { Modal, Paper, Typography, Button, Box } from '@mui/material';
import { useState } from 'react';
import CourseList from './CourseList';
import { ArrowBack } from '@mui/icons-material';

const AddCourseModal = ({ isOpen, handleClose, children, setCourseList }) => {
  const [showCourseInfo, setShowCourseInfo] = useState(false)
  const [courseInfo, setCourseInfo] = useState({})

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '400px',
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
              <Typography sx={{ padding: "10px"}}variant="h6">{courseInfo.courseCode}</Typography>
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
