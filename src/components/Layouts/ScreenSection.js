import React from 'react';
import useStyles from './ScreenSection.styles';

const ScreenSection = ({ children }) => {
  const { classes } = useStyles();

  return <div className={classes.screen}>{children}</div>;
};

export default ScreenSection;
