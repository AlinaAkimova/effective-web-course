import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction
} from 'mobx';

// Types
import { ICard } from 'types/card';

// API
import { getCharacter, getCharacters } from '../api/characters';

class CharacterStore {
  constructor() {
    makeObservable(this);
  }

  @observable
  characters: ICard[] = [];

  @observable
  character: ICard | undefined = undefined;

  @observable
  id: number = Number(localStorage.getItem('characterId')) ?? 0;

  @observable
  offset: number = 0;

  isLoad: boolean = false;

  @observable
  favorites: ICard[] = JSON.parse(
    localStorage.getItem('charactersFavorites') ?? '[]'
  );

  @observable
  query: string = '';

  @observable
  total: number = 0;

  @observable
  error: boolean = false;

  @observable
  loading: boolean = false;

  @computed
  get charactersList() {
    return this.characters;
  }

  @action
  setId = (id: number): void => {
    this.id = id;
    localStorage.setItem('characterId', String(this.id));
  };

  @action
  setOffset = (offset: number) => {
    this.offset = offset;
  };

  @action
  setFavorites = (favorite: ICard, func: boolean) => {
    if (func) {
      this.favorites.push({ ...favorite, favorite: func });
    } else {
      this.favorites.splice(
        this.favorites.findIndex((card) => {
          return card.cardId === favorite.cardId;
        }),
        1
      );
    }
    const index = this.characters.findIndex((card) => {
      return card.cardId === favorite.cardId;
    });
    if (index !== -1) {
      this.updateFavoriteInArray(this.characters, index, favorite, func);
    }
    localStorage.setItem('charactersFavorites', JSON.stringify(this.favorites));
  };

  @action
  incrementOffset = () => {
    this.offset += 20;
    this.isLoad = false;
  };

  @action
  setQuery = (query: string): void => {
    if (query !== this.query) {
      this.query = query;
      this.isLoad = false;
      this.offset = 0;
      this.characters = [];
    }
  };

  @action
  loadCharacters = async (): Promise<void> => {
    try {
      if (!this.isLoad) {
        const data = await getCharacters(this.query, this.offset);
        const favArr = data.characters.map((item) => {
          return this.favorites.findIndex((card) => {
            return card.cardId === item.cardId;
          }) === -1
            ? item
            : { ...item, favorite: true };
        });
        runInAction(() => {
          this.loading = true;
          this.characters = [...this.characters, ...favArr];
          this.isLoad = true;
          this.total = data.total;
          this.error = data.error;
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action
  loadCharacter = async (): Promise<void> => {
    try {
      const data = await getCharacter(this.id);
      runInAction(() => {
        this.character = data;
      });
    } catch (error) {
      console.error(error);
    }
  };

  updateFavoriteInArray = (
    cards: ICard[],
    index: number,
    favorite: ICard,
    func: boolean
  ) => {
    cards.splice(index, 1, { ...favorite, favorite: func });
  };
}

const characterStore = new CharacterStore();
export default characterStore;
