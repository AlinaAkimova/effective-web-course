import React, { FC } from 'react';

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
      <img src={item.cardImage} height="68%" width="100%" alt="img" />
      <div className={classes.cardText}>
        <div className={classes.redText}>{item.cardName}</div>
        <div>{item.cardDesc}</div>
      </div>
    </div>
  );
};
export default CardWithImage;
