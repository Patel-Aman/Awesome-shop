/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import RegisterPage from './components/Register';
import LoginPage from './components/Login';
import Layout from './components/Layout';
import HomePage from './components/Home';
import CustomRoutes from './constants/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={CustomRoutes.home} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={CustomRoutes.login} element={<LoginPage />} />
          <Route path={CustomRoutes.register} element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
