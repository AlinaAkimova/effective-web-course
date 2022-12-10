import React, { FC, useCallback, useEffect, ComponentType } from 'react';
import { observer } from 'mobx-react-lite';
import { VirtuosoGrid, GridListProps } from 'react-virtuoso';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';

// Stores
import comicsStore from 'stores/ComicsStore';

// Components
import Footer from 'components/Footer';
import Header from 'components/Header';
import SearchBase from 'components/SearchBase';
import CardWithImage from 'components/CardWithImage';

// Styles
import classes from 'routes/Routes.module.scss';

const ComicsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ComicsContainer: FC = observer(() => {
  const { comicsList, setId, loadComics, offset, query, setQuery } =
    comicsStore;

  const loadNext = useCallback(() => {
    return setTimeout(() => {
      loadComics();
    }, 0);
  }, [offset]);

  useEffect(() => {
    const timeout = loadNext();
    return () => clearTimeout(timeout);
  }, [offset]);

  return comicsList.length ? (
    <div className={classes.maxHeight}>
      <Header />
      <SearchBase
        pageName="comics"
        count={20}
        query={query}
        setQuery={setQuery}
      />
      <VirtuosoGrid
        components={{
          Item: Grid,
          List: ComicsList as ComponentType<
            GridListProps & { context?: unknown }
          >,
          ScrollSeekPlaceholder: () => <Grid item xs={3} />,
          Footer: () => {
            return (
              <div
                style={{
                  padding: '2rem',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                Loading...
              </div>
            );
          }
        }}
        overscan={200}
        data={comicsList}
        endReached={comicsStore.incrementOffset}
        itemContent={(index, item) => (
          <CardWithImage pageName="comics" item={item} openCard={setId} />
        )}
      />
      <Footer />
    </div>
  ) : (
    <div>
      <h2>Loading...</h2>
    </div>
  );
});

export default ComicsContainer;
