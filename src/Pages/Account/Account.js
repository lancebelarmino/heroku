import React from 'react';
import { Title, TextInput, Grid, Divider, Table } from '@mantine/core';
import ScreenSection from '../../components/Layouts/ScreenSection';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import CardItem from '../../components/Card/CardItem';
import { ReactComponent as Wallet } from '../../assets/btn-wallet.svg';
import { ReactComponent as Balance } from '../../assets/screen-balance.svg';
import { ReactComponent as APY } from '../../assets/screen-apy.svg';
import { ReactComponent as NextRebase } from '../../assets/screen-next-rebase.svg';
import useStyles from './Account.styles.js';

const Account = () => {
  const { classes } = useStyles();

  const data = [
    { label: 'OTO Protocol Price', price: 12.011 },
    { label: 'Next Reward Yield', price: 12.011 },
    { label: 'Next Reward Amount', price: 12.011 },
    { label: 'ROI (5-Day Rate)', price: 12.011 },
    { label: 'ROI (5-Day Rate) Amount', price: 12.011 },
  ];

  const rows = data.map((item) => (
    <tr className={classes.tr} key={item.label}>
      <td>{item.label}</td>
      <td>${item.price}</td>
    </tr>
  ));

  return (
    <ScreenSection>
      <div className={classes.btn}>
        <Button type="button" icon={Wallet} onClick={() => console.log('Clicked!')}>
          Connect Wallet
        </Button>
      </div>

      <section className={classes.row}>
        <Card>
          <div className={classes.grid}>
            <CardItem type="icon" layout="flex" data={{ icon: Balance, title: '$5000', description: 'Your Balance' }} />
            <CardItem type="icon" layout="flex" data={{ icon: APY, title: '392,537%', description: 'APY' }} />
            <CardItem type="icon" layout="flex" data={{ icon: NextRebase, title: '00:14:35', description: 'Next Rebase' }} />
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
              <TextInput className={classes.addressInput} placeholder="Wallet Address" />
              <div>
                <Button className={classes.btnImport} type="submit" onClick={() => console.log('Imported!')}>
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
            <table className={classes.table}>{rows}</table>
          </div>
        </Card>
      </section>
    </ScreenSection>
  );
};

export default Account;
