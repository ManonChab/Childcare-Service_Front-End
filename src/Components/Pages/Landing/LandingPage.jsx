import React from 'react'
import Logo from '../../Atoms/Logo/Logo'
import style from "./LandingPage.module.css"
import { Link } from 'react-router'
import Menu from '../../Atoms/Menu/Menu'
import AboutMe from '../../Organisms/AboutMe/AboutMe'
import Title from '../../Atoms/Title/Title'
import Line from '../../Atoms/Line/Line'
import Reviews from "../../Organisms/Reviews/Reviews"
import AdminReviews from '../../Organisms/AdminReviews/AdminReviews'
import ReviewPopup from '../../molecules/ReviewFormPopUp/ReviewPopUp'
import Button from '../../Atoms/Button/Button'
import Contacts from '../../Organisms/Contacts/Contacts'
import { useUser } from "../../../Context/UserContext";

export const LandingPage = () => {
    const { user } = useUser();
    const isLoggedIn = !!user;

  return (
    <>
    <main className={style.main}>
      <Logo/>
      {/* <p className={style.catchText}>
        Over 10 years of dedicated childcare experience, providing a safe, nurturing, and joyful environment where every child can grow, explore, and thrive with confidence and curiosity.
      </p> */}
      <Button to="/Admin" label="ADMIN" className={style.adminButton}/>
      {!isLoggedIn ? (
        <section className={style.auth}>
          <Button to="/SignUp" label="SIGN UP" />
          <Button to="/LogIn" label="LOG IN" />
        </section>
      ) : (
        <section className={style.auth}>
          <Button to="/LogIn" label="LOG OUT" />
        </section>
      )}
      <Menu/>
      <section id="about" className={style.section}>
        <Title title="About Me"/>
        <AboutMe/>
      </section>
      <Line/>
      <section id="reviews" className={style.section}>
        <Title title="Reviews"/>
        <Reviews/>
        <ReviewPopup/>
      </section>
      <Line/>
      <section id="contact" className={style.section}>
        <Title title="Contact" />
        <Contacts />
      </section>
    </main>
    </>
  )
}
