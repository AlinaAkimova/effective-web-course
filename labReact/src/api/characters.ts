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
        name: string;
        description: string;
        thumbnail: {
          path: string;
          extension: string;
        };
        comics: {
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

export const getCharacters = async (offset: number) => {
  const characters = await axios.get<ICardsResponse>('/v1/public/characters', {
    params: { offset }
  });
  return <ICard[]>characters.data.data.results.map((character) => {
    return <ICard>{
      cardId: character.id,
      cardImage: character.thumbnail.path
        .concat('/portrait_incredible.')
        .concat(character.thumbnail.extension),
      cardName: character.name,
      cardDesc: character.description,
      cardType: PageType.character,
      series: [],
      comics: []
    };
  });
};
