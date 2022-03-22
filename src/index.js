import ReactDOM from 'react-dom';
import React from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { MantineProvider, Global } from '@mantine/core';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Account from './Pages/Account/Account';
import Calculator from './Pages/Calculator/Calculator';
import AppSection from './components/Layouts/AppSection';
import theme from './styles/theme';
import components from './styles/components';
import global from './styles/global';
// import logo from './logo.svg';
// import strongNodeAbi from './strongNodeAbi.json';
// import playmateNodeAbi from './playmateNodeAbi.json';
// import thorNodeAbi from './thorNodeAbi.json';
// import nodacAbi from './nodacAbi.json';
// import wavaxAbi from './wavaxAbi.json';
// import { ethers } from 'ethers';
// import { useState, useEffect } from 'react';
// import Axios from 'axios';
// import Oto from './Pages/Oto';
// import Base from "./Pages/Base";
// import OtoClassBased from './Pages/OtoClassBased';
// import NavigationBar from './NavigationBar';
// import Content from './Pages/Content';
// import Home from './Pages/Home';

const App = () => {
  return (
    <>
      <MantineProvider theme={theme} styles={components} withNormalizeCSS>
        <Global styles={global} />
        <Router>
          <AppSection>
            <Navbar />
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/account" element={<Account />} />
              <Route path="/calculator" element={<Calculator />} />
              {/* <Route path="/" exact element={<Home />} />
              <Route path="/oto" element={<Oto />} />
              <Route path="/otoclass" element={<OtoClassBased />} />
              <Route path="/content" element={<Content />} /> */}
            </Routes>
          </AppSection>
        </Router>
      </MantineProvider>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
