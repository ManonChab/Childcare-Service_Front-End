import React from "react";
import { Link } from "react-router";
import style from "./Menu.module.css";
import { useUser } from "../../../Context/UserContext";
import Line from "../../Atoms/Line/Line";
import Button from "../Button/Button";

const Menu = ({ items }) => {
    return (
        <section className={style.menu}>
        <main className={style.links}>
            {items.map((item, index) => {
            if (item.type === "link") {
                return (
                <Link key={index} to={item.to}>
                    {item.label}
                </Link>
                );
            }

            if (item.type === "anchor") {
                return (
                <a key={index} href={item.href}>
                    {item.label}
                </a>
                );
            }

            if (item.type === "action") {
                return (
                <button key={index} onClick={item.onClick}>
                    {item.label}
                </button>
                );
            }

            return null;
            })}
        </main>
        <Line />
        </section>
    );
};

export default Menu;
