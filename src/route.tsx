import { createBrowserRouter } from 'react-router-dom';
import Table from './components/searchable-table/Table';
import App from './App';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // children: [
    //   {
    //     path: "/searchable-table",
    //     element: <Table />
    //   }
    // ]
  },
  {
    path: "/searchable-table",
    element: <Table />
  }
]);