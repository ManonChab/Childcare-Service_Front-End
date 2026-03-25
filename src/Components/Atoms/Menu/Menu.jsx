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

// const Menu = () => {
//     const { user } = useUser();

//     const scrollTo = (id) => {
//     const element = document.getElementById(id);
//     element?.scrollIntoView({ behavior: "smooth" });
//     };

//     const items = [
//     { type: "link", to: "/calendar", label: "Calendar" },
//     { type: "anchor", href: "#about", label: "About Me" },
//     ];

//     const isLoggedIn = !!user;
//     return (
//     <>
//         <section>
//         </section>
//         {!isLoggedIn ? (
//         <section className={style.menu}>
//             <main className={style.links}>
//                 <a href="#about">About Me</a>
//                 <a href="#reviews">Recommendations</a>
//                 <a href="#contact">Contact</a>
//             </main>
//             <Line className={style.line}/>
//         </section>
//         ) : (
//         <section className={style.menu}>
//             <main className={style.links}>
//                 <Link to="/calendar">Calendar</Link>
//                 <a href="#about">About Me</a>
//                 <a href="#reviews">Recommendations</a>
//                 <Link to="/">Profile</Link>
//             </main>
//             <Line/>
//         </section>
//         )}
//     </>
//     );
// };

// export default Menu
