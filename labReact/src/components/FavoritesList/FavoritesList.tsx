import React, { FC, useEffect } from 'react';
import { Container } from '@mui/system';

// Components
import CardWithImage from 'components/CardWithImage';

// Stores
import characterStore from 'stores/CharacterStore';
import seriesStore from 'stores/SeriesStore';
import comicsStore from 'stores/ComicsStore';

// Styles
import classes from './FavoritesList.module.scss';

const FavoriteList: FC = () => {
  const {
    favorites: characters,
    setId: setCharacterId,
    setFavorites: setCharacterFav
  } = characterStore;
  const {
    favorites: series,
    setId: setSeriesId,
    setFavorites: setSeriesFav
  } = seriesStore;
  const {
    favorites: comics,
    setId: setComicsId,
    setFavorites: setComicsFav
  } = comicsStore;

  return (
    <Container className={classes.cardsPage}>
      {characters.length || series.length || comics.length ? (
        <>
          {characters.length === 0 ? (
            <></>
          ) : (
            <div>
              <h2>My favorite Characters</h2>

              <div className={classes.cardContainer}>
                {characters.map((item) => {
                  return (
                    <CardWithImage
                      pageName="characters"
                      item={item}
                      openCard={setCharacterId}
                      setFavorites={setCharacterFav}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {comics.length === 0 ? (
            <></>
          ) : (
            <div>
              <h2>My favorite Comics</h2>

              <div className={classes.cardContainer}>
                {comics.map((item) => {
                  return (
                    <CardWithImage
                      pageName="comics"
                      item={item}
                      openCard={setComicsId}
                      setFavorites={setComicsFav}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {series.length === 0 ? (
            <></>
          ) : (
            <div>
              <h2>My favorite Series</h2>

              <div className={classes.cardContainer}>
                {series.map((item) => {
                  return (
                    <CardWithImage
                      pageName="series"
                      item={item}
                      openCard={setSeriesId}
                      setFavorites={setSeriesFav}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </>
      ) : (
        <div>
          <h2>Your favorites section is empty</h2>
        </div>
      )}
    </Container>
  );
};

export default FavoriteList;
