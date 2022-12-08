import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

// Components
import Footer from 'components/Footer';
import Header from 'components/Header';
import DetailedCard from 'components/DetailedCard';

// Stores
import seriesStore from 'stores/SeriesStore';

// Styles
import classes from 'routes/Routes.module.scss';

const SeriesContainer: FC = observer(() => {
  const { seriesList } = seriesStore;

  useEffect(() => {
    seriesStore.loadSeries();
  }, []);

  return seriesList.length ? (
    <div className={classes.maxHeight}>
      <Header />
      {/* <DetailedCard item={seriesList} /> */}
      <Footer />
    </div>
  ) : (
    <div>
      <h2>Loading...</h2>
    </div>
  );
});
export default SeriesContainer;
