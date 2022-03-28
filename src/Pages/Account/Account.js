import React, { useState, useContext } from 'react';
import EtherContext from '../../context/EtherContext';
import { Title, Divider, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import Countdown from 'react-countdown';
import ScreenSection from '../../components/Layouts/ScreenSection';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import CardItem from '../../components/Card/CardItem';
import ConnectedMessage from '../../components/Button/ConnectedMessage';
import { ReactComponent as Wallet } from '../../assets/btn-wallet.svg';
import { ReactComponent as Balance } from '../../assets/screen-balance.svg';
import { ReactComponent as APY } from '../../assets/screen-apy.svg';
import { ReactComponent as NextRebase } from '../../assets/screen-next-rebase.svg';
import useStyles from './Account.styles.js';

const Account = () => {
  const { signerAddy, connectWallet, walletData } = useContext(EtherContext);
  const form = useForm({
    initialValues: {
      walletAddress: '',
    },
  });
  const [countdownKey, setCountdownKey] = useState(1);
  const { classes } = useStyles();

  const data = [
    { label: 'OTO Protocol Price', price: `$${walletData.otoPrice}` },
    { label: 'Next Reward Yield', price: walletData.rewardYield },
    { label: 'Next Reward Amount', price: walletData.rewardAmount },
    { label: 'ROI (5-Day Rate)', price: walletData.roi },
    { label: 'ROI (5-Day Rate) Amount', price: walletData.roiAmount },
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
            <CardItem type="icon" layout="flex" data={{ icon: Balance, title: walletData.userBalance, description: 'Your Balance' }} />
            <CardItem type="icon" layout="flex" data={{ icon: APY, title: walletData.apy, description: 'APY' }} />
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

      <section className={classes.row}>
        <Card>
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
