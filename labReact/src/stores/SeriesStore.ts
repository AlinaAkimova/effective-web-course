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
import { getSeries } from '../api/series';

class SeriesStore {
  @observable
  series: ICard[] | [] = [];

  @observable
  query: string = '';

  @observable
  loading: boolean = false;

  @observable
  offset: number = 0;

  constructor() {
    makeObservable(this);
  }

  @observable
  id: number = 0;

  @action
  setId = (id: number): void => {
    this.id = id;
  };

  @computed
  get seriesList() {
    return this.series;
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
  loadSeries = async (): Promise<void> => {
    try {
      this.loading = true;
      const data = await getSeries(this.offset);

      runInAction(() => {
        this.series = [...this.series, ...data];
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

const seriesStore = new SeriesStore();
export default seriesStore;
