import React from 'react'
import AdminReviews from '../../Organisms/AdminReviews/AdminReviews'
import Button from '../../Atoms/Button/Button'
import { Outlet } from "react-router";
import Logo from '../../Atoms/Logo/Logo';
import style from "../Admin/AdminPage.module.css"
import Menu from "../../Atoms/Menu/Menu"
import Title from '../../Atoms/Title/Title';

const adminMenu = [
  { type: "link", to: "events", label: "Slots" },
  { type: "link", to: "reviews", label: "Reviews" },
  { type: "link", to: "clients", label: "Clients" },
  { type: "link", to: "Messages", label: "Messages" },
  { type: "link", to: "Settings", label: "Settings" },
];

const Admin = () => {
  return (
    <main className={style.main}>
      <Logo />
      <Title title="Admin" />
      <Menu items={adminMenu} />
      <Outlet />
    </main>
  );
};

export default Admin