import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Axios from 'axios';
import { ethers } from 'ethers';
import otoAbi from '../../ABI/otoAbi.json';
import wavaxAbi from '../../wavaxAbi.json';
import { Title, Text, Grid, NumberInput, Slider, Group, SimpleGrid } from '@mantine/core';
import { useForm } from '@mantine/form';
import Countdown from 'react-countdown';
import ScreenSection from '../../components/Layouts/ScreenSection';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import CardItem from '../../components/Card/CardItem';
import { ReactComponent as Wallet } from '../../assets/btn-wallet.svg';
import { ReactComponent as Balance } from '../../assets/screen-balance.svg';
import { ReactComponent as APY } from '../../assets/screen-apy.svg';
import { ReactComponent as NextRebase } from '../../assets/screen-next-rebase.svg';
import useStyles from './Calculator.styles.js';
import ConnectedMessage from '../../components/Button/ConnectedMessage';

const Calculator = () => {
  const [avaxPrice, setAvaxPrice] = useState(0);
  const [otoPrice, setOtoPrice] = useState(0);
  const [lpBalance, setLPBalance] = useState({
    avax: null,
    token: null,
  });
  const [signerAddy, setSignerAddy] = useState(null);
  const [signerBalance, setSignerBalance] = useState(0);
  const [result, setResult] = useState({ rewardAmount: 0, tokenBalance: 0, amountOfTokenUSD: 0 });
  const [countdownKey, setCountdownKey] = useState(1);
  const form = useForm({
    initialValues: {
      otoPrice: otoPrice,
      otoAmount: 0,
      days: 182,
    },
  });
  const { classes } = useStyles();

  const avaxProvider = useMemo(() => new ethers.providers.getDefaultProvider('https://api.avax.network/ext/bc/C/rpc'), []);
  const wavaxContract = useMemo(() => new ethers.Contract('0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', wavaxAbi, avaxProvider), [avaxProvider]);
  const otoContract = useMemo(() => new ethers.Contract('0x3e5a9F09923936427aD6e487b24E23a862FCf6b7', otoAbi, avaxProvider), [avaxProvider]);
  const tokenDecimal = 5;
  const lpPair = '0x59Bd5b0edEDb3f4f5b37CB16F07636152FDb418c';

  const tokenFormatEther = (value) => {
    return ethers.utils.formatUnits(value, tokenDecimal);
  };

  const calculateCompoundingRate = (amount, rebaseTimes, rate) => {
    for (var i = 0; i < rebaseTimes; i++) {
      amount += amount * rate;
    }
    return amount;
  };

  const getLPBalance = useCallback(async () => {
    const avaxBalance = await wavaxContract.balanceOf(lpPair);
    const tokenBalance = await otoContract.balanceOf(lpPair);

    setLPBalance({ avax: ethers.utils.formatUnits(avaxBalance, 18), token: tokenFormatEther(tokenBalance) });
  }, [otoContract, wavaxContract]);

  const getTokenPrice = useCallback(() => {
    if (lpBalance.avax && lpBalance.token && avaxPrice) {
      const avaxBalanceInUsd = lpBalance.avax * avaxPrice;
      const tokenPrice = (avaxBalanceInUsd / lpBalance.token).toFixed(tokenDecimal);

      setOtoPrice(tokenPrice);
    }
  }, [avaxPrice, lpBalance.avax, lpBalance.token]);

  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();
    const signerAddy = await signer.getAddress();
    const balancePromise = await otoContract.balanceOf(signerAddy);
    const balance = tokenFormatEther(balancePromise);
    const parsedBalance = parseFloat(balance);

    setSignerBalance(parsedBalance);
    setSignerAddy(signerAddy);
  };

  const handleCalculateChange = useCallback(
    (formValues) => {
      const tokenAmount = formValues.tokenAmount ? formValues.tokenAmount : form.values.otoAmount;
      const tokenPrice = formValues.tokenPrice ? formValues.tokenPrice : otoPrice;
      const days = form.values.days;

      const rebaseTimesPerDay = 96;
      const rebaseRate = 0.02355 / 100;
      const rewardAmount = (tokenAmount * 0.0002355).toFixed(tokenDecimal);
      const amountOfToken = calculateCompoundingRate(tokenAmount, rebaseTimesPerDay * days, rebaseRate).toFixed(tokenDecimal);
      const amountOfTokenUSD = (amountOfToken * tokenPrice).toFixed(2);

      setResult({ rewardAmount, tokenBalance: amountOfToken, amountOfTokenUSD });
    },
    [form.values.otoAmount, form.values.days, otoPrice]
  );

  useEffect(() => {
    const getAvaxPrice = async () => {
      await Axios.get('https://api.coinstats.app/public/v1/coins/avalanche-2').then((response) => {
        setAvaxPrice(response.data.coin.price);
      });

      await getLPBalance();
      getTokenPrice();
    };

    getAvaxPrice();
  }, [getLPBalance, getTokenPrice]);

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
                value={parseFloat(otoPrice)}
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
            <CardItem type="icon" layout="flex" data={{ icon: Balance, title: `${signerBalance.toFixed(2)}`, description: 'Your Balance' }} />
            <CardItem type="icon" layout="flex" data={{ icon: APY, title: '392,537%', description: 'APY' }} />
            <CardItem type="custom">
              <div className={classes.cardItem}>
                <NextRebase />
                <div className={classes.cardText}>
                  <Countdown
                    key={countdownKey}
                    date={Date.now() + 900000}
                    renderer={({ minutes, seconds }) => {
                      return (
                        <span className={classes.cardTimer}>
                          {minutes}:{seconds}
                        </span>
                      );
                    }}
                    onComplete={() => setCountdownKey((prevData) => prevData + 1)}
                  />
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
