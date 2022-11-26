import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Toolbar } from '@mui/material';

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
            <Link to="/characters" className={classes.orangeText}>
              Characters
            </Link>
          </li>
          <li>
            <Link to="/comics" className={classes.orangeText}>
              Comics
            </Link>
          </li>
          <li>
            <Link to="/series" className={classes.orangeText}>
              Series
            </Link>
          </li>
        </ul>
      </nav>
    </Toolbar>
  );
};
export default Header;
