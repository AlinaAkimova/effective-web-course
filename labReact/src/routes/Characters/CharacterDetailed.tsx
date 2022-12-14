import React, { FC, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';

// Stores
import characterStore from 'stores/CharacterStore';

// Components
import DetailedCard from 'components/DetailedCard';

// Layouts
import PageLayout from 'layouts/DetailedPageLayout';

const CharacterDetailed: FC = observer(() => {
  const { character, id, loadCharacter } = characterStore;

  const loadNext = useCallback(() => {
    return setTimeout(() => {
      loadCharacter();
    }, 0);
  }, [id]);

  useEffect(() => {
    const timeout = loadNext();
    return () => clearTimeout(timeout);
  }, [id]);

  return (
    <PageLayout>
      <DetailedCard item={character} />
    </PageLayout>
  );
});
export default CharacterDetailed;
