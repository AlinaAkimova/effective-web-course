import React, { FC } from 'react';
import { createBrowserRouter, Navigate, useRoutes } from 'react-router-dom';

// Components
import DetailedCard from 'components/DetailedCard';

// Routes
import CharactersContainer from 'routes/Characters/CharactersContainer';
import ComicsContainer from 'routes/Comics/ComicsContainer';
import { characters } from './Dependencies/Dependencies';
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
    path: '/series',
    element: <SeriesContainer />
  }
]);
