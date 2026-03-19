import { Outlet } from 'react-router';
import React, { useState } from 'react';
import style from "./Layout.module.css"
import UserProvider from '../Context/UserProvider';

export function Layout() {

return (
    <>
        <UserProvider>
            <section className={style.outlet}>
                <Outlet/>
            </section>
        </UserProvider>
    </>
);
}