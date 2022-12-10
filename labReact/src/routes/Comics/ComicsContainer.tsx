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
import CardWithImage from 'components/CardWithImage';

// Styles
import classes from 'routes/Routes.module.scss';

const ComicsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ComicsContainer: FC = observer(() => {
  const { comicsList, setId, loadComics, offset } = comicsStore;

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
      {/* <CardsContainer
        pageName="comics"
        listItem={comicsList}
        openCard={setId}
      /> */}
      <VirtuosoGrid
        components={{
          Item: Grid,
          List: ComicsList as ComponentType<
            GridListProps & { context?: unknown }
          >,
          ScrollSeekPlaceholder: () => <Grid item xs={3} />
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
