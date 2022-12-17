import React, { FC, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Paper } from '@mui/material';

// Context
import DarkMode from 'DarkMode/DarkMode';

// Components
import Favorites from 'components/Favorites';

// Types
import { ICard } from 'types/card';

// Styles
import classes from './CardWithImage.module.scss';

interface IComponentCard {
  pageName: string;
  item: ICard;
  openCard(id: number): void;
  setFavorites(card: ICard, func: boolean): void;
}
const CardWithImage: FC<IComponentCard> = ({
  pageName,
  item,
  setFavorites,
  openCard
}) => {
  const { mode } = useContext(DarkMode);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(item.favorite);

  const descriptionSubpage = () => {
    if (item.cardDesc) {
      return item.cardDesc.length < 70
        ? item.cardDesc
        : `${item.cardDesc.substring(0, 70)}...`;
    }
    return '';
  };

  const handleMouseOver = () => {
    return setIsHovering(true);
  };

  const handleMouseOut = () => {
    return setIsHovering(false);
  };

  return (
    <Paper
      elevation={6}
      className={`${classes.cardContainer} ${
        mode === 'light' ? classes.light : classes.dark
      } `}
    >
      <Link
        to={`/${pageName}/${item.cardId}`}
        onClick={() => {
          openCard(item.cardId);
        }}
        className={classes.noDecoration}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <img src={item.cardImage} alt="img" />
        <div
          className={`${classes.cardText} ${
            mode === 'light' ? classes.light : classes.dark
          } `}
        >
          <div className={classes.redText}>{item.cardName}</div>
          <div>{descriptionSubpage()}</div>
        </div>
      </Link>
      {isHovering ? (
        <div className={classes.icon}>
          <Favorites
            handleMouseOver={handleMouseOver}
            handleMouseOut={handleMouseOut}
            card={item}
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
            setFavorites={setFavorites}
          />
        </div>
      ) : (
        ''
      )}
    </Paper>
  );
};
export default CardWithImage;
