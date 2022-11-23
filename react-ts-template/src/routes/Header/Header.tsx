import React, { FC } from 'react';
import { Toolbar, Link } from '@mui/material';

// Styles
import classes from './Header.module.scss';

const Header: FC = () => {
  return (
    <Toolbar className={classes.header}>
      <img src="marvel_logo.svg" alt="logo marvel" />
      <div className={classes.headerBottoms}>
        <Link
          href="components/Characters"
          underline="hover"
          className={classes.orangeText}
        >
          Characters
        </Link>
        <Link
          href="components/Comics"
          underline="hover"
          className={classes.orangeText}
        >
          Comics
        </Link>
        <Link
          href="components/Series"
          underline="hover"
          className={classes.orangeText}
        >
          Series
        </Link>
      </div>
    </Toolbar>
  );
};
export default Header;
