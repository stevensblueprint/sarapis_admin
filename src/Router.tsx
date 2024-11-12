import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import OrganizationForm from './OrganizationForm';
import { HomePage } from './pages/Home.page';

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
