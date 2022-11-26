import React, { FC } from 'react';
import { TextField, Button } from '@mui/material';
// Styles
import classes from './SearchBase.module.scss';

interface ISearch {
  pageName: string;
  count: number;
}

const SearchBase: FC<ISearch> = ({ pageName, count }) => {
  return (
    <div className={classes.pageNameAndSearch}>
      <div className={classes.pageName}>
        <h1>{pageName} &nbsp;</h1>
        <h2>({count})</h2>
      </div>
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
    </div>
  );
};
export default SearchBase;
