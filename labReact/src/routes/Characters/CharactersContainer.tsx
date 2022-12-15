import React, {
  ComponentType,
  FC,
  useCallback,
  useEffect,
  useContext
} from 'react';
import { observer } from 'mobx-react-lite';
import { VirtuosoGrid, GridListProps } from 'react-virtuoso';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';

// Layouts
import PageLayout from 'layouts/MainPageLayout';

// Contexst
import DarkMode from 'DarkMode/DarkMode';

// Stores
import characterStore from 'stores/CharacterStore';

// Components
import CardWithImage from 'components/CardWithImage';
import SearchBase from 'components/SearchBase';
import Loading from 'components/Loading';

// Styles
import classes from '../Routes.module.scss';

const CharactersList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
  padding: 15px;
  width: 80%;
`;

const CharactersContainer: FC = observer(() => {
  const {
    charactersList,
    setId,
    loadCharacters,
    offset,
    query,
    setQuery,
    incrementOffset,
    total,
    error,
    loading
  } = characterStore;

  const { mode, setMode } = useContext(DarkMode);

  const loadNext = useCallback(() => {
    return setTimeout(() => {
      loadCharacters();
    }, 0);
  }, [offset, query]);

  useEffect(() => {
    const timeout = loadNext();
    return () => clearTimeout(timeout);
  }, [offset, query]);

  return (
    <PageLayout>
      {!loading ? (
        <div className={classes.mainSize}>
          <div className={classes.searchStyle}>
            <SearchBase
              pageName="characters"
              count={total}
              query={query}
              setQuery={setQuery}
            />
          </div>
          {error ? (
            <h1>Something went wrong......</h1>
          ) : (
            <VirtuosoGrid
              style={{ width: '100%' }}
              className={`${classes.virtuoso} ${
                mode === 'light' ? classes.light : classes.dark
              } `}
              components={{
                Item: Grid,
                List: CharactersList as ComponentType<
                  GridListProps & { context?: unknown }
                >,
                ScrollSeekPlaceholder: () => <Grid item xs={3} />,
                Footer: () => {
                  return offset + 20 < total ? (
                    <div className={classes.virtuosoFooter}>Loading...</div>
                  ) : (
                    <div />
                  );
                }
              }}
              overscan={200}
              data={charactersList}
              endReached={incrementOffset}
              itemContent={(index, item) => (
                <CardWithImage
                  pageName="characters"
                  item={item}
                  openCard={setId}
                />
              )}
            />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </PageLayout>
  );
});
export default CharactersContainer;
