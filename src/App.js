import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { MantineProvider, Global } from '@mantine/core';
import { EtherContextProvider } from './context/EtherContext';
import { AnimatePresence } from 'framer-motion';
import PublicWrapper from './components/Router/PublicWrapper';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Account from './Pages/Account/Account';
import Calculator from './Pages/Calculator/Calculator';
import AppSection from './components/Layouts/AppSection';
import theme from './styles/theme';
import components from './styles/components';
import global from './styles/global';

const App = () => {
  const location = useLocation();

  return (
    <>
      <MantineProvider theme={theme} styles={components} withNormalizeCSS>
        <Global styles={global} />
        <EtherContextProvider>
          <AppSection>
            <Navbar />
            <AnimatePresence exitBeforeEnter>
              <Routes key={location.pathname} location={location}>
                <Route element={<PublicWrapper />}>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/calculator" element={<Calculator />} />
                </Route>
              </Routes>
            </AnimatePresence>
          </AppSection>
        </EtherContextProvider>
      </MantineProvider>
    </>
  );
};

export default App;
