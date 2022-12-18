export interface ICard {
  cardId: number;
  cardImage: string;
  cardName: string;
  cardDesc: string;
  cardType: PageType;
  characters?: CardList[];
  comics?: CardList[];
  series?: CardList[];
  favorite: boolean;
}

export enum PageType {
  character = 'characters',
  comics = 'comics',
  series = 'series'
}

export type CardList = {
  id: number;
  name: string;
};
