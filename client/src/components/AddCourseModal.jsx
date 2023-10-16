import React from 'react';
import { Modal, Paper, Typography, Button } from '@mui/material';
import { useState } from 'react';
import CourseList from './CourseList';

const AddCourseModal = ({ isOpen, handleClose, children }) => {
  const [showHi, setShowHi] = useState(false);

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
          {showHi ? (
            <Typography variant="h6">Hi</Typography>
          ) : (
            <div>
              {children}
              <CourseList />
            </div>
          )}
          {showHi && (
            <Button
              variant="contained"
              onClick={() => setShowHi(false)}
            >
              Back
            </Button>
          )}
        </Paper>
      </div>
    </Modal>
  );
};

export default AddCourseModal;
