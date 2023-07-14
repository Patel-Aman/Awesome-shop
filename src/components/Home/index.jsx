import React from 'react';
import { Typography, Button, Container } from '@material-ui/core';

const HomePage = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to Awesome Shop!
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Explore our amazing collection of products.
      </Typography>
      <Button variant="contained" color="primary" fullWidth>
        Shop Now
      </Button>
    </Container>
  );
};

export default HomePage;
