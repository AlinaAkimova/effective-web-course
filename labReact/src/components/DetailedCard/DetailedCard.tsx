import React, { FC } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

// Types
import { ICard } from 'types/card';

// Components
import Footer from 'components/Footer';
import Header from 'components/Header';

// Styles
import classes from './DetailedCard.module.scss';

interface IDetailedCard {
  item?: ICard;
}

const DetailedCard: FC<IDetailedCard> = ({ item }) => {
  // const contact = useLoaderData() as ICard;
  return (
    <div className={classes.cardPage}>
      <Header />
      <div className={classes.cardContainer}>
        <div className={classes.cardText}>
          <img src={item?.cardImage} alt="img" className={classes.cardImage} />

          <div className={classes.textColumn}>
            <h1>{item?.cardName}</h1>
            <div>{item?.cardDesc}</div>
          </div>
        </div>

        <div className={classes.cardText}>
          <div className={classes.textColumn}>
            <h2>{item?.cardType === 'CHARACTER' ? 'Comics' : 'Characters'}</h2>
            <ul>
              {item?.cardType === 'CHARACTER'
                ? item?.comics?.map((el) => (
                    //     <li key={el.cardId}>
                    //       <Link to={`/comics/${el.cardId}`}>{el.cardName}</Link>
                    //     </li>
                    //   ))
                    // : item.characters?.map((el) => (
                    //     <li key={el.cardId}>
                    //       <Link to={`/characters/${el.cardId}`}>{el.cardName}</Link>
                    //     </li>
                    <li key={1}>
                      <Link to="/comics">{el.name}</Link>
                    </li>
                  ))
                : item?.series?.map((el) => (
                    <li key={1}>
                      <Link to="/comics">{el.name}</Link>
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
                      //     <li key={el.cardId}>
                      //       <Link to={`/comics/${el.cardId}`}>{el.cardName}</Link>
                      //     </li>
                      //   ))
                      // : item.series?.map((el) => (
                      //     <li key={el.cardId}>
                      //       <Link to={`/series/${el.cardId}`}>{el.cardName}</Link>
                      //     </li>
                      <li key={1}>
                        <Link to="/comics">{el.name}</Link>
                      </li>
                    ))
                  : item?.series?.map((el) => (
                      <li key={1}>
                        <Link to="/comics">{el.name}</Link>
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default DetailedCard;
