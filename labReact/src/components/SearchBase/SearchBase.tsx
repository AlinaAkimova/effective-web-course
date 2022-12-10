import React, { FC, useState, useCallback, ChangeEvent } from 'react';
import { TextField, Button } from '@mui/material';
// import debounce from 'lodash.debounce';

// Styles
import classes from './SearchBase.module.scss';

interface ISearch {
  pageName: string;
  count: number;
  query: string;
  setQuery(query: string): void;
}

const SearchBase: FC<ISearch> = ({ pageName, count, query, setQuery }) => {
  const [search, setSearch] = useState<string>('');
  const searchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);
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
          placeholder={`Search for ${pageName} by name`}
          color="info"
          className={classes.searchInput}
          value={search}
          onChange={searchChange}
        />
        <Button variant="contained" className={classes.searchButton}>
          Search
        </Button>
      </div>
    </div>
  );
};
export default SearchBase;
