import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link, // Import the Link component
} from '@mui/material';
import './Login.css'; // Import the CSS file

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login logic here
    // For example, you can send a request to your server to validate credentials
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const handleForgotPassword = () => {
    // Add logic to handle the "Forgot Password" action
    console.log('Forgot Password clicked');
  };

  return (
    <div className="login-container">
      <Paper elevation={3} className="login-form">
        <Typography variant="h5" component="div" gutterBottom>
          Login
        </Typography>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          className="login-button"
        >
          Login
        </Button>
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

export default Login;
