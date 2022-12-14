import React, { FC } from 'react';
import { Link, useMatch } from 'react-router-dom';

import { Toolbar } from '@mui/material';

// Icons
import DarkModeIcon from '@mui/icons-material/DarkMode';
import TranslateIcon from '@mui/icons-material/Translate';
// import WbSunnyIcon from '@mui/icons-material/WbSunny';

// Styles
import classes from './Header.module.scss';

const Header: FC = () => {
  return (
    <Toolbar className={classes.header}>
      <img
        src="/marvel_logo.svg"
        alt="logo marvel"
        className={classes.headerLogo}
      />
      <nav className={classes.headerBottoms}>
        <ul className={classes.headerBottomsList}>
          <li>
            <Link
              to="/characters"
              className={
                useMatch('/characters')
                  ? classes.orangeTextDecoration
                  : classes.orangeTextDecorationNone
              }
            >
              Characters
            </Link>
          </li>
          <li>
            <Link
              to="/comics"
              className={
                useMatch('/comics')
                  ? classes.orangeTextDecoration
                  : classes.orangeTextDecorationNone
              }
            >
              Comics
            </Link>
          </li>
          <li>
            <Link
              to="/series"
              className={
                useMatch('/series')
                  ? classes.orangeTextDecoration
                  : classes.orangeTextDecorationNone
              }
            >
              Series
            </Link>
          </li>
        </ul>
      </nav>
      <div className={classes.headerIcons}>
        <DarkModeIcon />
        <TranslateIcon />
      </div>
    </Toolbar>
  );
};
export default Header;
