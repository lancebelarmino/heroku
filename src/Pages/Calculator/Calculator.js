import React, { useState, useCallback, useEffect, useContext } from 'react';
import { Title, Text, Grid, NumberInput, Slider, Group, SimpleGrid } from '@mantine/core';
import { useForm } from '@mantine/form';
import ScreenSection from '../../components/Layouts/ScreenSection';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import CardItem from '../../components/Card/CardItem';
import Timer from '../../components/Timer/Timer';
import { ReactComponent as Wallet } from '../../assets/btn-wallet.svg';
import { ReactComponent as Balance } from '../../assets/screen-balance.svg';
import { ReactComponent as APY } from '../../assets/screen-apy.svg';
import { ReactComponent as NextRebase } from '../../assets/screen-next-rebase.svg';
import useStyles from './Calculator.styles.js';
import ConnectedMessage from '../../components/Button/ConnectedMessage';
import EtherContext from '../../context/EtherContext';

const Calculator = () => {
  const { data, walletData, signerAddy, connectWallet, calculateCompoundingRate } = useContext(EtherContext);
  const [result, setResult] = useState({ rewardAmount: 0, tokenBalance: 0, amountOfTokenUSD: 0 });
  const form = useForm({
    initialValues: {
      otoPrice: data.otoPrice,
      otoAmount: 0,
      days: 182,
    },
  });
  const { classes } = useStyles();

  const handleCalculateChange = useCallback(
    (formValues) => {
      const tokenAmount = formValues.tokenAmount ? formValues.tokenAmount : form.values.otoAmount;
      const tokenPrice = formValues.tokenPrice ? formValues.tokenPrice : data.otoPrice;
      const days = form.values.days;

      const rebaseTimesPerDay = 96;
      const rebaseRate = 0.02355 / 100;
      const rewardAmount = (tokenAmount * 0.0002355).toFixed(5);
      const amountOfToken = calculateCompoundingRate(tokenAmount, rebaseTimesPerDay * days, rebaseRate).toFixed(2);
      const amountOfTokenUSD = (amountOfToken * tokenPrice).toFixed(2);

      setResult({ rewardAmount, tokenBalance: amountOfToken, amountOfTokenUSD });
    },
    [form.values.otoAmount, form.values.days, data.otoPrice, calculateCompoundingRate]
  );

  useEffect(() => {
    handleCalculateChange({ days: form.values.days });
  }, [handleCalculateChange, form.values.days]);

  return (
    <ScreenSection>
      <div className={classes.btn}>
        {signerAddy ? (
          <ConnectedMessage />
        ) : (
          <Button type="button" icon={Wallet} onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}
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
              <NumberInput
                label="OTO Protocol Amount"
                placeholder="Amount Of OTO Protocol Tokens"
                decimalSeparator="."
                precision={2}
                onChange={(value) => {
                  form.setFieldValue('otoAmount', value);
                  handleCalculateChange({ tokenAmount: value });
                }}
                noClampOnBlur
                hideControls
              />
            </Grid.Col>

            <Grid.Col md={6}>
              <NumberInput
                value={parseFloat(data.otoPrice)}
                label="OTO Protocol Price"
                placeholder="Price Of OTO Protocol"
                decimalSeparator="."
                precision={5}
                onChange={(value) => {
                  form.setFieldValue('otoPrice', value);
                  handleCalculateChange({ tokenPrice: value });
                }}
                hideControls
              />
            </Grid.Col>

            <Grid.Col md={12}>
              <Text className={classes.dateLabel} size="md">
                Days
              </Text>

              <Slider
                className={classes.slider}
                defaultValue={182}
                min={1}
                max={365}
                onChangeEnd={(value) => {
                  form.setFieldValue('days', value);
                }}
              />

              <Group position="apart">
                <Text className={classes.sliderRange} size="sm">
                  0
                </Text>
                <Text className={classes.sliderRange} size="sm">
                  365
                </Text>
              </Group>
            </Grid.Col>
          </Grid>
        </Card>
      </section>

      <section className={classes.row}>
        <SimpleGrid cols={3} spacing={40} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          <Card>
            <CardItem type="icon" layout="center" data={{ title: result.rewardAmount, description: 'Next Reward Amount' }} />
          </Card>
          <Card>
            <CardItem type="icon" layout="center" data={{ title: parseFloat(result.tokenBalance).toFixed(2), description: 'TOKEN Balance' }} />
          </Card>
          <Card>
            <CardItem type="icon" layout="center" data={{ title: `$${result.amountOfTokenUSD}`, description: 'Total USD Balance' }} />
          </Card>
        </SimpleGrid>
      </section>

      <section className={classes.row}>
        <Card>
          <div className={classes.grid}>
            <CardItem type="icon" layout="flex" data={{ icon: Balance, title: walletData.userBalance.toFixed(2), description: 'Your Balance' }} />
            <CardItem type="icon" layout="flex" data={{ icon: APY, title: '392,537%', description: 'APY' }} />
            <CardItem type="custom">
              <div className={classes.cardItem}>
                <NextRebase />
                <div className={classes.cardText}>
                  <Timer />
                  <Text className={classes.cardDescription} size="sm">
                    Next Rebase
                  </Text>
                </div>
              </div>
            </CardItem>
          </div>
        </Card>
      </section>
    </ScreenSection>
  );
};

export default Calculator;
