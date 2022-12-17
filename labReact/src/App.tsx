import React, { FC, useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material';
import 'language/Language';
import DarkMode, { defaultState } from 'darkMode/DarkMode';
import { router } from 'routes';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f3b13f'
    }
  }
});

const App: FC = () => {
  const [mode, setMode] = useState(localStorage.getItem('mode') ?? 'light');

  return (
    <DarkMode.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </DarkMode.Provider>
  );
};

export default App;
