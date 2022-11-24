import React, { FC } from 'react';
import { Toolbar, Link } from '@mui/material';

// Types
import { ICard } from 'types/card';

// Styles
import classes from './CardWithImage.module.scss';

interface IComponentCard {
  item: ICard;
}
const CardWithImage: FC<IComponentCard> = ({ item }) => {
  return (
    <div className={classes.cardContainer}>
      <div className={classes.cardImage}>{item.cardImage}</div>
      <div className={classes.cardText}>
        <div className={classes.redText}>{item.cardName}</div>
        <div>{item.cardDesc}</div>
      </div>
    </div>
  );
};
export default CardWithImage;
