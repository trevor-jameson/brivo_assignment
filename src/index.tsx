import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import './index.css';
import App from './App';

import Dashboard from './components/Dashboard';
import Forecasts from './components/Forecasts';
import Settings from './components/Settings';

import ErrorPage from './routes/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        errorElement: <ErrorPage />
      },
      {
        path: "/forecasts",
        element: <Forecasts />,
        errorElement: <ErrorPage />
      },      
      {
        path: "/settings",
        element: <Settings />,
        errorElement: <ErrorPage />
      },
    ],
  },

]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
