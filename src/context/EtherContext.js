import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Axios from 'axios';
import { ethers } from 'ethers';
import otoAbi from '../ABI/otoAbi.json';
import wavaxAbi from '../wavaxAbi.json';

const EtherContext = React.createContext();

const defaultData = {
  marketCap: 0,
  otoPrice: 0,
  totalSupply: 0,
  circulatingSupply: 0,
  backedLiquidity: 0,
  avaxLiquidity: 0,
  marketTreasury: 0,
  otoVault: 0,
  cauldronRank: 0,
  cauldronValue: 0,
  cauldronSupply: 0,
};

const defaultWalletData = {
  userBalance: 0,
  apy: 0,
  otoPrice: 0,
  rewardYield: 0,
  rewardAmount: 0,
  roi: 0,
  roiAmount: 0,
};

export const EtherContextProvider = ({ children }) => {
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
  const [signerAddy, setSignerAddy] = useState(() => {
    const stickyValue = sessionStorage.getItem('signerAddy');
    return stickyValue !== null ? JSON.parse(stickyValue) : null;
  });
  const [signerBalance, setSignerBalance] = useState(() => {
    const stickyValue = sessionStorage.getItem('signerBalance');
    return stickyValue !== null ? JSON.parse(stickyValue) : null;
  });
  const [data, setData] = useState(defaultData);
  const [walletData, setWalletData] = useState(defaultWalletData);
  const [isLoading, setIsLoading] = useState(true);

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

    sessionStorage.setItem('signerAddy', JSON.stringify(signerAddy));
    sessionStorage.setItem('signerBalance', JSON.stringify(parsedBalance));
    setSignerBalance(parsedBalance);
    setSignerAddy(signerAddy);
  };

  const calculateData = useCallback(() => {
    setData({
      marketCap: (otoPrice * (tokenSupply.totalSupply - taxReceiverBalances.firepit)).toFixed(2),
      otoPrice: otoPrice,
      totalSupply: parseFloat(tokenSupply.totalSupply).toFixed(2),
      circulatingSupply: tokenSupply.circulatingSupply,
      backedLiquidity: '100%',
      avaxLiquidity: (lpBalance.avax * avaxPrice).toFixed(2),
      marketTreasury: (taxReceiverBalances.treasury * avaxPrice).toFixed(2),
      otoVault: (taxReceiverBalances.vault * avaxPrice).toFixed(2),
      cauldronRank: parseFloat(taxReceiverBalances.firepit).toFixed(2),
      cauldronValue: (taxReceiverBalances.firepit * otoPrice).toFixed(2),
      cauldronSupply: tokenSupply.firepitPercentage,
    });
  }, [
    otoPrice,
    avaxPrice,
    lpBalance.avax,
    taxReceiverBalances.firepit,
    taxReceiverBalances.treasury,
    taxReceiverBalances.vault,
    tokenSupply.circulatingSupply,
    tokenSupply.totalSupply,
    tokenSupply.firepitPercentage,
  ]);

  const calculateWallet = useCallback(() => {
    setWalletData({
      userBalance: signerBalance,
      apy: '392,537%',
      otoPrice: otoPrice,
      rewardYield: '0.02355%',
      rewardAmount: (signerBalance * 0.0002355).toFixed(tokenDecimal),
      roi: '11.96%',
      roiAmount: calculateCompoundingRate(signerBalance, 480, 0.0002355).toFixed(tokenDecimal),
    });
  }, [signerBalance, otoPrice]);

  useEffect(() => {
    setIsLoading(true);

    async function getData() {
      await Axios.get('https://api.coinstats.app/public/v1/coins/avalanche-2').then((response) => {
        setAvaxPrice(response.data.coin.price);
      });
      await getLPBalance();
      await getTotalSupply();
      await getTaxReceiverBalances();
      getTokenPrice();
      calculateData();
      setIsLoading(false);
    }

    getData();
  }, [getLPBalance, getTotalSupply, getTaxReceiverBalances, getTokenPrice, calculateData]);

  useEffect(() => {
    if (signerAddy) {
      calculateWallet();
    }
  }, [signerAddy, calculateWallet]);

  return <EtherContext.Provider value={{ isLoading, data, signerAddy, connectWallet, walletData, calculateCompoundingRate }}>{children}</EtherContext.Provider>;
};

export default EtherContext;
