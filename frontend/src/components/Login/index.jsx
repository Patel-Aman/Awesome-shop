import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from '@material-ui/core';
import './login.scss';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform sign-in logic here, such as making an API call
    const loginData = {
      username: username,
      password: password,
    };

    // api req and res for login
    fetch('http://localhost:3000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          // Handle successful login
          console.log('User logged in:');
        } else {
          // Handle login error
          setErrorMessage(data.message);
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        setErrorMessage(
          'An error occurred while logging in. Please try again later.',
        );
      });

    // Reset the form
    setUsername('');
    setPassword('');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Log In
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="username"
          type="username"
          value={username}
          onChange={handleUsernameChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Log In
        </Button>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      </form>
      <Typography align="center">Not registered? Register Here</Typography>
      <Link to="/register/">
        <Box textAlign="center">
          <Button variant="contained" color="primary">
            Register
          </Button>
        </Box>
      </Link>
    </Container>
  );
};

export default LoginPage;
