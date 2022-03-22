import React from 'react';
import { Title, Text } from '@mantine/core';
import useStyles from './CardItem.styles.js';
import toCapitalize from '../../utils/toCapitalize.js';

const CardItem = ({ children, type, layout, data }) => {
  const { classes } = useStyles();

  const dynamicClass = toCapitalize(layout);
  const itemClass = 'item' + dynamicClass;
  const textClass = 'text' + dynamicClass;

  const iconLayout = (
    <div className={classes[itemClass]}>
      {data.icon && <data.icon />}
      <div className={classes[textClass]}>
        <Title className={classes.title} order={2}>
          {data.title}
        </Title>
        <Text className={classes.description} size="sm">
          {data.description}
        </Text>
      </div>
    </div>
  );

  return <>{type === 'icon' ? iconLayout : children}</>;
};

export default CardItem;