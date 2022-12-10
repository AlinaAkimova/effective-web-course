import React, { ComponentType, FC, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { VirtuosoGrid, GridListProps } from 'react-virtuoso';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';

// Layouts
import PageLayout from 'layouts/PageLayout';

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
  justify-content: space-between;
`;

const CharactersContainer: FC = observer(() => {
  const {
    charactersList,
    setId,
    loadCharacters,
    offset,
    query,
    setQuery,
    incrementOffset
  } = characterStore;

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
      {charactersList.length ? (
        <div className={classes.mainSize}>
          <SearchBase
            pageName="characters"
            count={20}
            query={query}
            setQuery={setQuery}
          />

          <VirtuosoGrid
            className={classes.virtuoso}
            components={{
              Item: Grid,
              List: CharactersList as ComponentType<
                GridListProps & { context?: unknown }
              >,
              ScrollSeekPlaceholder: () => <Grid item xs={3} />,
              Footer: () => {
                return <div className={classes.virtuosoFooter}>Loading...</div>;
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
        </div>
      ) : (
        <Loading />
      )}
    </PageLayout>
  );
});
export default CharactersContainer;
