import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

// Stores
import characterStore from 'stores/CharacterStore';

// Components
import DetailedCard from 'components/DetailedCard';

// Layouts
import PageLayout from 'layouts/PageLayout';

const CharacterDetailed: FC = observer(() => {
  const { charactersList, id } = characterStore;

  useEffect(() => {
    characterStore.loadCharacter();
  }, []);

  const findElement = () => {
    return charactersList.findIndex((element) => element.cardId === id);
  };

  return (
    <PageLayout>
      {charactersList.length ? (
        <DetailedCard item={charactersList[findElement()]} />
      ) : (
        <h2>Loading...</h2>
      )}
    </PageLayout>
  );
});
export default CharacterDetailed;
