import { createContext } from 'react';

interface IMode {
  mode: string;
  setMode(mode: string): void;
}

const defaultState = {
  mode: 'light',
  setMode: () => 'dark'
};

const DarkMode = createContext<IMode>(defaultState);
export default DarkMode;
