import React, { FC } from 'react';

import { Container } from '@mui/material';

// Components
import SearchBase from 'components/SearchBase';
import CardWithImage from 'components/CardWithImage';

// Types
import { ICard } from 'types/card';

// Styles
import classes from './CardsContainer.module.scss';

interface ICardsContainer {
  pageName: string;
  listItem: ICard[];
}

const CardsContainer: FC<ICardsContainer> = ({ pageName, listItem }) => {
  return (
    <Container>
      <SearchBase pageName={pageName} count={listItem.length} />
      <div className={classes.mainCards}>
        {listItem.map((option) => (
          <CardWithImage key={option.cardName} item={option} />
        ))}
      </div>
    </Container>
  );
};
export default CardsContainer;
