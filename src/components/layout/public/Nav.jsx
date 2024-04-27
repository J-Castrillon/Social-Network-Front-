import React from "react";
import avatar from "../../../assets/img/user.png"
import { NavLink } from "react-router-dom";

export const Nav = () => {
  return (
    <nav className="navbar__container-lists">
      <ul className="container-lists__menu-list">
        <li className="menu-list__item">
          <NavLink to='/login' href="#" className="menu-list__link">
            <i className="fa-solid fa-user"></i>
            <span className="menu-list__title">Iniciar Sesión</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to='/register' href="#" className="menu-list__link">
            <i className="fa-solid fa-users"></i>
            <span className="menu-list__title">Registrarse</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};