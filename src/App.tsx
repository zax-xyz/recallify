import 'twin.macro';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// eslint-disable-next-line prettier/prettier
import NavBar from "components/Navbar";
import Landing from 'pages/landing';
import Receipts from 'pages/receipts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/receipts',
    element: <Receipts />,
  },
]);

const App = () => (
  <div tw="flex flex-col bg-gray-100 h-screen">
    <main tw="flex flex-col gap-4 flex-1 p-9">
      <RouterProvider router={router} />
    </main>
    <NavBar />
  </div>
);

export default App;
