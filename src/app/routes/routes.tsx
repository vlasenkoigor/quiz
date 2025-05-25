import { createBrowserRouter, Navigate, Outlet } from 'react-router';
import App from '@/app/App';
import MainPage from '@/pages/main-page';
import Profile from '@/pages/Profile';
import PlayModule from '@/pages/play/PlayModule';
import PlayQuiz from '@/pages/play/PlayQuiz';
import Login from '@/pages/Login';
import Admin from '@/pages/Admin';
import { AdminModuleListProvider } from '@/providers/admin-module-list-context';
import { AdminModules } from '@/pages/admin/AdminModules';
import { Lesson } from '@/components/Lesson';
import Gallery from '@/components/gallery/Gallery';
import { useAppContext } from '@/app/AppContext';
import EditModule from '@/pages/admin/EditModule';
import { AdminModuleProvider } from '@/providers/admin-module-provider';
import { Quiz } from '@/components/Quiz';
import PlayLesson from '@/pages/play/PlayLesson';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'Profile',
        element: <Profile />,
      },
      // {
      //     path: "modules/:id",
      //     element: <EditModulePage/>,
      // },
      {
        path: 'play',
        children: [
          {
            path: 'module/:moduleId',
            element: <PlayModule />,
          },
          {
            path: 'module/:moduleId/lessons/:lessonId',
            element: <PlayLesson />,
          },
          {
            path: 'module/:moduleId/quizzes/:quizId',
            element: <PlayQuiz />,
          },
        ],
      },
      {
        element: <NonAuthLayout />,
        children: [
          {
            path: 'sign-in',
            element: <Login mode={'signIn'} />,
          },
          {
            path: 'sign-up',
            element: <Login mode={'signUp'} />,
          },
        ],
      },
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      {
        path: 'admin',
        element: <Admin />,
        children: [
          {
            path: 'modules',
            element: (
              <AdminModuleListProvider>
                <AdminModules />
              </AdminModuleListProvider>
            ),
          },
          {
            path: 'modules/:moduleId',
            element: (
              <AdminModuleProvider>
                <EditModule />
              </AdminModuleProvider>
            ),
          },
          {
            path: 'modules/:id/lessons/:lessonId',
            element: <Lesson />,
          },
          {
            path: 'modules/:id/quizzes/:quizId',
            element: <Quiz />,
          },
          {
            path: 'gallery',
            element: <Gallery selectionMode={true} onClose={() => {}} />,
          },
        ],
      },
    ],
  },
]);

function AuthLayout() {
  const { state } = useAppContext();

  console.log('AuthLayout', state);

  return useAppContext().state.user ? <Outlet /> : <Navigate to="/" />;
}

function NonAuthLayout() {
  return useAppContext().state.user ? <Navigate to="/" /> : <Outlet />;
}

export type RouteHandle = { crumb: (math: any) => { link: string; text: string; isLast: boolean }[] };
