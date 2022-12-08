import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import characterStore from 'stores/CharacterStore';

// Types
import { ICard } from 'types/card';

// Styles
import classes from './CardWithImage.module.scss';

interface IComponentCard {
  pageName: string;
  item: ICard;
  openCard(id: number): void;
}
const CardWithImage: FC<IComponentCard> = ({ pageName, item, openCard }) => {
  return (
    <Link
      to={`/${pageName}/${item.cardId}`}
      onClick={() => {
        openCard(item.cardId);
      }}
      className={classes.cardContainer}
    >
      <img src={item.cardImage} alt="img" />
      <div className={classes.cardText}>
        <div className={classes.redText}>{item.cardName}</div>
        <div>{item.cardDesc}</div>
      </div>
    </Link>
  );
};
export default CardWithImage;
