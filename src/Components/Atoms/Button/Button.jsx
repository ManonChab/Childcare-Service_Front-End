import React from 'react';
import { Link } from 'react-router';
import style from "./Button.module.css";

const Button = ({ to, label, onClick }) => {
  return (
    <Link to={to} prefetch="viewport">
      <button className={style.signUp} onClick={onClick}>
        {label}
      </button>
    </Link>
  );
};

export default Button;