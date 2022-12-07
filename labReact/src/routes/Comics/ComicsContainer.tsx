import React, { FC, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

// Stores
import comicsStore from 'stores/ComicsStore';

// Components
import Footer from 'components/Footer';
import Header from 'components/Header';
import CardsContainer from 'components/CardsContainer';

// Styles
import classes from 'routes/Routes.module.scss';

const ComicsContainer: FC = observer(() => {
  const { comicsList } = comicsStore;

  useEffect(() => {
    comicsStore.loadComics();
  }, []);
  console.log(comicsList);

  return comicsList.length ? (
    <div className={classes.maxHeight}>
      <Header />
      <CardsContainer pageName="comics" listItem={comicsList} />
      <Footer />
    </div>
  ) : (
    <div>
      <h2>Loading...</h2>
    </div>
  );
});
export default ComicsContainer;
