import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Navbar as Nav, Group, Anchor, Burger } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
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
  {
    link: '/calculator',
    label: 'Calculator',
    icon: Calculator,
    isScreen: true,
  },
  {
    link: 'https://traderjoexyz.com/trade?outputCurrency=0x0aC80E1753deA5e298E8a2b6CF53f161937806A1#/',
    label: 'Swap',
    icon: Swap,
    isScreen: false,
  },
  {
    link: 'https://oto-protocol.gitbook.io/oto-protocol/',
    label: 'Whitepaper',
    icon: Whitepaper,
    isScreen: false,
  },
  {
    link: 'https://otoprotocol.info/',
    label: 'Oto Protocol',
    icon: Website,
    isScreen: false,
  },
];

const Navbar = () => {
  const location = useLocation();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState();
  const [opened, setOpened] = useState(false);
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const path = location.pathname.split('/').pop();
  const currentPage = toCapitalize(path);

  useEffect(() => {
    setActive(currentPage);
  }, [currentPage]);

  const links = menu.map((item) => (
    <Anchor
      key={item.label}
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      onClick={(e) => {
        if (item.isScreen) {
          setActive(item.label);
          setOpened(false);
        }
      }}
      {...(item.isScreen && { component: Link, to: item.link })}
      {...(!item.isScreen && {
        href: item.link,
        target: '_blank',
        rel: 'noreferrer',
      })}>
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </Anchor>
  ));

  return (
    <>
      {isTablet ? (
        <>
          <Burger
            className={classes.burger}
            color="#242C4E"
            opened={opened}
            onClick={() => setOpened((o) => !o)}
          />
          {opened && (
            <Nav
              classNames={{
                root: classes.mobileNav,
              }}
              p="md">
              <Nav.Section grow>{links}</Nav.Section>
            </Nav>
          )}
        </>
      ) : (
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
      )}
    </>
  );
};

export default Navbar;
