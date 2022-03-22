import React from 'react';
import { SimpleGrid } from '@mantine/core';
import ScreenSection from '../../components/Layouts/ScreenSection';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import CardItem from '../../components/Card/CardItem';
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
  const { classes } = useStyles();

  return (
    <ScreenSection>
      <div className={classes.btn}>
        <Button type="button" icon={Wallet} onClick={() => console.log('Connected!')}>
          Connect Wallet
        </Button>
      </div>

      <section className={classes.row}>
        <Card>
          <div className={classes.grid}>
            <CardItem type="icon" layout="flex" data={{ icon: OtoPrice, title: '$10.665', description: 'OTO Protocol Price' }} />
            <CardItem type="icon" layout="flex" data={{ icon: BackedLiquidity, title: '100%', description: 'Backed Liquidity' }} />
            <CardItem type="icon" layout="flex" data={{ icon: MarketCap, title: '$10.665', description: 'Market Cap' }} />
            <CardItem type="icon" layout="flex" data={{ icon: CirculatingSupply, title: '382701.87', description: 'Circulating Supply' }} />
            <CardItem type="icon" layout="flex" data={{ icon: NextRebase, title: '00: 13: 23', description: 'Next Rebase' }} />
            <CardItem type="icon" layout="flex" data={{ icon: TotalSupply, title: '382701.87', description: 'Total Supply' }} />
          </div>
        </Card>
      </section>

      <section className={classes.row}>
        <SimpleGrid cols={3} spacing={40}>
          <Card>
            <CardItem type="icon" layout="center" data={{ icon: AvaxLiquidity, title: '$10.665', description: 'AVAX Liquidity Value' }} />
          </Card>
          <Card>
            <CardItem type="icon" layout="center" data={{ icon: MarketTreasury, title: '$12587.39', description: 'Market Value Of Treasury Asset' }} />
          </Card>
          <Card>
            <CardItem type="icon" layout="center" data={{ icon: OtoVault, title: '$4627.97', description: 'OTO Vault Value' }} />
          </Card>
        </SimpleGrid>
      </section>

      <section className={classes.row}>
        <Card>
          <div className={classes.grid}>
            <CardItem type="icon" layout="flex" data={{ icon: CauldronRank, title: '$75340.19', description: '# Value Of The Cauldron ' }} />
            <CardItem type="icon" layout="flex" data={{ icon: CauldronValue, title: '$803473.64', description: '$ Value Of The Cauldron ' }} />
            <CardItem type="icon" layout="flex" data={{ icon: CauldronSupply, title: '40.69%', description: '% The Cauldron Supply' }} />
          </div>
        </Card>
      </section>
    </ScreenSection>
  );
};

export default Dashboard;
