import React, { FC, useContext } from 'react';

import { Link } from '@mui/material';

// Contexst
import DarkMode from 'DarkMode/DarkMode';

// Styles
import classes from './Footer.module.scss';

const Footer: FC = () => {
  const CURRENT_YEAR = () => {
    return new Date().getFullYear();
  };
  const { mode } = useContext(DarkMode);

  return (
    <footer className={`${mode === 'light' ? classes.light : classes.dark} `}>
      <div className={classes.footer}>
        <img
          src="/marvel_logo.svg"
          alt="logo marvel"
          className={classes.headerLogo}
        />
        <div>Data provided by Marvel.©{CURRENT_YEAR()} MARVEL</div>
        <Link
          href="https://developer.marvel.com"
          underline="hover"
          className={classes.whiteText}
        >
          developer.marvel.com
        </Link>
      </div>
    </footer>
  );
};
export default Footer;
