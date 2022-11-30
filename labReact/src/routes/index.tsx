import React, { FC } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// Routes
import CharactersContainer from 'routes/Characters/CharactersContainer';
import ComicsContainer from 'routes/Comics/ComicsContainer';
import SeriesContainer from './Series/SeriesContainer';

const Router: FC = () => {
  const router = useRoutes([
    {
      index: true,
      element: <Navigate to="characters" />
    },
    {
      path: '/characters',
      element: <CharactersContainer />
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

  return router;
};
export default Router;
