import React from 'react'
import { Link } from 'react-router'

export const LandingPage = () => {
  return (
    <>
        <Link to="/calendar" prefetch="viewport">Calendar</Link>
        <br/>
        <Link to="/SignUp" prefetch="viewport">SignUp</Link>
    </>
  )
}
