import axios from 'api/helpers/axios';

// Types
import { ICard, PageType } from 'types/card';

interface IComicsResponse {
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

export const getComics = async (query: string, offset: number) => {
  const characters = await axios.get<IComicsResponse>(
    '/v1/public/comics',
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

export const getOneComics = async (comicsId: number) => {
  const comics = await axios.get<IComicsResponse>(
    `/v1/public/comics/${comicsId}`
  );
  return <ICard>{
    cardId: comics.data.data.results[0].id,
    cardImage: comics.data.data.results[0].thumbnail.path
      .concat('/portrait_incredible.')
      .concat(comics.data.data.results[0].thumbnail.extension),
    cardName: comics.data.data.results[0].title,
    cardDesc: comics.data.data.results[0].description,
    cardType: PageType.character,
    series: comics.data.data.results[0].series.items,
    characters: comics.data.data.results[0].characters.items
  };
};
