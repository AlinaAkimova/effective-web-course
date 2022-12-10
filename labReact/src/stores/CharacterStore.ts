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
  @observable
  characters: ICard[] | [] = [];

  @observable
  loading: boolean = false;

  @observable
  id: number = 0;

  @observable
  offset: number = 0;

  isLoad: boolean = false;

  @observable
  query: string = '';

  clearSearch: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @computed
  get charactersList() {
    return this.characters;
  }

  @action
  setId = (id: number): void => {
    this.id = id;
  };

  @action
  setOffset = (offset: number) => {
    this.offset = offset;
  };

  @action
  incrementOffset = () => {
    this.offset += 20;
    this.isLoad = false;
  };

  @action
  setQuery = (query: string): void => {
    this.query = query;
    this.isLoad = false;
    this.clearSearch = true;
  };

  @action
  loadCharacters = async (): Promise<void> => {
    try {
      if (!this.isLoad) {
        if (this.clearSearch) {
          this.offset = 0;
          this.characters = [];
          this.clearSearch = false;
        }
        const data = await getCharacters(this.query, this.offset);
        runInAction(() => {
          this.characters = [...this.characters, ...data];
          this.isLoad = true;
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
        this.characters[this.findElement(this.id)] = data;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  findElement = (id: number) => {
    return this.characters.findIndex((element) => element.cardId === id);
  };
}

const characterStore = new CharacterStore();
export default characterStore;
