import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Axios from 'axios';
import { Title, TextInput, Divider, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import ScreenSection from '../../components/Layouts/ScreenSection';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import CardItem from '../../components/Card/CardItem';
import Countdown from 'react-countdown';
import { ReactComponent as Wallet } from '../../assets/btn-wallet.svg';
import { ReactComponent as Balance } from '../../assets/screen-balance.svg';
import { ReactComponent as APY } from '../../assets/screen-apy.svg';
import { ReactComponent as NextRebase } from '../../assets/screen-next-rebase.svg';
import { ReactComponent as Secure } from '../../assets/screen-secure.svg';
import useStyles from './Account.styles.js';
import { ethers } from 'ethers';
import otoAbi from '../../ABI/otoAbi.json';
import wavaxAbi from '../../wavaxAbi.json';

const Account = () => {
  const [avaxPrice, setAvaxPrice] = useState(0);
  const [otoPrice, setOtoPrice] = useState(0);
  const [signerAddy, setSignerAddy] = useState(null);
  const [signerBalance, setSignerBalance] = useState(0);
  const [lpBalance, setLPBalance] = useState({
    avax: null,
    token: null,
  });
  const form = useForm({
    initialValues: {
      walletAddress: '',
    },
  });
  const [countdownKey, setCountdownKey] = useState(1);
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

  const getSignerBalance = async () => {
    if (!signerAddy) {
      await connectWallet();
    } else {
      const balancePromise = await otoContract.balanceOf(signerAddy);
      const balance = tokenFormatEther(balancePromise);

      setSignerBalance(balance);
    }
  };

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

  const data = [
    { label: 'OTO Protocol Price', price: otoPrice ? `$${otoPrice}` : '$0' },
    { label: 'Next Reward Yield', price: `0.02355%` },
    { label: 'Next Reward Amount', price: `${(signerBalance * 0.0002355).toFixed(tokenDecimal)}` },
    { label: 'ROI (5-Day Rate)', price: `11.96%` },
    { label: 'ROI (5-Day Rate) Amount', price: `${calculateCompoundingRate(signerBalance, 480, 0.0002355).toFixed(tokenDecimal)}` },
  ];

  const rows = data.map((item) => (
    <tr className={classes.tr} key={item.label}>
      <td>{item.label}</td>
      <td>{item.price}</td>
    </tr>
  ));

  return (
    <ScreenSection>
      <div className={classes.btn}>
        {signerAddy ? (
          <div className={classes.connected}>
            <Text className={classes.connectedMessage} size="md">
              Wallet Connected
            </Text>
            <Secure />
          </div>
        ) : (
          <Button type="button" icon={Wallet} onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}
      </div>

      <section className={classes.row}>
        <Card>
          <div className={classes.grid}>
            <CardItem type="icon" layout="flex" data={{ icon: Balance, title: `${signerBalance.toFixed(2)}`, description: 'Your Balance' }} />
            <CardItem type="icon" layout="flex" data={{ icon: APY, title: '392,537%', description: 'APY' }} />
            <CardItem type="custom">
              <div className={classes.cardItem}>
                <NextRebase />
                <div className={classes.cardText}>
                  <Countdown key={countdownKey} className={classes.cardTimer} date={Date.now() + 50000} onComplete={() => setCountdownKey((prevData) => prevData + 1)} />
                  <Text className={classes.cardDescription} size="sm">
                    Next Rebase
                  </Text>
                </div>
              </div>
            </CardItem>
          </div>
        </Card>
      </section>

      <section className={classes.row}>
        <Card>
          <div className={classes.row}>
            <Title className={classes.title} order={5}>
              Import from wallet address
            </Title>
            <div className={classes.address}>
              <TextInput className={classes.addressInput} placeholder="Wallet Address" onBlur={(event) => form.setFieldValue('walletAddress', event.currentTarget.value)} />
              <div>
                <Button className={classes.btnImport} type="submit" onClick={getSignerBalance}>
                  Import
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Title className={classes.title} order={5}>
              Wallet Details
            </Title>
            <Divider />
            <table className={classes.table}>
              <tbody>{rows}</tbody>
            </table>
          </div>
        </Card>
      </section>
    </ScreenSection>
  );
};

export default Account;
