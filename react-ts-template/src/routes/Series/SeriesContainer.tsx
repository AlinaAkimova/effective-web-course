import React, { FC } from 'react';

// Components
import Footer from 'components/Footer';
import Header from 'components/Header';
import CardsContainer from 'components/CardsContainer';
import SearchBase from 'components/SearchBase';

// Routes
import { listSeries } from './Series';

const SeriesContainer: FC = () => {
  return (
    <div>
      <Header />
      <SearchBase />
      <CardsContainer listItem={listSeries} />
      <Footer />
    </div>
  );
};
export default SeriesContainer;
