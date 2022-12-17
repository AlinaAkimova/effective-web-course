import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';

// Context
import DarkMode from 'darkMode/DarkMode';

// Types
import { ICard, PageType } from 'types/card';

// Stores
import characterStore from 'stores/CharacterStore';
import comicsStore from 'stores/ComicsStore';
import seriesStore from 'stores/SeriesStore';

// Styles
import classes from './DetailedCard.module.scss';

interface IDetailedCard {
  item?: ICard;
}

const DetailedCard: FC<IDetailedCard> = ({ item }) => {
  const { mode } = useContext(DarkMode);

  const { setId: setIdCh } = characterStore;
  const { setId: setIdCom } = comicsStore;
  const { setId: setIdS } = seriesStore;

  return (
    <div className={classes.cardPage}>
      <div className={classes.cardContainer}>
        <div className={classes.cardTextColumn}>
          <img src={item?.cardImage} alt="img" className={classes.cardImage} />
          <div className={classes.textColumn}>
            <h1>{item?.cardName}</h1>
            <div className={`${mode === 'dark' && classes.dark} `}>
              {item?.cardDesc}
            </div>
          </div>
        </div>

        <div className={classes.cardTextRow}>
          <div className={classes.textColumn}>
            <h2>
              {item?.cardType === PageType.character ? 'Comics' : 'Characters'}
            </h2>
            <ul>
              {item?.cardType === PageType.character
                ? item?.comics?.map((el) => (
                    <li key={el.id}>
                      <Link
                        to={`/comics/${el.id}`}
                        onClick={() => setIdCom(el.id)}
                        className={`${mode === 'dark' && classes.darkLink} `}
                      >
                        {el.name}
                      </Link>
                    </li>
                  ))
                : item?.characters?.map((el) => (
                    <li key={el.id}>
                      <Link
                        to={`/characters/${el.id}`}
                        onClick={() => setIdCh(el.id)}
                        className={`${mode === 'dark' && classes.darkLink} `}
                      >
                        {el.name}
                      </Link>
                    </li>
                  ))}
            </ul>
          </div>

          <div className={classes.textColumn}>
            <h2>{item?.cardType === PageType.series ? 'Comics' : 'Series'}</h2>
            <div>
              <ul>
                {item?.cardType === PageType.series
                  ? item?.comics?.map((el) => (
                      <li key={el.id}>
                        <Link
                          to={`/comics/${el.id}`}
                          onClick={() => setIdCom(el.id)}
                          className={`${mode === 'dark' && classes.darkLink} `}
                        >
                          {el.name}
                        </Link>
                      </li>
                    ))
                  : item?.series?.map((el) => (
                      <li key={el.id}>
                        <Link
                          to={`/series/${el.id}`}
                          onClick={() => setIdS(el.id)}
                          className={`${mode === 'dark' && classes.darkLink} `}
                        >
                          {el.name}
                        </Link>
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailedCard;
