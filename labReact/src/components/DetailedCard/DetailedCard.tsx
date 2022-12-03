import React, { FC } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

// Types
import { ICard } from 'types/card';

// Components
import Footer from 'components/Footer';
import Header from 'components/Header';

// Styles
import classes from './DetailedCard.module.scss';

const DetailedCard: FC = () => {
  const contact = useLoaderData() as ICard;

  return (
    <div className={classes.cardPage}>
      <Header />
      <div className={classes.cardContainer}>
        <div className={classes.cardText}>
          <img
            src={contact.cardImage}
            alt="img"
            className={classes.cardImage}
          />

          <div className={classes.textColumn}>
            <h1>{contact.cardName}</h1>
            <div>{contact.cardDesc}</div>
          </div>
        </div>

        <div className={classes.cardText}>
          <div className={classes.textColumn}>
            <h2>
              {contact.cardType === 'CHARACTER' ? 'Comics' : 'Characters'}
            </h2>
            <ul>
              {contact.cardType === 'CHARACTER'
                ? contact.comics?.map((el) => (
                    <li key={el.cardId}>
                      <Link to={`/comics/${el.cardId}`}>{el.cardName}</Link>
                    </li>
                  ))
                : contact.characters?.map((el) => (
                    <li key={el.cardId}>
                      <Link to={`/characters/${el.cardId}`}>{el.cardName}</Link>
                    </li>
                  ))}
            </ul>
          </div>

          <div className={classes.textColumn}>
            <h2>{contact.cardType === 'SERIES' ? 'Comics' : 'Series'}</h2>
            <div>
              <ul>
                {contact.cardType === 'SERIES'
                  ? contact.comics?.map((el) => (
                      <li key={el.cardId}>
                        <Link to={`/comics/${el.cardId}`}>{el.cardName}</Link>
                      </li>
                    ))
                  : contact.series?.map((el) => (
                      <li key={el.cardId}>
                        <Link to={`/series/${el.cardId}`}>{el.cardName}</Link>
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
