import React, { useContext } from 'react';
import EtherContext from '../../context/EtherContext';
import { SimpleGrid, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import { contentVariant } from '../../styles/framer-variants';
import ScreenSection from '../../components/Layouts/ScreenSection';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import CardItem from '../../components/Card/CardItem';
import ConnectedMessage from '../../components/Button/ConnectedMessage';
import Timer from '../../components/Timer/Timer';
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
  const { dashboardData, signerAddy, connectWallet } = useContext(EtherContext);
  const { classes } = useStyles();

  return (
    <ScreenSection>
      <motion.div className={classes.btn} variants={contentVariant} custom={1}>
        {signerAddy ? (
          <ConnectedMessage />
        ) : (
          <Button type="button" icon={Wallet} onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}
      </motion.div>

      <motion.section
        className={classes.row}
        variants={contentVariant}
        custom={2}>
        <Card>
          <div className={classes.grid}>
            <CardItem
              type="icon"
              layout="flex"
              data={{
                icon: MarketCap,
                title: `$${dashboardData.marketCap}`,
                description: 'Market Cap',
              }}
            />
            <CardItem
              type="icon"
              layout="flex"
              data={{
                icon: OtoPrice,
                title: `$${dashboardData.otoPrice}`,
                description: 'OTO Protocol Price',
              }}
            />
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
            <CardItem
              type="icon"
              layout="flex"
              data={{
                icon: TotalSupply,
                title: dashboardData.totalSupply,
                description: 'Total Supply',
              }}
            />
            <CardItem
              type="icon"
              layout="flex"
              data={{
                icon: CirculatingSupply,
                title: dashboardData.circulatingSupply,
                description: 'Circulating Supply',
              }}
            />
            <CardItem
              type="icon"
              layout="flex"
              data={{
                icon: BackedLiquidity,
                title: dashboardData.backedLiquidity,
                description: 'Backed Liquidity',
              }}
            />
          </div>
        </Card>
      </motion.section>

      <motion.section
        className={classes.row}
        variants={contentVariant}
        custom={3}>
        <SimpleGrid
          cols={3}
          spacing={40}
          breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          <Card>
            <CardItem
              type="icon"
              layout="center"
              data={{
                icon: AvaxLiquidity,
                title: `$${dashboardData.avaxLiquidity}`,
                description: 'AVAX Liquidity Value',
              }}
            />
          </Card>
          <Card>
            <CardItem
              type="icon"
              layout="center"
              data={{
                icon: MarketTreasury,
                title: `$${dashboardData.marketTreasury}`,
                description: 'Market Value Of Treasury Asset',
              }}
            />
          </Card>
          <Card>
            <CardItem
              type="icon"
              layout="center"
              data={{
                icon: OtoVault,
                title: `$${dashboardData.otoVault}`,
                description: 'OTO Vault Value',
              }}
            />
          </Card>
        </SimpleGrid>
      </motion.section>

      <motion.section
        className={classes.row}
        variants={contentVariant}
        custom={4}>
        <Card>
          <div className={classes.grid}>
            <CardItem
              type="icon"
              layout="flex"
              data={{
                icon: CauldronRank,
                title: dashboardData.cauldronRank,
                description: '# Value Of The Cauldron ',
              }}
            />
            <CardItem
              type="icon"
              layout="flex"
              data={{
                icon: CauldronValue,
                title: `$${dashboardData.cauldronValue}`,
                description: '$ Value Of The Cauldron ',
              }}
            />
            <CardItem
              type="icon"
              layout="flex"
              data={{
                icon: CauldronSupply,
                title: `${dashboardData.cauldronSupply}%`,
                description: '% The Cauldron Supply',
              }}
            />
          </div>
        </Card>
      </motion.section>
    </ScreenSection>
  );
};

export default Dashboard;
