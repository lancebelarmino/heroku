import React from 'react';
import useStyles from './Button.styles.js';

const Button = ({ children, type, icon: Icon, onClick: callback, className: styles }) => {
  const { classes } = useStyles();

  const clickHandler = () => {
    callback();
  };

  return (
    <button className={`${classes.btn} ${styles}`} type={type ? type : 'button'} onClick={clickHandler}>
      {Icon && <Icon className={classes.icon} />}
      <span>{children}</span>
    </button>
  );
};

export default Button;
