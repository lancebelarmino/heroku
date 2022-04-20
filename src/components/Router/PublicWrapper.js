import React, { useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import EtherContext from '../../context/EtherContext';
import Spinner from '../Spinner/Spinner';

const PublicWrapper = () => {
  const { isLoading } = useContext(EtherContext);
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      {isLoading ? (
        <Spinner key="spinner" />
      ) : (
        <Outlet key={location.pathname} state={{ from: location }} />
      )}
    </AnimatePresence>
  );
};

export default PublicWrapper;
