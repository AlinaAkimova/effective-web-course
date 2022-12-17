import React, { FC, useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material';

// Language
import 'language/Language';

// Context
import DarkMode from 'darkMode/DarkMode';

// Routes
import { router } from 'routes';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f3b13f'
    }
  }
});

const App: FC = () => {
  const [mode, setMode] = useState(localStorage.getItem('theme') ?? 'light');

  return (
    <DarkMode.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </DarkMode.Provider>
  );
};

export default App;
