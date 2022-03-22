import React from 'react';
import useStyles from './AppSection.styles.js';

const AppSection = ({ children }) => {
  const { classes } = useStyles();

  return <div className={classes.app}>{children}</div>;
};

export default AppSection;
