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
  oneComics: ICard | undefined = undefined;

  @observable
  id: number = Number(localStorage.getItem('comicsId')) ?? 0;

  @observable
  offset: number = 0;

  isLoad: boolean = false;

  @observable
  query: string = '';

  @observable
  total: number = 0;

  @observable
  error: boolean = false;

  @observable
  loading: boolean = false;

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
    localStorage.setItem('comicsId', String(this.id));
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
    if (query !== this.query) {
      this.query = query;
      this.isLoad = false;
      this.offset = 0;
      this.comics = [];
    }
  };

  @action
  loadComics = async (): Promise<void> => {
    try {
      if (!this.isLoad) {
        const data = await getComics(this.query, this.offset);

        runInAction(() => {
          this.loading = true;
          this.comics = [...this.comics, ...data.comics];
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
  loadOneComics = async (): Promise<void> => {
    try {
      const data = await getOneComics(this.id);
      runInAction(() => {
        this.oneComics = data;
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
}

const comicsStore = new ComicsStore();
export default comicsStore;
