import React, { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

// Language
import { useTranslation } from 'react-i18next';

// Styles
import classes from './Loading.module.scss';

const Loading: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={classes.loadingContainer}>
      <CircularProgress color="inherit" />
      <h1>{t('Loading')}</h1>
    </div>
  );
};
export default Loading;
