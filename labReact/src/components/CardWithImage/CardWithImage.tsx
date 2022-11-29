import React, { FC } from 'react';
import { Link, useMatch } from 'react-router-dom';

// Types
import { ICard } from 'types/card';

// Styles
import classes from './CardWithImage.module.scss';

interface IComponentCard {
  pageName: string;
  item: ICard;
}
const CardWithImage: FC<IComponentCard> = ({ pageName, item }) => {
  const handleOnClick = (url: string) => {
    window.open(url, '_blanc', 'noopener,noreferrer');
  };

  return (
    <div
      className={classes.cardContainer}
      onClick={() => {
        handleOnClick(`https://localhost:5173/${pageName}/${item.cardId}`);
      }}
    >
      <img src={item.cardImage} alt="img" />
      <div className={classes.cardText}>
        <div className={classes.redText}>{item.cardName}</div>
        <div>{item.cardDesc}</div>
      </div>
    </div>
  );
};
export default CardWithImage;
