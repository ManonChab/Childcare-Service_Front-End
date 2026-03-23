import React from 'react'
import Logo from '../../Atoms/Logo/Logo'
import style from "./LandingPage.module.css"
import { Link } from 'react-router'
import Menu from '../../Atoms/Menu/Menu'
import AboutMe from '../../Organisms/AboutMe/AboutMe'
import Title from '../../Atoms/Title/Title'
import Line from '../../Atoms/Line/Line'
import Reviews from "../../Organisms/Reviews/Reviews"
import AdminReviews from '../../Organisms/AdminReviews.jsx/AdmingReviews'
import ReviewPopup from '../../molecules/ReviewFormPopUp/ReviewPopUp'
import Button from '../../Atoms/Button/Button'

export const LandingPage = () => {
  return (
    <>
    <main className={style.main}>
      <Logo/>
      {/* <p className={style.catchText}>
        Over 10 years of dedicated childcare experience, providing a safe, nurturing, and joyful environment where every child can grow, explore, and thrive with confidence and curiosity.
      </p> */}
      <section className={style.auth}>
        <Button to="/SignUp" label="SIGN UP" />
        <Button to="/LogIn" label="LOG IN" />
      </section>
      <Menu/>
      <Line/>
      <Title title="About Me"/>
      <AboutMe/>
      <Line/>
      <Title title="Reviews"/>
      <Reviews/>
      <ReviewPopup/>
      <Line/>
    </main>
    </>
  )
}
