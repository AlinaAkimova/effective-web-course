import React, { FC } from 'react';
import { TextField, Button } from '@mui/material';
// Styles
import classes from './SearchBase.module.scss';

const SearchBase: FC = () => {
  return (
    <div className={classes.searchBase}>
      <TextField
        fullWidth
        id="outlined-basic"
        placeholder="Search for by name"
        variant="outlined"
        className={classes.searchInput}
      />
      <Button variant="contained" className={classes.searchButton}>
        Search
      </Button>
    </div>
  );
};
export default SearchBase;
