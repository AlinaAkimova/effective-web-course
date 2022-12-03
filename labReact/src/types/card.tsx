export interface ICard {
  cardId: number;
  cardImage: string;
  cardName: string;
  cardDesc: string;
  cardType: PageType;
  characters?: ICard[];
  comics?: ICard[];
  series?: ICard[];
}

export enum PageType {
  character = 'CHARACTER',
  comics = 'COMICS',
  series = 'SERIES'
}
