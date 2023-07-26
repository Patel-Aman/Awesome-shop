import React from 'react';
import './index.scss';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
} from '@material-ui/core';
import { Outlet, Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Awesome Shop</Typography>
          <Button color="inherit" component={Link} to="/login/">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;
