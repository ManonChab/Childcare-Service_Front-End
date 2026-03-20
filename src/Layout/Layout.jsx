import { Outlet } from 'react-router';
import React, { useState } from 'react';
import style from "./Layout.module.css"
import UserProvider from '../Context/UserProvider';
import { ThemeProvider, CssBaseline } from '@mui/material';
import {theme} from "../Context/Theme/ThemeContext"

export function Layout() {

return (
    <>
        <UserProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                    <section className={style.outlet}>
                        <Outlet/>
                    </section>
            </ThemeProvider>
        </UserProvider>
    </>
);
}