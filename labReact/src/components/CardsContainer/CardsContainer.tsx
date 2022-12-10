import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
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
  openCard(id: number): void;
}

const CardsContainer: FC<ICardsContainer> = observer(
  ({ pageName, listItem, openCard }) => {
    return (
      <Container className={classes.mainCardsContainer}>
        <SearchBase pageName={pageName} count={listItem.length} />
        <div className={classes.mainCards}>
          {listItem.map((option) => (
            <CardWithImage
              key={option.cardName}
              pageName={pageName}
              item={option}
              openCard={openCard}
            />
          ))}
        </div>
      </Container>
    );
  }
);
export default CardsContainer;
