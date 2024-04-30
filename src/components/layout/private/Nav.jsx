import React from "react";
import avatar from "../../../assets/img/user.png";
import useSession from "../../../hooks/useSession";
import { deleteToLocalStorage } from "../../../helpers/storage/Session";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Nav = () => {
  const { session, setSession, setCounters } = useSession({});
  console.log(session);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_REACT_APP_URL;

  const singout = () => {
    Swal.fire({
      title: "¿Seguro que quieres salir?",
      width: 500,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Salir",
      confirmButtonColor: "red",
      confirmButtonAriaLabel: "red",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteToLocalStorage("Session");
        setSession({});
        setCounters({});
      }
    });
  };

  return (
    <nav className="navbar__container-lists">
      <ul className="container-lists__menu-list">
        <li className="menu-list__item">
          <NavLink to="/social" href="#" className="menu-list__link">
            <i className="fa-solid fa-house"></i>
            <span className="menu-list__title">Inicio</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to="/social/feed" href="#" className="menu-list__link">
            <i className="fa-solid fa-list"></i>
            <span className="menu-list__title">Timeline</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to="/social/persons" href="#" className="menu-list__link">
            <i className="fa-solid fa-user"></i>
            <span className="menu-list__title">Personas</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <a href="#" className="menu-list__link">
            <i className="fa-regular fa-envelope"></i>
            <span className="menu-list__title">Mensajes</span>
          </a>
        </li>
      </ul>

      <ul className="container-lists__list-end">
        <li className="list-end__item">
          <a href="#" className="list-end__link-image">
            {session?.image !== "default.png" ? (
              <img
                src={`${apiUrl}user/avatar/${session.image}`}
                className="list-end__img"
                alt="Imagen de perfil"
              />
            ) : (
              <img
                src={avatar}
                className="list-end__img"
                alt="Imagen de perfil"
              />
            )}
          </a>
        </li>
        <li className="list-end__item">
          <a href="#" className="list-end__link">
            <span className="list-end__name">{session?.name}</span>
            <i className="fa-solid fa-caret-down"></i>
          </a>
        </li>
        <li className="list-end__item">
          <NavLink to="/social/configs" href="#" className="list-end__link">
            <i className="fa-solid fa-gear"></i>
            <span className="list-end__name">Ajustes</span>
          </NavLink>
        </li>
        <li className="list-end__item">
          <a href="#" className="list-end__link" onClick={singout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span className="list-end__name">Cerrar Sesion</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};
