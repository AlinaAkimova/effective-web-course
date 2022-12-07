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
import { getComics } from '../api/comics';

class ComicsStore {
  @observable
  comics: ICard[] | [] = [];

  @observable
  query: string = '';

  @observable
  loading: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @computed
  get comicsList() {
    return this.comics;
  }

  @action
  setQuery = (query: string): void => {
    this.query = query;
  };

  @action
  loadComics = async (): Promise<void> => {
    try {
      const data = await getComics(1);

      runInAction(() => {
        this.comics = data;
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

const comicsStore = new ComicsStore();
export default comicsStore;
