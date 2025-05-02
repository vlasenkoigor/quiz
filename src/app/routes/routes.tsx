import {createBrowserRouter, Navigate, Outlet} from "react-router-dom";
import App from "@/app/App.tsx";
import Main from "@/components/Main.tsx";
import Profile from "@/pages/Profile.tsx";
import PlayModule from "@/pages/play/PlayModule.tsx";
import {PlayLesson, Quiz} from "@mui/icons-material";
import PlayQuiz from "@/pages/play/PlayQuiz.tsx";
import Login from "@/pages/Login.tsx";
import Admin from "@/pages/Admin.tsx";
import {AdminModuleListProvider} from "@/providers/admin-module-list-context.tsx";
import {AdminModules} from "@/pages/admin/AdminModules.tsx";
import {Lesson} from "@/components/Lesson.tsx";
import Gallery from "@/components/gallery/Gallery.tsx";
import {useAppContext} from "@/app/AppContext.tsx";
import {UIMatch} from "@remix-run/router";
import EditModule from "@/pages/admin/EditModule.tsx";
import {AdminModuleProvider} from "@/providers/admin-module-provider.tsx";
import * as React from "react";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <Main/>,
            },
            {
                path: "Profile",
                element: <Profile/>,
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
                        element: <PlayModule/>,
                    },
                    {
                        path: 'module/:moduleId/lessons/:lessonId',
                        element: <PlayLesson/>,
                    },
                    {
                        path: 'module/:moduleId/quizzes/:quizId',
                        element: <PlayQuiz/>,
                    }
                ]
            },
            {
                element: <NonAuthLayout/>,
                children: [
                    {
                        path: "sign-in",
                        element: <Login mode={'signIn'}/>,
                    },
                    {
                        path: "sign-up",
                        element: <Login mode={'signUp'}/>,
                    },
                ],
            },


        ],
    },

    {
        element: <AuthLayout/>,
        children: [
            {
                path: "admin",
                element: <Admin/>,
                children: [
                    {
                        path: "modules",
                        element: <AdminModuleListProvider><AdminModules/></AdminModuleListProvider>,
                    },
                    {
                        path: "modules/:moduleId",
                        element:<AdminModuleProvider>
                            <EditModule/>
                        </AdminModuleProvider>
                    },
                    {
                        path: "modules/:id/lessons/:lessonId",
                        element: <Lesson/>,
                    },
                    {
                        path: "modules/:id/quizzes/:quizId",
                        element: <Quiz/>,
                    },
                    {
                        path: "gallery",
                        element: <Gallery selectionMode={true} onClose={() => {
                        }}/>,
                    },
                ],
            }
        ],
    },
]);


function AuthLayout() {
    const {state} = useAppContext();

    console.log('AuthLayout', state)

    return (useAppContext().state.user) ? <Outlet/> : <Navigate to='/'/>;
}

function NonAuthLayout() {
    return (useAppContext().state.user ? <Navigate to='/'/> : <Outlet/>);
}


export type RouteHandle = { crumb: (math: UIMatch) => { link: string, text: string, isLast: boolean }[] }