import React, { FC } from 'react';
import { IconButton } from '@mui/material';
import { observer } from 'mobx-react-lite';

// Icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// Types
import { ICard } from 'types/card';

// Styles
import classes from './Favorites.module.scss';

interface IFavorite {
  handleMouseOver(): void;
  handleMouseOut(): void;
  card: ICard;
  isFavorite: boolean;
  setIsFavorite(fav: boolean): void;
  setFavorites(card: ICard, func: boolean): void;
}

const Favorites: FC<IFavorite> = observer(
  ({
    handleMouseOver,
    handleMouseOut,
    card,
    isFavorite,
    setIsFavorite,
    setFavorites
  }) => {
    const handleClick = (cardN: ICard, e: boolean) => {
      setIsFavorite(e);
      setFavorites(cardN, e);
    };

    return isFavorite ? (
      <IconButton
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={() => {
          handleClick(card, false);
        }}
      >
        <FavoriteIcon className={classes.iconWhite} />
      </IconButton>
    ) : (
      <IconButton
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={() => {
          handleClick(card, true);
        }}
      >
        <FavoriteBorderIcon className={classes.iconWhite} />
      </IconButton>
    );
  }
);

export default Favorites;
