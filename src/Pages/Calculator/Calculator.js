import React from 'react';
import { Title, Text, Grid, NumberInput, Slider, Group, SimpleGrid, TextInput } from '@mantine/core';
import ScreenSection from '../../components/Layouts/ScreenSection';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import CardItem from '../../components/Card/CardItem';
import { ReactComponent as Wallet } from '../../assets/btn-wallet.svg';
import { ReactComponent as Balance } from '../../assets/screen-balance.svg';
import { ReactComponent as APY } from '../../assets/screen-apy.svg';
import { ReactComponent as NextRebase } from '../../assets/screen-next-rebase.svg';
import useStyles from './Calculator.styles.js';

const Calculator = () => {
  const { classes } = useStyles();

  return (
    <ScreenSection>
      <div className={classes.btn}>
        <Button type="button" icon={Wallet} onClick={() => console.log('Clicked!')}>
          Connect Wallet
        </Button>
      </div>

      <section className={classes.row}>
        <Card>
          <div className={classes.header}>
            <Title className={classes.title} order={2}>
              Calculator
            </Title>
            <Text className={classes.description} size="md">
              Predict your returns using our calculator.
            </Text>
          </div>

          <Grid className={classes.calculator}>
            <Grid.Col md={6}>
              <NumberInput className={classes.addressInput} label="OTO Protocol Amount" placeholder="Amount Of OTO Protocol Tokens" decimalSeparator="." precision={2} hideControls />
            </Grid.Col>

            <Grid.Col md={6}>
              <NumberInput className={classes.addressInput} label="OTO Protocol Price" placeholder="Price Of OTO Protocol" decimalSeparator="." precision={2} hideControls />
            </Grid.Col>

            <Grid.Col md={12}>
              <Text className={classes.dateLabel} size="md">
                Date
              </Text>

              <Slider className={classes.slider} defaultValue={182} min={1} max={365} />

              <Group position="apart">
                <Text className={classes.sliderRange} size="sm">
                  0
                </Text>
                <Text className={classes.sliderRange} size="sm">
                  100
                </Text>
              </Group>
            </Grid.Col>
          </Grid>
        </Card>
      </section>

      <section className={classes.row}>
        <SimpleGrid cols={3} spacing={40}>
          <Card>
            <CardItem type="icon" layout="center" data={{ title: '$209095.38', description: 'Next Reward Amount' }} />
          </Card>
          <Card>
            <CardItem type="icon" layout="center" data={{ title: '$209095.38', description: 'TOKEN Balance' }} />
          </Card>
          <Card>
            <CardItem type="icon" layout="center" data={{ title: '$209095.38', description: 'Total USD Balance' }} />
          </Card>
        </SimpleGrid>
      </section>

      <section className={classes.row}>
        <Card>
          <div className={`${classes.grid} ${classes.stats}`}>
            <CardItem type="icon" layout="flex" data={{ icon: Balance, title: '$5000', description: 'Your Balance' }} />
            <CardItem type="icon" layout="flex" data={{ icon: APY, title: '392,537%', description: 'APY' }} />
            <CardItem type="icon" layout="flex" data={{ icon: NextRebase, title: '00:14:35', description: 'Next Rebase' }} />
          </div>

          <div className={classes.address}>
            <TextInput className={classes.addressInput} label="Import Wallet Address" placeholder="Wallet Address" />
            <div>
              <Button className={classes.btnImport} type="submit" onClick={() => console.log('Imported!')}>
                Import
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </ScreenSection>
  );
};

export default Calculator;
