/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import RegisterPage from './components/Register';
import LoginPage from './components/Login';
import Layout from './components/Layout';
import HomePage from './components/Home';
import WelcomePage from './components/Welcome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login/" element={<LoginPage />} />
          <Route path="register/" element={<RegisterPage />} />
          <Route
            path="welcome/"
            element={<WelcomePage username="Aman Patel" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
