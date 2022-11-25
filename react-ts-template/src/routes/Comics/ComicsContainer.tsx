import React, { FC } from 'react';

// Components
import Footer from 'components/Footer';
import Header from 'components/Header';
import CardsContainer from 'components/CardsContainer';
import SearchBase from 'components/SearchBase';

// Routes
import { listComics } from './Comics';

const ComicsContainer: FC = () => {
  return (
    <div>
      <Header />
      <SearchBase />
      <CardsContainer listItem={listComics} />
      <Footer />
    </div>
  );
};
export default ComicsContainer;
