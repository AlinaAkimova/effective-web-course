import React, { FC, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

// Stores
import characterStore from 'stores/CharacterStore';

// Components
import Footer from 'components/Footer';
import Header from 'components/Header';
import DetailedCard from 'components/DetailedCard';

// Styles
import classes from 'routes/Routes.module.scss';

const CharacterDetailed: FC = observer(() => {
  const { charactersList, id } = characterStore;

  useEffect(() => {
    characterStore.loadCharacter();
  }, []);

  const FindElement = () => {
    return characterStore.charactersList.find(
      (element) => element.cardId === id
    );
  };

  return charactersList.length ? (
    <div className={classes.maxHeight}>
      <Header />
      <DetailedCard item={FindElement()} />
      <Footer />
    </div>
  ) : (
    <div>
      <h2>Loading...</h2>
    </div>
  );
});
export default CharacterDetailed;
