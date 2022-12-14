import React, { FC } from 'react';
import { RouterProvider } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material';

import { router } from 'routes';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f3b13f'
    }
  }
});

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
