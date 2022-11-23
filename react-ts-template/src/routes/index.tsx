// В этом файле массив со всем путями / роутами приложения
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Header from 'routes/Header';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />
  }
]);

export default router;
