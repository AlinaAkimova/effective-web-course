import React, { FC } from 'react';

// Components
import Footer from 'components/Footer';
import Header from 'components/Header';
import CardsContainer from 'components/CardsContainer';

// Styles
import classes from 'routes/Routes.module.scss';

// Routes
import { listComics } from './Comics';

const ComicsContainer: FC = () => {
  return (
    <div className={classes.maxHeight}>
      <Header />
      <CardsContainer pageName="Comics" listItem={listComics} />
      <Footer />
    </div>
  );
};
export default ComicsContainer;
