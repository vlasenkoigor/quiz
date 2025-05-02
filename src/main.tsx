import {ThemeProvider} from '@mui/material/styles';
import ReactDOM from 'react-dom/client'
import './services/firebase-app.ts'
import {
    RouterProvider,
} from "react-router-dom";
import {theme} from "./app/theme.ts";
import WaitAuth from "./components/WaitAuth.tsx";
import {AppProvider} from "@/app/AppContext.tsx";
import {router} from "@/app/routes/routes.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AppProvider>
        <WaitAuth>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </WaitAuth>

    </AppProvider>
)

