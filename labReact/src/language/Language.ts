import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      characters: 'Characters',
      series: 'Series',
      comics: 'Comics',
      SearchCh: 'Search for characters by name',
      SearchCom: 'Search for comics by name',
      SearchS: 'Search for series by name',
      FavComics: 'My favorite Comics',
      FavCharacters: 'My favorite Characters',
      FavSeries: 'My favorite Series',
      FavEmpty: 'Your favorites section is empty',
      Footer: 'Data provided by Marvel',
      Loading: 'Loading',
      Error: 'Something went wrong... Please, try later'
    }
  },
  ru: {
    translation: {
      characters: 'Персонажи',
      series: 'Фильмы',
      comics: 'Комиксы',
      SearchCh: 'Найдите персонажа по имени',
      SearchCom: 'Найдите комикс по имени',
      SearchS: 'Найдите фильм по имени',
      FavComics: 'Любимые комиксы',
      FavCharacters: 'Любимые персонажи',
      FavSeries: 'Любимые фильмы',
      FavEmpty: 'Пока нет избранного! Добавьте что-нибудь!',
      Footer: 'Данные предоставлены Marvel',
      Loading: 'Загрузка',
      Error: 'Что-то пошло не так... Пожалуйста, повторите попытку позже'
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') ?? 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
