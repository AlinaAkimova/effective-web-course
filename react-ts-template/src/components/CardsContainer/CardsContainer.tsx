import React, { FC } from 'react';

import { Grid } from '@mui/material';

// Components
import CardWithImage from 'components/CardWithImage';

// Types
import { ICard } from 'types/card';

// Styles
import classes from './CardsContainer.module.scss';

interface ICardsContainer {
  listItem: ICard[];
}

const CardsContainer: FC<ICardsContainer> = ({ listItem }) => {
  return (
    <main className={classes.main}>
      <div className={classes.mainCards}>
        {listItem.map((option) => (
          <CardWithImage key={option.cardName} item={option} />
        ))}
      </div>
    </main>
  );
};
export default CardsContainer;
