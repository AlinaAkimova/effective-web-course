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

  @action
  setId = (id: number): void => {
    this.id = id;
  };

  constructor() {
    makeObservable(this);
  }

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
      const data = await getCharacters(0);
      runInAction(() => {
        this.characters = data;
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
