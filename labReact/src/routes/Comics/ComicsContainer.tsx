import React, { FC, useCallback, useEffect, ComponentType } from 'react';
import { observer } from 'mobx-react-lite';
import { VirtuosoGrid, GridListProps } from 'react-virtuoso';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';

// Stores
import comicsStore from 'stores/ComicsStore';

// Layouts
import PageLayout from 'layouts/DetailedPageLayout';

// Components
import SearchBase from 'components/SearchBase';
import CardWithImage from 'components/CardWithImage';
import Loading from 'components/Loading';

// Language
import { useTranslation } from 'react-i18next';

// Styles
import classes from '../Routes.module.scss';

const ComicsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-around;
`;

const ComicsContainer: FC = observer(() => {
  const {
    comicsList,
    setId,
    loadComics,
    offset,
    query,
    setQuery,
    incrementOffset,
    total,
    error,
    isLoad,
    setFavorites
  } = comicsStore;

  const { t } = useTranslation();

  const loadNext = useCallback(() => {
    return setTimeout(() => {
      loadComics();
    }, 0);
  }, [offset, query]);

  useEffect(() => {
    const timeout = loadNext();
    return () => clearTimeout(timeout);
  }, [offset, query]);

  return (
    <PageLayout>
      {isLoad || comicsList.length ? (
        <div className={classes.mainSize}>
          {error ? (
            <h2 className={classes.errorText}>{t('Error')}</h2>
          ) : (
            <>
              <div className={classes.searchStyle}>
                <SearchBase
                  pageName="comics"
                  count={total}
                  query={query}
                  setQuery={setQuery}
                />
              </div>
              {comicsList.length ? (
                <VirtuosoGrid
                  className={classes.virtuoso}
                  components={{
                    Item: Grid,
                    List: ComicsList as ComponentType<
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
                  data={comicsList}
                  endReached={incrementOffset}
                  itemContent={(index, item) => (
                    <CardWithImage
                      pageName="comics"
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

export default ComicsContainer;
