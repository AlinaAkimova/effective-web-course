import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

// Stores
import characterStore from 'stores/CharacterStore';

// Components
import Footer from 'components/Footer';
import Header from 'components/Header';
import CardsContainer from 'components/CardsContainer';

// Styles
import classes from 'routes/Routes.module.scss';

const CharactersContainer: FC = observer(() => {
  const { charactersList, setId } = characterStore;

  useEffect(() => {
    characterStore.loadCharacters();
  }, []);

  return charactersList.length ? (
    <div className={classes.maxHeight}>
      <Header />
      <CardsContainer
        pageName="characters"
        listItem={charactersList}
        openCard={setId}
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
