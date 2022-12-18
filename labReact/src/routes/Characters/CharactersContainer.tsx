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
import DarkMode from 'darkMode/DarkMode';

// Stores
import characterStore from 'stores/CharacterStore';

// Language
import { useTranslation } from 'react-i18next';

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
  justify-content: space-around;
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
    isLoad,
    setFavorites
  } = characterStore;

  const { mode } = useContext(DarkMode);
  const { t } = useTranslation();

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
      {isLoad || charactersList.length ? (
        <div className={classes.mainSize}>
          {error ? (
            <h2 className={classes.errorText}>{t('Error')}</h2>
          ) : (
            <>
              <div className={classes.searchStyle}>
                <SearchBase
                  pageName="characters"
                  count={total}
                  query={query}
                  setQuery={setQuery}
                />
              </div>

              {charactersList.length ? (
                <VirtuosoGrid
                  className={`${classes.virtuoso} ${
                    mode === 'light' ? classes.light : classes.dark
                  } `}
                  components={{
                    Item: Grid,
                    List: CharactersList as ComponentType<
                      GridListProps & { context?: unknown }
                    >,
                    ScrollSeekPlaceholder: () => <Grid item xs={6} />,
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
                  data={charactersList}
                  endReached={incrementOffset}
                  itemContent={(index, item) => (
                    <CardWithImage
                      pageName="characters"
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
export default CharactersContainer;
