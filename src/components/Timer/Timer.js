import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import useStyles from './Timer.styles.js';

const Timer = () => {
  const { classes } = useStyles();

  const defaultDelay = 900000;
  const [countdownKey, setCountdownKey] = useState(1);
  const [data, setData] = useState({ date: Date.now(), delay: defaultDelay });

  useEffect(() => {
    const savedDate = localStorage.getItem('end_date');

    if (savedDate != null && !isNaN(savedDate)) {
      const currentTime = Date.now();
      const delay = parseInt(savedDate, 10) - currentTime;

      if (delay > defaultDelay) {
        if (localStorage.getItem('end_date').length > 0) {
          localStorage.removeItem('end_date');
        }
      } else {
        console.log('Setting', currentTime, delay);
        setData({ date: currentTime, delay: delay });
      }
    }
  }, []);

  return (
    <Countdown
      key={countdownKey}
      date={data.date + data.delay}
      renderer={({ minutes, seconds }) => {
        return (
          <span className={classes.timer}>
            {minutes}:{seconds}
          </span>
        );
      }}
      onStart={() => {
        if (localStorage.getItem('end_date') === null) {
          console.log('Set');
          localStorage.setItem('end_date', JSON.stringify(data.date + data.delay));
        }
      }}
      onComplete={() => {
        if (localStorage.getItem('end_date') != null) {
          localStorage.setItem('end_date', JSON.stringify(Date.now() + defaultDelay));
        }
        setData({ date: Date.now(), delay: defaultDelay });
        setCountdownKey((prevData) => prevData + 1);
      }}
    />
  );
};

export default Timer;