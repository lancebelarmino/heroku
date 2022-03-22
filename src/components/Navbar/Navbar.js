import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Navbar as Nav, Group, Anchor } from '@mantine/core';
import { ReactComponent as Logo } from '../../assets/nav-logo.svg';
import { ReactComponent as Dashboard } from '../../assets/nav-dashboard.svg';
import { ReactComponent as Account } from '../../assets/nav-account.svg';
import { ReactComponent as Calculator } from '../../assets/nav-calculator.svg';
import { ReactComponent as Swap } from '../../assets/nav-swap.svg';
import { ReactComponent as Whitepaper } from '../../assets/nav-whitepaper.svg';
import { ReactComponent as Website } from '../../assets/nav-website.svg';
import toCapitalize from '../../utils/toCapitalize';
import useStyles from './Navbar.styles';

const menu = [
  { link: '/dashboard', label: 'Dashboard', icon: Dashboard, isScreen: true },
  { link: '/account', label: 'Account', icon: Account, isScreen: true },
  { link: '/calculator', label: 'Calculator', icon: Calculator, isScreen: true },
  { link: '', label: 'Swap', icon: Swap, isScreen: false },
  { link: 'https://oto-protocol.gitbook.io/oto-protocol/', label: 'Whitepaper', icon: Whitepaper, isScreen: false },
  { link: 'https://otoprotocol.info/', label: 'Oto Protocol', icon: Website, isScreen: false },
];

const Navbar = () => {
  const location = useLocation();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState();

  const path = location.pathname.split('/').pop();
  const currentPage = toCapitalize(path);

  useEffect(() => {
    setActive(currentPage);
  }, [currentPage]);

  const links = menu.map((item) => (
    <Anchor
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      component={item.isScreen ? Link : 'a'}
      to={item.isScreen ? item.link : ''}
      href={item.link}
      key={item.label}
      onClick={(e) => {
        if (item.isScreen) {
          setActive(item.label);
        }
      }}
      target={item.isScreen ? '' : '_blank'}
      rel="noreferrer">
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </Anchor>
  ));

  return (
    <Nav
      classNames={{
        root: classes.nav,
        hidden: classes.navHidden,
      }}
      height={700}
      width={{ sm: 300 }}
      p="md">
      <Nav.Section grow>
        <Group className={classes.header} position="apart">
          <Logo />
        </Group>
        {links}
      </Nav.Section>
    </Nav>
  );
};

export default Navbar;
