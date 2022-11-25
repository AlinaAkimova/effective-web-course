import React, { FC } from 'react';

// Components
import Footer from 'components/Footer';
import Header from 'components/Header';
import CardsContainer from 'components/CardsContainer';
import SearchBase from 'components/SearchBase';

// Routes
import { listCharacters } from 'routes/Characters/Characters';

const CharactersContainer: FC = () => {
  return (
    <div>
      <Header />
      <SearchBase />
      <CardsContainer listItem={listCharacters} />
      <Footer />
    </div>
  );
};
export default CharactersContainer;
