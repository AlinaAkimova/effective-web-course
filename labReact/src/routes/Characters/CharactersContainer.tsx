import React, { ComponentType, FC, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { VirtuosoGrid, GridListProps, GridItemProps } from 'react-virtuoso';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';

// Stores
import characterStore from 'stores/CharacterStore';

// Components
import Footer from 'components/Footer';
import Header from 'components/Header';
import CardWithImage from 'components/CardWithImage';
import CardsContainer from 'components/CardsContainer';

// Styles
import classes from 'routes/Routes.module.scss';

const CharactersList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const CharactersContainer: FC = observer(() => {
  const { charactersList, setId, loadCharacters, offset } = characterStore;

  const loadNext = useCallback(() => {
    return setTimeout(() => {
      loadCharacters();
    }, 0);
  }, [offset]);

  useEffect(() => {
    const timeout = loadNext();
    return () => clearTimeout(timeout);
  }, [offset]);

  return charactersList.length ? (
    <div className={classes.maxHeight}>
      <Header />
      <VirtuosoGrid
        components={{
          Item: Grid,
          List: CharactersList as ComponentType<
            GridListProps & { context?: unknown }
          >,
          ScrollSeekPlaceholder: () => <Grid item xs={3} />
        }}
        overscan={200}
        data={charactersList}
        endReached={characterStore.incrementOffset}
        itemContent={(index, item) => (
          <CardWithImage pageName="characters" item={item} openCard={setId} />
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
export default CharactersContainer;
