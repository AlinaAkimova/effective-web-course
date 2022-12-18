import React, { FC, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';

// Stores
import comicsStore from 'stores/ComicsStore';

// Layout
import PageLayout from 'layouts/DetailedPageLayout';

// Components
import DetailedCard from 'components/DetailedCard';

const ComicsDetailed: FC = observer(() => {
  const { loadOneComics, oneComics, id } = comicsStore;

  const loadNext = useCallback(() => {
    return setTimeout(() => {
      loadOneComics();
    }, 0);
  }, [id]);

  useEffect(() => {
    const timeout = loadNext();
    return () => clearTimeout(timeout);
  }, [id]);

  return (
    <PageLayout>
      <DetailedCard item={oneComics} />
    </PageLayout>
  );
});
export default ComicsDetailed;
