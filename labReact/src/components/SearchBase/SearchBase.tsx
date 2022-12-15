import React, {
  FC,
  useCallback,
  ChangeEvent,
  useContext,
  useMemo,
  useEffect
} from 'react';
import { TextField } from '@mui/material';

import debounce from 'lodash.debounce';

// Context
import DarkMode from 'DarkMode/DarkMode';

// Styles
import classes from './SearchBase.module.scss';

interface ISearch {
  pageName: string;
  count: number;
  query: string;
  setQuery(query: string): void;
}

const SearchBase: FC<ISearch> = ({ pageName, count, query, setQuery }) => {
  const searchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);
  const { mode } = useContext(DarkMode);

  const debouncedResults = useMemo(() => {
    return debounce(searchChange, 3000);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  return (
    <div className={classes.pageNameAndSearch}>
      <div className={classes.pageName}>
        <h1>{pageName} &nbsp;</h1>
        <h2>({count})</h2>
      </div>
      <div className={classes.searchBase}>
        <TextField
          fullWidth
          placeholder={`Search for ${pageName} by name`}
          color="primary"
          className={`${classes.searchInput} ${
            mode === 'light' ? classes.light : classes.dark
          } `}
          focused
          defaultValue={query}
          onChange={debouncedResults}
        />
      </div>
    </div>
  );
};
export default SearchBase;
