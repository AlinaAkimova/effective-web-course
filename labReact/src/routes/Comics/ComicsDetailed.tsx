import React, { FC, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

// Stores
import comicsStore from 'stores/ComicsStore';

// Components
import Footer from 'components/Footer';
import Header from 'components/Header';
import DetailedCard from 'components/DetailedCard';

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
      {/* <DetailedCard item={comicsList} /> */}
      <Footer />
    </div>
  ) : (
    <div>
      <h2>Loading...</h2>
    </div>
  );
});
export default ComicsContainer;
