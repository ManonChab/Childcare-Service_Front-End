import React from 'react'
import AdminReviews from '../../Organisms/AdminReviews/AdminReviews'
import Button from '../../Atoms/Button/Button'
import { Outlet } from "react-router";
import Logo from '../../Atoms/Logo/Logo';




const Admin = () => {
  return (
    <main >
        <Logo/>
        <Button to="reviews" label="REVIEWS" />
        <Button to="events" label="SLOTS" />
        <Outlet/>
    </main>
  )
}

export default Admin