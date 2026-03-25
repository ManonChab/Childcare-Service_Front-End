import { createBrowserRouter } from "react-router";
import Calendar from "../calendar/Calendar";
import { Layout } from "../Layout/Layout";
import { SignUp } from "../Components/Pages/SignUp/SignUp";
import { LandingPage } from "../Components/Pages/Landing/LandingPage";
import {LogInForm} from "../Components/Form/LogInForm"
import AdminReviews from "../Components/Organisms/AdminReviews/AdminReviews";
import Admin from "../Components/Pages/Admin/AdminPage";
import AdminEvents from "../Components/Organisms/AdminEvents/AdminEvents";
import Clients from "../Components/Organisms/Clients/Clients";
import Messages from "../Components/Organisms/Messages/Messages";
import Settings from "../Components/Organisms/Settings/Settings";

export const router = createBrowserRouter ([
    {
        path: "/",
        Component: Layout,
        children: [
            {
                index: true,
                Component: LandingPage
            },
            {
                path: "calendar",
                Component: Calendar
            },
            {
                path: "/SignUp",
                Component: SignUp
            },
            {
                path: "/LogIn",
                Component: LogInForm
            },
                        {
                path: "/Admin",
                Component: Admin,
                children:[
                    {
                        path: "reviews",
                        Component: AdminReviews
                    },
                    {
                        path: "events",
                        Component: AdminEvents
                    },
                    {
                        path: "clients",
                        Component: Clients
                    },
                    {
                        path: "messages",
                        Component: Messages
                    },
                    {
                        path: "settings",
                        Component: Settings
                    }]}
        ]
    },
    
])

