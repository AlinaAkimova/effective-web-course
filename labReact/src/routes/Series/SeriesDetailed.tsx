import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

// Stores
import seriesStore from 'stores/SeriesStore';

// Components
import DetailedCard from 'components/DetailedCard';

// Layouts
import PageLayout from 'layouts/PageLayout';

const SeriesDetailed: FC = observer(() => {
  const { seriesList, id, loadSeries } = seriesStore;

  useEffect(() => {
    loadSeries();
  }, []);

  const findElement = () => {
    return seriesList.findIndex((element) => element.cardId === id);
  };

  return (
    <PageLayout>
      {seriesList.length ? (
        <DetailedCard item={seriesList[findElement()]} />
      ) : (
        <h2>Loading...</h2>
      )}
    </PageLayout>
  );
});

export default SeriesDetailed;
