import React, { FC, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';

// Stores
import seriesStore from 'stores/SeriesStore';

// Components
import DetailedCard from 'components/DetailedCard';

// Layouts
import PageLayout from 'layouts/PageLayout';

const SeriesDetailed: FC = observer(() => {
  const { loadOneSeries, oneSeries, id } = seriesStore;

  const loadNext = useCallback(() => {
    return setTimeout(() => {
      loadOneSeries();
    }, 0);
  }, [id]);

  useEffect(() => {
    const timeout = loadNext();
    return () => clearTimeout(timeout);
  }, [id]);

  return (
    <PageLayout>
      <DetailedCard item={oneSeries} />
    </PageLayout>
  );
});

export default SeriesDetailed;
