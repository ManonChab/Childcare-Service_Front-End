import React from 'react'
import Logo from '../../Atoms/Logo/Logo'
import style from "./LandingPage.module.css"
import { Link } from 'react-router'
import Menu from '../../Atoms/Menu/Menu'
import AboutMe from '../../Organisms/AboutMe/AboutMe'

export const LandingPage = () => {
  return (
    <>
    <main className={style.main}>
      <Logo/>
      <p className={style.catchText}>
        Over 10 years of dedicated childcare experience, providing a safe, nurturing, and joyful environment where every child can grow, explore, and thrive with confidence and curiosity.
      </p>
      <section className={style.auth}>
        <Link to="/SignUp" prefetch="viewport">Sign Up</Link>
        <Link to="/LogIn" prefetch="viewport">Log In</Link>
      </section>
      <Menu/>
      <AboutMe/>
    </main>
    </>
  )
}
