import React, { FC } from 'react';
import { Link } from 'react-router-dom';

// Types
import { ICard } from 'types/card';

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
            <div>{item?.cardDesc}</div>
          </div>
        </div>

        <div className={classes.cardTextRow}>
          <div className={classes.textColumn}>
            <h2>{item?.cardType === 'CHARACTER' ? 'Comics' : 'Characters'}</h2>
            <ul>
              {item?.cardType === 'CHARACTER'
                ? item?.comics?.map((el) => (
                    <li key={el.id}>
                      <Link
                        to={`/comics/${el.id}`}
                        onClick={() => setIdCom(el.id)}
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
                      >
                        {el.name}
                      </Link>
                    </li>
                  ))}
            </ul>
          </div>

          <div className={classes.textColumn}>
            <h2>{item?.cardType === 'SERIES' ? 'Comics' : 'Series'}</h2>
            <div>
              <ul>
                {item?.cardType === 'SERIES'
                  ? item?.comics?.map((el) => (
                      <li key={el.id}>
                        <Link
                          to={`/comics/${el.id}`}
                          onClick={() => setIdCom(el.id)}
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
