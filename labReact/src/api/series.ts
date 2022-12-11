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
          items: [{ resourceURI: string; name: string }];
        };
        comics: {
          items: [{ resourceURI: string; name: string }];
        };
      }
    ];
  };
}

export const getSeries = (
  query: string,
  offset: number
): Promise<{ series: ICard[]; total: number; error: boolean }> => {
  return axios
    .get<ISeriesResponse>(
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
    )
    .then((series) => {
      return { series: <ICard[]>series.data.data.results.map((seriesOne) => {
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
        }), total: series.data.data.total, error: false };
    })
    .catch(() => {
      return { series: [], total: 0, error: true };
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
    comics: series.data.data.results[0].comics.items.map((item) => {
      return {
        id: Number(item.resourceURI.split('/').at(-1)),
        name: item.name
      };
    }),
    characters: series.data.data.results[0].characters.items.map((item) => {
      return {
        id: Number(item.resourceURI.split('/').at(-1)),
        name: item.name
      };
    })
  };
};
