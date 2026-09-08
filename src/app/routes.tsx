import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/src/components/layout/RootLayout';
import HomePage from '@/src/pages/HomePage';
import WorkPage from '@/src/pages/WorkPage';
import ProjectDetailPage from '@/src/pages/ProjectDetailPage';
import AboutPage from '@/src/pages/AboutPage';
import ContactPage from '@/src/pages/ContactPage';
import NotFoundPage from '@/src/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'work', element: <WorkPage /> },
      { path: 'work/:slug', element: <ProjectDetailPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
