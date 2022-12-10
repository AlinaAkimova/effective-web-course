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
import { getComics, getOneComics } from '../api/comics';

class ComicsStore {
  @observable
  comics: ICard[] | [] = [];

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
  get comicsList() {
    return this.comics;
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
  loadComics = async (): Promise<void> => {
    try {
      if (!this.isLoad) {
        if (this.clearSearch) {
          this.offset = 0;
          this.comics = [];
          this.clearSearch = false;
        }
        const data = await getComics(this.query, this.offset);

        runInAction(() => {
          this.comics = [...this.comics, ...data];
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
  loadOneComics = async (): Promise<void> => {
    try {
      const data = await getOneComics(this.id);
      runInAction(() => {
        this.comics[this.findElement(this.id)] = data;
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
    return this.comics.findIndex((element) => element.cardId === id);
  };
}

const comicsStore = new ComicsStore();
export default comicsStore;
