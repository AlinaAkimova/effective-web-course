import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

// Stores
import comicsStore from 'stores/ComicsStore';

// Layout
import PageLayout from 'layouts/PageLayout';

// Components
import DetailedCard from 'components/DetailedCard';

const ComicsDetailed: FC = observer(() => {
  const { comicsList, id } = comicsStore;

  useEffect(() => {
    comicsStore.loadOneComics();
  }, []);

  const findElement = () => {
    return comicsList.findIndex((element) => element.cardId === id);
  };

  return (
    <PageLayout>
      {comicsList.length ? (
        <DetailedCard item={comicsList[findElement()]} />
      ) : (
        <h2>Loading...</h2>
      )}
    </PageLayout>
  );
});
export default ComicsDetailed;
