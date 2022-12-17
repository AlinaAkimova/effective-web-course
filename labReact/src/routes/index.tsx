import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Routes
import CharactersContainer from 'routes/Characters/CharactersContainer';
import ComicsContainer from 'routes/Comics/ComicsContainer';
import SeriesContainer from './Series/SeriesContainer';
import CharacterDetailed from './Characters/CharacterDetailed';
import ComicsDetailed from './Comics/ComicsDetailed';
import SeriesDetailed from './Series/SeriesDetailed';
import Favorites from './Favorites/Favorites';

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
    element: <CharacterDetailed />
  },
  {
    path: '/comics',
    element: <ComicsContainer />
  },
  {
    path: '/comics/:comicsId',
    element: <ComicsDetailed />
  },
  {
    path: '/series',
    element: <SeriesContainer />
  },
  {
    path: '/series/:seriesId',
    element: <SeriesDetailed />
  },
  {
    path: '/favorites',
    element: <Favorites />
  }
]);
