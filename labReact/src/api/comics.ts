import axios from 'api/helpers/axios';

// Types
import { ICard, PageType } from 'types/card';

interface ICardsResponse {
  status: string;
  data: {
    total: number;
    results: [
      {
        id: number;
        title: string;
        description: string;
        thumbnail: {
          path: string;
          extension: string;
        };
        characters: {
          available: number;
          collectionURI: string;
        };
        series: {
          available: number;
          collectionURI: string;
        };
      }
    ];
  };
}

export const getComics = async (offset: number) => {
  const characters = await axios.get<ICardsResponse>('/v1/public/comics', {
    params: { offset }
  });
  return <ICard[]>characters.data.data.results.map((character) => {
    return <ICard>{
      cardId: character.id,
      cardImage: character.thumbnail.path
        .concat('/portrait_incredible.')
        .concat(character.thumbnail.extension),
      cardName: character.title,
      cardDesc: character.description,
      cardType: PageType.comics,
      characters: [],
      series: []
    };
  });
};
