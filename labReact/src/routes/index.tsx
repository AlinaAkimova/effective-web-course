import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

// Components
import DetailedCard from 'components/DetailedCard';

// Stores
import characterStore from 'stores/CharacterStore';
import comicsStore from 'stores/ComicsStore';
import seriesStore from 'stores/SeriesStore';

// Routes
import CharactersContainer from 'routes/Characters/CharactersContainer';
import ComicsContainer from 'routes/Comics/ComicsContainer';
import SeriesContainer from './Series/SeriesContainer';
import CharacterDetailed from './Characters/CharacterDetailed';

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
    // loader: ({ params }) => {
    //   return characterStore.charactersList.find(
    //     (element) => element.cardId === Number(params.characterId)
    //   );
    // }
  },
  {
    path: '/comics',
    element: <ComicsContainer />
  },
  {
    path: '/comics/:comicsId',
    element: <DetailedCard />,
    loader: ({ params }) => {
      return comicsStore.comicsList.find(
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
      return seriesStore.seriesList.find(
        (element) => element.cardId === Number(params.seriesId)
      );
    }
  }
]);
