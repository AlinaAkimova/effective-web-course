import React, { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

// Styles
import classes from './Loading.module.scss';

const Loading: FC = () => {
  return (
    <div className={classes.loadingContainer}>
      <CircularProgress color="inherit" />
      <h1>Loading</h1>
    </div>
  );
};
export default Loading;
