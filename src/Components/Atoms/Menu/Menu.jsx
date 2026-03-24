import React from 'react'
import { Link } from 'react-router'
import style from "./Menu.module.css"
import { useUser } from "../../../Context/UserContext";
import Line from "../../Atoms/Line/Line"
import Button from '../Button/Button';

const Menu = () => {
    const { user } = useUser();

    const scrollTo = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    };

    const isLoggedIn = !!user;
    return (
    <>
        <section>
        </section>
        {!isLoggedIn ? (
        <section className={style.menu}>
            <main className={style.links}>
                <a href="#about">About Me</a>
                <a href="#reviews">Recommendations</a>
                <a href="#contact">Contact</a>
            </main>
            <Line className={style.line}/>
        </section>
        ) : (
        <section className={style.menu}>
            <main className={style.links}>
                <Link to="/calendar">Calendar</Link>
                <a href="#about">About Me</a>
                <a href="#reviews">Recommendations</a>
                <Link to="/">Profile</Link>
            </main>
            <Line/>
        </section>
        )}
    </>
    );
};

export default Menu