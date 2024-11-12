import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import OrganizationForm from './OrganizationForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/organization-form',
    element: <OrganizationForm />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
