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
import { getSeries, getOneSeries } from '../api/series';

class SeriesStore {
  @observable
  series: ICard[] | [] = [];

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
  get seriesList() {
    return this.series;
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
  loadSeries = async (): Promise<void> => {
    try {
      if (!this.isLoad) {
        if (this.clearSearch) {
          this.offset = 0;
          this.series = [];
          this.clearSearch = false;
        }
        const data = await getSeries(this.query, this.offset);

        runInAction(() => {
          this.series = [...this.series, ...data];
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
  loadOneSeries = async (): Promise<void> => {
    try {
      const data = await getOneSeries(this.id);
      runInAction(() => {
        this.series[this.findElement(this.id)] = data;
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
    return this.series.findIndex((element) => element.cardId === id);
  };
}

const seriesStore = new SeriesStore();
export default seriesStore;
