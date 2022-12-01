import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Components
import DetailedCard from 'components/DetailedCard';

// Routes
import CharactersContainer from 'routes/Characters/CharactersContainer';
import ComicsContainer from 'routes/Comics/ComicsContainer';
import { characters, comics, series } from './Dependencies/Dependencies';
import SeriesContainer from './Series/SeriesContainer';

export const router = createBrowserRouter([
  {
    index: true,
    element: <Navigate to="characters" />
  },
  {
    path: '/characters',
    element: <CharactersContainer />
  },
  {
    path: '/characters/:characterId',
    element: <DetailedCard />,
    loader: ({ params }) => {
      console.log(params.characterId);
      return characters.find(
        (element) => element.cardId === Number(params.characterId)
      );
    }
  },
  {
    path: '/comics',
    element: <ComicsContainer />
  },
  {
    path: '/comics/:comicsId',
    element: <DetailedCard />,
    loader: ({ params }) => {
      console.log(params.comicsId);
      return comics.find(
        (element) => element.cardId === Number(params.comicsId)
      );
    }
  },
  {
    path: '/series',
    element: <SeriesContainer />
  },
  {
    path: '/series/:seriesId',
    element: <DetailedCard />,
    loader: ({ params }) => {
      console.log(params.seriesId);
      return series.find(
        (element) => element.cardId === Number(params.seriesId)
      );
    }
  }
]);
