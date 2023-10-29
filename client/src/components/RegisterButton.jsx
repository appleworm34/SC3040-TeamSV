import React from 'react';
import Button from '@mui/material/Button';

const RegisterButton = ({ isValid, handleRegisterCourses }) => {
  return (
    <div className='mt-4'>
      {isValid ? (
        <Button sx={{width: "100%"}} variant="contained" color="success" onClick={handleRegisterCourses}>
          Register Courses
        </Button>
      ) : (
        <Button sx={{width: "100%"}} variant="contained" color="error" disabled>
          Register Courses
        </Button>
      )}
    </div>
  );
};

export default RegisterButton;
