import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Axios from 'axios';
import { ethers } from 'ethers';
import otoAbi from '../../ABI/otoAbi.json';
import wavaxAbi from '../../wavaxAbi.json';
import { SimpleGrid, Text } from '@mantine/core';
import ScreenSection from '../../components/Layouts/ScreenSection';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import CardItem from '../../components/Card/CardItem';
import ConnectedMessage from '../../components/Button/ConnectedMessage';
import Countdown from 'react-countdown';
import { ReactComponent as Wallet } from '../../assets/btn-wallet.svg';
import { ReactComponent as OtoPrice } from '../../assets/screen-oto-price.svg';
import { ReactComponent as BackedLiquidity } from '../../assets/screen-backed-liquidity.svg';
import { ReactComponent as MarketCap } from '../../assets/screen-market-cap.svg';
import { ReactComponent as CirculatingSupply } from '../../assets/screen-circulating-supply.svg';
import { ReactComponent as NextRebase } from '../../assets/screen-next-rebase.svg';
import { ReactComponent as TotalSupply } from '../../assets/screen-total-supply.svg';
import { ReactComponent as AvaxLiquidity } from '../../assets/screen-avax-liquidity.svg';
import { ReactComponent as MarketTreasury } from '../../assets/screen-market-treasury.svg';
import { ReactComponent as OtoVault } from '../../assets/screen-oto-vault.svg';
import { ReactComponent as CauldronRank } from '../../assets/screen-cauldron-rank.svg';
import { ReactComponent as CauldronValue } from '../../assets/screen-cauldron-value.svg';
import { ReactComponent as CauldronSupply } from '../../assets/screen-cauldron-supply.svg';
import useStyles from './Dashboard.styles.js';

const Dashboard = () => {
  const [countdownKey, setCountdownKey] = useState(1);
  const { classes } = useStyles();

  const [avaxPrice, setAvaxPrice] = useState(0);
  const [otoPrice, setOtoPrice] = useState(0);
  const [tokenSupply, setTokenSupply] = useState({ totalSupply: 0, circulatingSupply: 0, firepitPercentage: 0 });
  const [taxReceiverBalances, setTaxReceiverBalances] = useState({
    firepit: 0,
    vault: 0,
    treasury: 0,
  });
  const [lpBalance, setLPBalance] = useState({
    avax: null,
    token: null,
  });
  const [signerAddy, setSignerAddy] = useState('');
  const [signerBalance, setSignerBalance] = useState(0);

  const avaxProvider = useMemo(() => new ethers.providers.getDefaultProvider('https://api.avax.network/ext/bc/C/rpc'), []);
  const wavaxContract = useMemo(() => new ethers.Contract('0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', wavaxAbi, avaxProvider), [avaxProvider]);
  const otoContract = useMemo(() => new ethers.Contract('0x3e5a9F09923936427aD6e487b24E23a862FCf6b7', otoAbi, avaxProvider), [avaxProvider]);
  const firepitAddress = '0x000000000000000000000000000000000000dEaD';
  const treasuryAddress = '0xa225478725BE5F5ae612182Db99547e4dA86E66E';
  const vaultAddress = '0xAc9c036aF64Ad44a83acB7786e6942944949147D';
  const lpPair = '0x59Bd5b0edEDb3f4f5b37CB16F07636152FDb418c';
  const tokenDecimal = 5;

  const tokenFormatEther = (value) => {
    return ethers.utils.formatUnits(value, tokenDecimal);
  };

  const avaxTokenFormatEther = (value) => {
    return ethers.utils.formatUnits(value, 18);
  };

  const getLPBalance = useCallback(async () => {
    const avaxBalance = await wavaxContract.balanceOf(lpPair);
    const tokenBalance = await otoContract.balanceOf(lpPair);

    setLPBalance({ avax: ethers.utils.formatUnits(avaxBalance, 18), token: tokenFormatEther(tokenBalance) });
  }, [otoContract, wavaxContract]);

  const getTaxReceiverBalances = useCallback(async () => {
    const firepitBalance = await otoContract.balanceOf(firepitAddress);
    const vaultBalance = await wavaxContract.balanceOf(vaultAddress);
    const treasuryBalance = await wavaxContract.balanceOf(treasuryAddress);

    setTaxReceiverBalances({
      firepit: tokenFormatEther(firepitBalance),
      vault: avaxTokenFormatEther(vaultBalance),
      treasury: avaxTokenFormatEther(treasuryBalance),
    });
  }, [otoContract, wavaxContract]);

  const getTokenPrice = useCallback(() => {
    if (lpBalance.avax && lpBalance.token && avaxPrice) {
      const avaxBalanceInUsd = lpBalance.avax * avaxPrice;
      const tokenPrice = (avaxBalanceInUsd / lpBalance.token).toFixed(tokenDecimal);

      setOtoPrice(tokenPrice);
    }
  }, [avaxPrice, lpBalance.avax, lpBalance.token]);

  const getTotalSupply = useCallback(async () => {
    const response = await otoContract._totalSupply();
    const firepitSupply = taxReceiverBalances.firepit;
    const totalSupply = tokenFormatEther(response);
    const firepitPercentage = ((firepitSupply / totalSupply) * 100).toFixed(2);
    const circulatingSupply = (totalSupply - firepitSupply).toFixed(2);

    setTokenSupply({
      totalSupply: totalSupply,
      circulatingSupply: circulatingSupply,
      firepitPercentage: firepitPercentage,
    });
  }, [otoContract, taxReceiverBalances.firepit]);

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

  useEffect(() => {
    async function getData() {
      await Axios.get('https://api.coinstats.app/public/v1/coins/avalanche-2').then((response) => {
        setAvaxPrice(response.data.coin.price);
      });
      await getLPBalance();
      await getTotalSupply();
      await getTaxReceiverBalances();
      await getTokenPrice();
    }

    getData();
  }, [getLPBalance, getTotalSupply, getTaxReceiverBalances, getTokenPrice]);

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
          <div className={classes.grid}>
            <CardItem type="icon" layout="flex" data={{ icon: MarketCap, title: `$${(otoPrice * (tokenSupply.totalSupply - taxReceiverBalances.firepit)).toFixed(2)}`, description: 'Market Cap' }} />
            <CardItem type="icon" layout="flex" data={{ icon: OtoPrice, title: `$${otoPrice}`, description: 'OTO Protocol Price' }} />
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
            <CardItem type="icon" layout="flex" data={{ icon: TotalSupply, title: parseFloat(tokenSupply.totalSupply).toFixed(2), description: 'Total Supply' }} />
            <CardItem type="icon" layout="flex" data={{ icon: CirculatingSupply, title: tokenSupply.circulatingSupply, description: 'Circulating Supply' }} />
            <CardItem type="icon" layout="flex" data={{ icon: BackedLiquidity, title: '100%', description: 'Backed Liquidity' }} />
          </div>
        </Card>
      </section>

      <section className={classes.row}>
        <SimpleGrid cols={3} spacing={40} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          <Card>
            <CardItem type="icon" layout="center" data={{ icon: AvaxLiquidity, title: `$${(lpBalance.avax * avaxPrice).toFixed(2)}`, description: 'AVAX Liquidity Value' }} />
          </Card>
          <Card>
            <CardItem type="icon" layout="center" data={{ icon: MarketTreasury, title: `$${(taxReceiverBalances.treasury * avaxPrice).toFixed(2)}`, description: 'Market Value Of Treasury Asset' }} />
          </Card>
          <Card>
            <CardItem type="icon" layout="center" data={{ icon: OtoVault, title: `$${(taxReceiverBalances.vault * avaxPrice).toFixed(2)}`, description: 'OTO Vault Value' }} />
          </Card>
        </SimpleGrid>
      </section>

      <section className={classes.row}>
        <Card>
          <div className={classes.grid}>
            <CardItem type="icon" layout="flex" data={{ icon: CauldronRank, title: parseFloat(taxReceiverBalances.firepit).toFixed(2), description: '# Value Of The Cauldron ' }} />
            <CardItem type="icon" layout="flex" data={{ icon: CauldronValue, title: `$${(taxReceiverBalances.firepit * otoPrice).toFixed(2)}`, description: '$ Value Of The Cauldron ' }} />
            <CardItem type="icon" layout="flex" data={{ icon: CauldronSupply, title: `${tokenSupply.firepitPercentage}%`, description: '% The Cauldron Supply' }} />
          </div>
        </Card>
      </section>
    </ScreenSection>
  );
};

export default Dashboard;
