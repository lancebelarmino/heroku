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
// import Oto from './Pages/Oto';
// import OtoClassBased from './Pages/OtoClassBased';
// import Content from './Pages/Content';
// import Base from './Pages/Base';

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
              {/* <Route path="/oto" element={<Oto />} />
              <Route path="/otoclass" element={<OtoClassBased />} />
              <Route path="/content" element={<Content />} />
              <Route path="/base" element={<Base />} /> */}
            </Routes>
          </AppSection>
        </Router>
      </MantineProvider>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
