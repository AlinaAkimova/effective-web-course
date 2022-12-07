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

  constructor() {
    makeObservable(this);
  }

  @computed
  get seriesList() {
    return this.series;
  }

  @action
  setQuery = (query: string): void => {
    this.query = query;
  };

  @action
  loadSeries = async (): Promise<void> => {
    try {
      this.loading = true;
      const data = await getSeries(3);

      runInAction(() => {
        this.series = data;
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
