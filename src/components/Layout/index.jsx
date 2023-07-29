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
import CustomRoutes from '../../constants/routes';
import CustomImages from '../../constants/images';

const Layout = ({ children }) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Link to={CustomRoutes.home}>
            <img
              src={CustomImages.logo}
              alt="Logo"
              style={{ height: '60px', marginRight: '10px' }}
            />
          </Link>
          <Button color="inherit" component={Link} to={CustomRoutes.login}>
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
