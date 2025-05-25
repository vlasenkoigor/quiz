import { ThemeProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom/client';
import { StrictMode } from "react";
import './services/firebase-app';
import { RouterProvider } from 'react-router';
import { theme } from './app/theme';
import WaitAuth from './components/WaitAuth';
import { AppProvider } from '@/app/AppContext';
import { router } from '@/app/routes/routes';
import MainPage from '@/pages/main-page';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <StrictMode>
      <AppProvider>
          <WaitAuth>
          <ThemeProvider theme={theme}>
              <RouterProvider router={router} />
          </ThemeProvider>
          </WaitAuth>
      </AppProvider>,
  // </StrictMode>

);
