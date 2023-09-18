import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
} from '@mui/material';
import './LoginPage.css';
import Form from '../../components/LoginForm'

function LoginPage() {

  const handleForgotPassword = () => {
    // not crucial feature
    console.log('Forgot Password clicked');
  };

  return (
    <div className="login-container">
      <Paper elevation={3} className="login-form">
        <Typography variant="h5" component="div" gutterBottom>
          Login
        </Typography>
        <Form />

        {/* "Forgot Password" link */}
        <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
          <Link onClick={handleForgotPassword} style={{ cursor: 'pointer' }}>
            Forgot Password?
          </Link>
        </Typography>
      </Paper>
    </div>
  );
}

export default LoginPage;
