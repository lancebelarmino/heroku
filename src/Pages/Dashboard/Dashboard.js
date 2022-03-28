import React, { useState, useContext } from 'react';
import EtherContext from '../../context/EtherContext';
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
  const { data, signerAddy, connectWallet } = useContext(EtherContext);
  const [countdownKey, setCountdownKey] = useState(1);
  const { classes } = useStyles();

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
            <CardItem type="icon" layout="flex" data={{ icon: MarketCap, title: `$${data.marketCap}`, description: 'Market Cap' }} />
            <CardItem type="icon" layout="flex" data={{ icon: OtoPrice, title: `$${data.otoPrice}`, description: 'OTO Protocol Price' }} />
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
            <CardItem type="icon" layout="flex" data={{ icon: TotalSupply, title: data.totalSupply, description: 'Total Supply' }} />
            <CardItem type="icon" layout="flex" data={{ icon: CirculatingSupply, title: data.circulatingSupply, description: 'Circulating Supply' }} />
            <CardItem type="icon" layout="flex" data={{ icon: BackedLiquidity, title: data.backedLiquidity, description: 'Backed Liquidity' }} />
          </div>
        </Card>
      </section>

      <section className={classes.row}>
        <SimpleGrid cols={3} spacing={40} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          <Card>
            <CardItem type="icon" layout="center" data={{ icon: AvaxLiquidity, title: `$${data.avaxLiquidity}`, description: 'AVAX Liquidity Value' }} />
          </Card>
          <Card>
            <CardItem type="icon" layout="center" data={{ icon: MarketTreasury, title: `$${data.marketTreasury}`, description: 'Market Value Of Treasury Asset' }} />
          </Card>
          <Card>
            <CardItem type="icon" layout="center" data={{ icon: OtoVault, title: `$${data.otoVault}`, description: 'OTO Vault Value' }} />
          </Card>
        </SimpleGrid>
      </section>

      <section className={classes.row}>
        <Card>
          <div className={classes.grid}>
            <CardItem type="icon" layout="flex" data={{ icon: CauldronRank, title: data.cauldronRank, description: '# Value Of The Cauldron ' }} />
            <CardItem type="icon" layout="flex" data={{ icon: CauldronValue, title: `$${data.cauldronValue}`, description: '$ Value Of The Cauldron ' }} />
            <CardItem type="icon" layout="flex" data={{ icon: CauldronSupply, title: `${data.cauldronSupply}%`, description: '% The Cauldron Supply' }} />
          </div>
        </Card>
      </section>
    </ScreenSection>
  );
};

export default Dashboard;
