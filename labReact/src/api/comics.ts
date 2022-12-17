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
          items: [{ resourceURI: string; name: string }];
        };
        series: {
          resourceURI: string;
          name: string;
        };
      }
    ];
  };
}

export const getComics = (
  query: string,
  offset: number
): Promise<{ comics: ICard[]; total: number; error: boolean }> => {
  return axios
    .get<IComicsResponse>(
      '/v1/public/comics',
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
    .then((comics) => {
      return { comics: <ICard[]>comics.data.data.results.map((comicsOne) => {
          return <ICard>{
            cardId: comicsOne.id,
            cardImage: comicsOne.thumbnail.path
              .concat('/portrait_incredible.')
              .concat(comicsOne.thumbnail.extension),
            cardName: comicsOne.title,
            cardDesc: comicsOne.description,
            cardType: PageType.comics,
            characters: [],
            series: [],
            favorite: false
          };
        }), total: comics.data.data.total, error: false };
    })
    .catch(() => {
      return { comics: [], total: 0, error: true };
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
    cardType: PageType.comics,
    series: [
      {
        id: Number(
          comics.data.data.results[0].series.resourceURI.split('/').at(-1)
        ),
        name: comics.data.data.results[0].series.name
      }
    ],

    characters: comics.data.data.results[0].characters.items.map((item) => {
      return {
        id: Number(item.resourceURI.split('/').at(-1)),
        name: item.name
      };
    })
  };
};
