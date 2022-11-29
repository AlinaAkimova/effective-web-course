import React, { FC } from 'react';
import { useLoaderData } from 'react-router-dom';

// Types
import { ICard } from 'types/card';

// Styles
import classes from './DetailedCard.module.scss';

const DetailedCard: FC = () => {
  const contact = useLoaderData() as ICard;
  console.log(contact);
  return (
    <div className={classes.cardContainer}>
      <img src={contact.cardImage} alt="img" />

      <div className={classes.cardText}>
        <div className={classes.textColumn}>
          <div className={classes.redText}>{contact.cardName}</div>
          <div>{contact.cardDesc}</div>
        </div>

        <div className={classes.textColumn}>
          <div className={classes.redText}>{contact.cardName}</div>
          <div>{contact.cardDesc}</div>
        </div>

        <div className={classes.textColumn}>
          <div className={classes.redText}>{contact.cardName}</div>
          <div>{contact.cardDesc}</div>
        </div>
      </div>
    </div>
  );
};
export default DetailedCard;
