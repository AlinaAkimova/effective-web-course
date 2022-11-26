import React, { FC } from 'react';

// Components
import Footer from 'components/Footer';
import Header from 'components/Header';
import CardsContainer from 'components/CardsContainer';

// Styles
import classes from 'routes/Routes.module.scss';

// Routes
import { listCharacters } from 'routes/Characters/Characters';

const CharactersContainer: FC = () => {
  return (
    <div className={classes.maxHeight}>
      <Header />
      <CardsContainer pageName="Characters" listItem={listCharacters} />
      <Footer />
    </div>
  );
};
export default CharactersContainer;
