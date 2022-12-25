import React, { FC, useEffect, useCallback, ComponentType } from 'react';
import { observer } from 'mobx-react-lite';
import { VirtuosoGrid, GridListProps } from 'react-virtuoso';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';

// Layouts
import PageLayout from 'layouts/DetailedPageLayout';

// Components
import CardWithImage from 'components/CardWithImage';
import SearchBase from 'components/SearchBase';
import Loading from 'components/Loading';

// Language
import { useTranslation } from 'react-i18next';

// Stores
import seriesStore from 'stores/SeriesStore';

// Styles
import classes from '../Routes.module.scss';

const SeriesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-around;
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
    isLoad,
    setFavorites
  } = seriesStore;

  const { t } = useTranslation();

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
      {isLoad || seriesList.length ? (
        <div className={classes.mainSize}>
          {error ? (
            <h2 className={classes.errorText}>{t('Error')}</h2>
          ) : (
            <>
              <div className={classes.searchStyle}>
                <SearchBase
                  pageName="series"
                  count={total}
                  query={query}
                  setQuery={setQuery}
                />
              </div>
              {seriesList.length ? (
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
                        <div className={classes.virtuosoFooter}>
                          {t('Loading')}...
                        </div>
                      ) : (
                        <div />
                      );
                    }
                  }}
                  overscan={200}
                  data={seriesList}
                  endReached={incrementOffset}
                  itemContent={(index, item) => (
                    <CardWithImage
                      pageName="series"
                      item={item}
                      openCard={setId}
                      setFavorites={setFavorites}
                    />
                  )}
                />
              ) : (
                <h2 className={classes.errorText}>{t('NothingFound')}</h2>
              )}
            </>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </PageLayout>
  );
});
export default SeriesContainer;
