import React, { FC } from 'react';
import { Link } from 'react-router-dom';

// Types
import { ICard } from 'types/card';

// Styles
import classes from './CardWithImage.module.scss';

interface IComponentCard {
  pageName: string;
  item: ICard;
}
const CardWithImage: FC<IComponentCard> = ({ pageName, item }) => {
  return (
    <Link to={`/${pageName}/${item.cardId}`} className={classes.cardContainer}>
      <img src={item.cardImage} alt="img" />
      <div className={classes.cardText}>
        <div className={classes.redText}>{item.cardName}</div>
        <div>{item.cardDesc}</div>
      </div>
    </Link>
  );
};
export default CardWithImage;
