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
  const series = await axios.get<ISeriesResponse>(
    '/v1/public/series',
    query
      ? {
          params: {
            offset,
            titleStartsWith: query
          }
        }
      : {
          params: {
            offset
          }
        }
  );
  return <ICard[]>series.data.data.results.map((seriesOne) => {
    return <ICard>{
      cardId: seriesOne.id,
      cardImage: seriesOne.thumbnail.path
        .concat('/portrait_incredible.')
        .concat(seriesOne.thumbnail.extension),
      cardName: seriesOne.title,
      cardDesc: seriesOne.description,
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
    cardType: PageType.series,
    comics: series.data.data.results[0].comics.items,
    characters: series.data.data.results[0].characters.items
  };
};
