import React from 'react';
import { Link } from 'react-router';
import style from "./Button.module.css";

const Button = ({ to, label }) => {
  return (
    <Link to={to} prefetch="viewport">
      <button className={style.signUp}>
        {label}
      </button>
    </Link>
  );
};

export default Button;