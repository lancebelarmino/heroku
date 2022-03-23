import React from 'react';
import { Text } from '@mantine/core';
import { ReactComponent as Secure } from '../../assets/screen-secure.svg';
import useStyles from './ConnectedMessage.styles.js';

const ConnectedMessage = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.connected}>
      <Text className={classes.connectedMessage} size="md">
        Wallet Connected
      </Text>
      <Secure />
    </div>
  );
};

export default ConnectedMessage;
