import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform registration logic here, such as making an API call

    const registerData = {
      username: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
    };

    fetch('http://localhost:3000/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Check if registration was successful
        if (data.success) {
          // Handle successful registration
          console.log('User registered:');
        } else {
          // Handle registration error
          setErrorMessage(data.message);
        }
      })
      .catch((error) => {
        console.error('Error registering:', error);
        setErrorMessage(
          'An error occurred while registering. Please try again later.',
        );
      });

    // Reset the form
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Last Name"
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
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
          Register
        </Button>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      </form>
      <Typography align="center" gutterBottom>
        Already registered? login Here
      </Typography>
      <Link to="/login/">
        <Box textAlign="center">
          <Button variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </Link>
    </Container>
  );
};

export default RegisterPage;
