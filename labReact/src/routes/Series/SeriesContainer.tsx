import React, { FC } from 'react';

// Components
import Footer from 'components/Footer';
import Header from 'components/Header';
import CardsContainer from 'components/CardsContainer';

// Styles
import classes from 'routes/Routes.module.scss';

// Routes
import { series } from 'routes/Dependencies/Dependencies';

const SeriesContainer: FC = () => {
  return (
    <div className={classes.maxHeight}>
      <Header />
      <CardsContainer pageName="Series" listItem={series} />
      <Footer />
    </div>
  );
};
export default SeriesContainer;
