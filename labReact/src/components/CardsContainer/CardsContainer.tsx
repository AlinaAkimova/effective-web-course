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
    <Container className={classes.mainCardsContainer}>
      <SearchBase pageName={pageName} count={listItem.length} />
      <div className={classes.mainCards}>
        {listItem.map((option) => (
          <CardWithImage
            key={option.cardName}
            pageName={pageName}
            item={option}
          />
        ))}
      </div>
    </Container>
  );
};
export default CardsContainer;
