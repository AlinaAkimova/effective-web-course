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

  @observable
  id: number = 0;

  @observable
  offset: number = 0;

  @observable
  load: boolean = false;

  @action
  setId = (id: number): void => {
    this.id = id;
  };

  constructor() {
    makeObservable(this);
  }

  @computed
  get comicsList() {
    return this.comics;
  }

  @action
  setOffset = (offset: number) => {
    this.offset = offset;
  };

  @action
  incrementOffset = () => {
    this.offset += 20;
  };

  @action
  setQuery = (query: string): void => {
    this.query = query;
  };

  @action
  loadComics = async (): Promise<void> => {
    try {
      const data = await getComics(this.offset);

      runInAction(() => {
        this.comics = [...this.comics, ...data];
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
