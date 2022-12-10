import axios from 'api/helpers/axios';

// Types
import { ICard, PageType } from 'types/card';

interface ISeriesResponse {
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
        comics: {
          available: number;
          collectionURI: string;
          items: [{ resourceURI: string; name: string }];
        };
      }
    ];
  };
}

export const getSeries = async (query: string, offset: number) => {
  const characters = await axios.get<ISeriesResponse>(
    '/v1/public/series',
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
      cardType: PageType.series,
      characters: [],
      comics: []
    };
  });
};

export const getOneSeries = async (seriesId: number) => {
  const series = await axios.get<ISeriesResponse>(
    `/v1/public/series/${seriesId}`
  );
  return <ICard>{
    cardId: series.data.data.results[0].id,
    cardImage: series.data.data.results[0].thumbnail.path
      .concat('/portrait_incredible.')
      .concat(series.data.data.results[0].thumbnail.extension),
    cardName: series.data.data.results[0].title,
    cardDesc: series.data.data.results[0].description,
    cardType: PageType.character,
    comics: series.data.data.results[0].comics.items,
    characters: series.data.data.results[0].characters.items
  };
};
