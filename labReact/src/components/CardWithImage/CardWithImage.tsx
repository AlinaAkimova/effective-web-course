import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Paper } from '@mui/material';

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
  const descriptionSubpage = () => {
    if (item.cardDesc) {
      return item.cardDesc.length < 70
        ? item.cardDesc
        : `${item.cardDesc.substring(0, 70)}...`;
    }
    return '';
  };

  return (
    <Paper elevation={6} className={classes.cardContainer}>
      <Link
        to={`/${pageName}/${item.cardId}`}
        onClick={() => {
          openCard(item.cardId);
        }}
        className={classes.noDecoration}
      >
        <img src={item.cardImage} alt="img" />
        <div className={classes.cardText}>
          <div className={classes.redText}>{item.cardName}</div>
          <div>{descriptionSubpage()}</div>
        </div>
      </Link>
    </Paper>
  );
};
export default CardWithImage;
