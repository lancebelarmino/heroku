import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { ethers } from 'ethers';
import Axios from 'axios';
import otoAbi from '../ABI/otoAbi.json';
import wavaxAbi from '../wavaxAbi.json';

const OtoFunctionBased = () => {
  const [avaxPrice, setAvaxPrice] = useState(0);
  const [otoPrice, setOtoPrice] = useState(0);
  // const [value, setValue] = useState(0); // value = days?
  const [result, setResult] = useState(0);
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

  const getLPBalance = useCallback(async () => {
    const avaxBalance = await wavaxContract.balanceOf(lpPair);
    const tokenBalance = await otoContract.balanceOf(lpPair);

    setLPBalance({ avax: ethers.utils.formatUnits(avaxBalance, 18), token: tokenFormatEther(tokenBalance) });
  }, [otoContract, wavaxContract]);

  const getTaxReceiverBalances = useCallback(async () => {
    const firepitBalance = await otoContract.balanceOf(firepitAddress);
    const vaultBalance = await otoContract.balanceOf(vaultAddress);
    const treasuryBalance = await otoContract.balanceOf(treasuryAddress);

    setTaxReceiverBalances({
      firepit: tokenFormatEther(firepitBalance),
      vault: tokenFormatEther(vaultBalance),
      treasury: tokenFormatEther(treasuryBalance),
    });
  }, [otoContract]);

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

    setTokenSupply({
      totalSupply: totalSupply,
      circulatingSupply: totalSupply - firepitSupply,
      firepitPercentage: firepitPercentage,
    });
  }, [otoContract, taxReceiverBalances.firepit]);

  const getTokenInUsd = (balance) => {
    if (otoPrice) {
      return balance * otoPrice;
    }
  };

  const calculateCompoundingRate = (amount, rebaseTimes, rate) => {
    for (var i = 0; i < rebaseTimes; i++) {
      amount += amount * rate;
    }
    return amount;
  };

  const handleCalculateChange = (event) => {
    const days = event.target.value; // To update
    // this.setState({ value: days }); //
    const rebaseTimesPerDay = 96; // To update
    const rebaseRate = 0.02355 / 100; // To update
    const tokenAmount = 1; //dynamic from another input field
    const amountOfToken = calculateCompoundingRate(tokenAmount, rebaseTimesPerDay * days, rebaseRate);
    setResult(amountOfToken);
    this.setState({ result: amountOfToken });
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

  return <div>OtoFunctionBased</div>;
};

export default OtoFunctionBased;
