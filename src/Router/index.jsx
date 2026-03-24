import { createBrowserRouter } from "react-router";
import Calendar from "../calendar/Calendar";
import { Layout } from "../Layout/Layout";
import { SignUp } from "../Components/Pages/SignUp/SignUp";
import { LandingPage } from "../Components/Pages/Landing/LandingPage";
import {LogInForm} from "../Components/Form/LogInForm"
import AdminReviews from "../Components/Organisms/AdminReviews/AdminReviews";
import Admin from "../Components/Pages/Admin/Admin";
import AdminEvents from "../Components/Organisms/AdminEvents/AdminEvents";

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
                    }]}
            // {
            //     path: "/Profile",
            //     Component: Profile,
            //     children:[
            //         {
            //             path: "shop",
            //             Component: Shop
            //         },
            //         {
            //             path: "myswaps",
            //             Component: MySwaps
            //         },
            //         {
            //             path: "create",
            //             Component: CreateArticle
            //         },
            //         {
            //             path:"history",
            //             Component: SwapHistory
            //         },
            //         {
            //             path: "edit/:id",
            //             Component: EditArticle
            //         }
            //     ]

            // }
        ]
    },
    
])

