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
  character: ICard | undefined = undefined;

  @observable
  id: number = Number(localStorage.getItem('characterId')) ?? 0;

  @observable
  offset: number = 0;

  isLoad: boolean = false;

  @observable
  query: string = '';

  @observable
  total: number = 0;

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
    localStorage.setItem('characterId', String(this.id));
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
          this.characters = [...this.characters, ...data.characters];
          this.isLoad = true;
          this.total = data.total;
        });
      }
    } catch (error) {
      console.error(error);
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
}

const characterStore = new CharacterStore();
export default characterStore;
