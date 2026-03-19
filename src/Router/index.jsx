import { createBrowserRouter } from "react-router";
import Calendar from "../calendar/Calendar";
import { Layout } from "../Layout/Layout";

export const router = createBrowserRouter ([
    {
        path: "/",
        Component: Layout,
        children: [
            {
                index: true,
                Component: Calendar
            },
            // {
            //     path: "calendar",
            //     Component: Calendar
            // },
            // {
            //     path: "/SignUp",
            //     Component: SignUp
            // },
            // {
            //     path: "/LogIn",
            //     Component: LogIn
            // },
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

