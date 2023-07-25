import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import CustomRoutes from '../../constants/routes';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform registration logic here, such as making an API call
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Password:', password);
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
      </form>
      <Typography align="center" gutterBottom>
        Already registered? login Here
      </Typography>
      <Link to={CustomRoutes.login}>
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
