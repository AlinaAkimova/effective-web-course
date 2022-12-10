import React, { FC, useEffect, useCallback, ComponentType } from 'react';
import { observer } from 'mobx-react-lite';
import { VirtuosoGrid, GridListProps } from 'react-virtuoso';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';

// Components
import Footer from 'components/Footer';
import Header from 'components/Header';
import CardWithImage from 'components/CardWithImage';

// Stores
import seriesStore from 'stores/SeriesStore';

// Styles
import classes from 'routes/Routes.module.scss';

const SeriesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const SeriesContainer: FC = observer(() => {
  const { seriesList, setId, loadSeries, offset, incrementOffset } =
    seriesStore;

  const loadNext = useCallback(() => {
    return setTimeout(() => {
      loadSeries();
    }, 0);
  }, [offset]);

  useEffect(() => {
    const timeout = loadNext();
    return () => clearTimeout(timeout);
  }, [offset]);

  return seriesList.length ? (
    <div className={classes.maxHeight}>
      <Header />
      {/* <CardsContainer
        pageName="series"
        listItem={seriesList}
        openCard={setId}
      /> */}
      <VirtuosoGrid
        components={{
          Item: Grid,
          List: SeriesList as ComponentType<
            GridListProps & { context?: unknown }
          >,
          ScrollSeekPlaceholder: () => <Grid item xs={3} />
        }}
        overscan={200}
        data={seriesList}
        endReached={incrementOffset}
        itemContent={(index, item) => (
          <CardWithImage pageName="series" item={item} openCard={setId} />
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
export default SeriesContainer;
