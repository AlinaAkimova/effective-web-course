import React, { FC } from 'react';

// Components
import Footer from 'components/Footer';
import Header from 'components/Header';
import CardsContainer from 'components/CardsContainer';

// Routes
import { listCharacters } from 'routes/Characters';

const Container: FC = () => {
  return (
    <div>
      <Header />
      <CardsContainer listItem={listCharacters} />
      <Footer />
    </div>
  );
};
export default Container;
