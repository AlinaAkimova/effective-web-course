// В этом файле массив со всем путями / роутами приложения
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Container from 'routes/container';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Container />
  }
]);

export default router;
