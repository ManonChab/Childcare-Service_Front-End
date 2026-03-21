import React from 'react'
import { Link } from 'react-router'
import style from "./Menu.module.css"

const Menu = () => {
    return (
    <>
        <section className={style.menu}>
            <Link to="/calendar" prefetch="viewport">Calendar</Link>
            <Link to="/" prefetch="viewport">About Me</Link>
            <Link to="/" prefetch="viewport">Recommendations</Link>
            <Link to="/" prefetch="viewport">Profile</Link>
        </section>
        <hr />
    </>
    
    )
}

export default Menu