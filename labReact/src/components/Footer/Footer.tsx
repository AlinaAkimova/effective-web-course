import React, { FC } from 'react';

import { Link } from '@mui/material';

// Language
import { useTranslation } from 'react-i18next';

// Styles
import classes from './Footer.module.scss';

const Footer: FC = () => {
  const { t } = useTranslation();

  const CURRENT_YEAR = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className={classes.footer}>
      <img
        src="/marvel_logo.svg"
        alt="logo marvel"
        className={classes.headerLogo}
      />
      <div>
        {t('Footer')}.©{CURRENT_YEAR()} MARVEL
      </div>
      <Link
        href="https://developer.marvel.com"
        underline="hover"
        className={classes.whiteText}
      >
        developer.marvel.com
      </Link>
    </footer>
  );
};
export default Footer;
