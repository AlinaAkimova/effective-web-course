import React, { FC, useEffect, useCallback, ComponentType } from 'react';
import { observer } from 'mobx-react-lite';
import { VirtuosoGrid, GridListProps } from 'react-virtuoso';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';

// Layouts
import PageLayout from 'layouts/MainPageLayout';

// Components
import CardWithImage from 'components/CardWithImage';
import SearchBase from 'components/SearchBase';
import Loading from 'components/Loading';

// Stores
import seriesStore from 'stores/SeriesStore';

// Styles
import classes from '../Routes.module.scss';

const SeriesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 15px;
`;

const SeriesContainer: FC = observer(() => {
  const {
    seriesList,
    setId,
    loadSeries,
    offset,
    incrementOffset,
    query,
    setQuery,
    total,
    error,
    loading
  } = seriesStore;

  const loadNext = useCallback(() => {
    return setTimeout(() => {
      loadSeries();
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
          <SearchBase
            pageName="series"
            count={total}
            query={query}
            setQuery={setQuery}
          />
          {error ? (
            <h1>Something went wrong......</h1>
          ) : (
            <VirtuosoGrid
              className={classes.virtuoso}
              components={{
                Item: Grid,
                List: SeriesList as ComponentType<
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
              data={seriesList}
              endReached={incrementOffset}
              itemContent={(index, item) => (
                <CardWithImage pageName="series" item={item} openCard={setId} />
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
export default SeriesContainer;
