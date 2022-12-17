import React, { FC, useContext, useCallback } from 'react';
import { Link, useMatch } from 'react-router-dom';

import { IconButton, Toolbar } from '@mui/material';

// Icons
import DarkModeIcon from '@mui/icons-material/DarkMode';
import TranslateIcon from '@mui/icons-material/Translate';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Contexst
import DarkMode from 'darkMode/DarkMode';

// Language
import { useTranslation } from 'react-i18next';

// Styles
import classes from './Header.module.scss';

const Header: FC = () => {
  const { mode, setMode } = useContext(DarkMode);
  const { t, i18n } = useTranslation();

  const chooseMode = (theme: string) => {
    setMode(theme);
    localStorage.setItem('theme', theme);
  };

  const changeLanguage = useCallback(() => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('ru');
    } else {
      i18n.changeLanguage('en');
    }
    localStorage.setItem('language', i18n.language);
  }, [i18n.language]);

  return (
    <Toolbar
      className={`${classes.header} ${
        mode === 'light' ? classes.light : classes.dark
      } `}
    >
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
              {t('characters')}
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
              {t('comics')}
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
              {t('series')}
            </Link>
          </li>
        </ul>
      </nav>
      <div className={classes.headerIcons}>
        <Link to="/favorites">
          <IconButton>
            <FavoriteIcon className={classes.iconColor} />
          </IconButton>
        </Link>
        {mode === 'light' ? (
          <IconButton
            onClick={() => {
              chooseMode('dark');
            }}
          >
            <DarkModeIcon className={classes.iconColor} />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              chooseMode('light');
            }}
          >
            <WbSunnyIcon className={classes.iconColor} />
          </IconButton>
        )}

        <IconButton
          onClick={() => {
            changeLanguage();
          }}
        >
          <TranslateIcon className={classes.iconColor} />
        </IconButton>
      </div>
    </Toolbar>
  );
};
export default Header;
