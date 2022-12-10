import axios from 'api/helpers/axios';

// Types
import { ICard, PageType } from 'types/card';

interface ICharactersResponse {
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
          items: [{ resourceURI: string; name: string }];
        };
        series: {
          available: number;
          collectionURI: string;
          items: [{ resourceURI: string; name: string }];
        };
      }
    ];
  };
}

export const getCharacters = async (
  query: string,
  offset: number
): Promise<{ characters: ICard[]; total: number }> => {
  const characters = await axios.get<ICharactersResponse>(
    '/v1/public/characters',
    query
      ? {
          params: {
            offset,
            nameStartsWith: query
          }
        }
      : {
          params: {
            offset
          }
        }
  );
  return { characters: <ICard[]>characters.data.data.results.map(
      (character) => {
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
      }
    ), total: characters.data.data.total };
};

export const getCharacter = async (characterId: number) => {
  const characters = await axios.get<ICharactersResponse>(
    `/v1/public/characters/${characterId}`
  );
  return <ICard>{
    cardId: characters.data.data.results[0].id,
    cardImage: characters.data.data.results[0].thumbnail.path
      .concat('/portrait_incredible.')
      .concat(characters.data.data.results[0].thumbnail.extension),
    cardName: characters.data.data.results[0].name,
    cardDesc: characters.data.data.results[0].description,
    cardType: PageType.character,
    series: characters.data.data.results[0].series.items.map((item) => {
      return {
        id: Number(item.resourceURI.split('/').at(-1)),
        name: item.name
      };
    }),
    comics: characters.data.data.results[0].comics.items.map((item) => {
      return {
        id: Number(item.resourceURI.split('/').at(-1)),
        name: item.name
      };
    })
  };
};
