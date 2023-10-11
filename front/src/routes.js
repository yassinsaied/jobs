import { Navigate, useRoutes } from 'react-router-dom';

// @redux
import { useSelector } from 'react-redux';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import AllProfiles from './pages/AllProfilesPage';

// ----------------------------------------------------------------------

export default function Router() {
  const { isLogged } = useSelector((state) => state.auth);

  const protectedRoute = (component) => (isLogged ? component : <LoginPage />);

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: protectedRoute(<DashboardLayout />),
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'myprofile', element: <ProfilePage /> },
        { path: 'allprofiles', element: <AllProfiles /> },
      ],
    },
    {
      path: 'login',
      element: !isLogged ? <LoginPage /> : <Navigate to="/dashboard/app" />,
    },
    {
      element: protectedRoute(<SimpleLayout />),
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
