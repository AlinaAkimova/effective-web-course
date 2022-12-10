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
  query: string = '';

  @observable
  loading: boolean = false;

  @observable
  id: number = 0;

  @observable
  offset: number = 0;

  constructor() {
    makeObservable(this);
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
  };

  @computed
  get charactersList() {
    return this.characters;
  }

  @action
  setQuery = (query: string): void => {
    this.query = query;
  };

  @action
  loadCharacters = async (): Promise<void> => {
    try {
      const data = await getCharacters(this.offset);
      runInAction(() => {
        this.characters = [...this.characters, ...data];
      });
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
        this.characters[this.id] = data;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}

const characterStore = new CharacterStore();
export default characterStore;
