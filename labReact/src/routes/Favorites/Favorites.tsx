import React, { FC } from 'react';

// Components
import FavoriteList from 'components/FavoritesList/FavoritesList';

// Layouts
import PageLayout from 'layouts/DetailedPageLayout';

const Favorites: FC = () => {
  return (
    <PageLayout>
      <FavoriteList />
    </PageLayout>
  );
};

export default Favorites;
