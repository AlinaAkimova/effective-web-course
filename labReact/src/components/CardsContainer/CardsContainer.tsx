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
  console.log(listItem[1].comics);
  return (
    <Container>
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
