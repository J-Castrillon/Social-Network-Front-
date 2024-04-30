import React, { useEffect, useReducer, useState } from "react";
import { PublicHeader } from "../layout/public/Header";
import { useForm } from "../../hooks/useForm";
import { postFetching } from "../../helpers/Fetching/Fetchs";
import Swal from "sweetalert2";
import { SessionReducer } from "../../reducers/Session";
import useSession from "../../hooks/useSession";
import { saveToLocalStorage } from "../../helpers/storage/Session";

export const Login = () => {
  const { form, setForm, changes } = useForm({});
  const [loged, setLoged] = useState(false);
  const [error, setError] = useState("");
  const [session, dispatch] = useReducer(SessionReducer, {});
  const {setSession} = useSession({}); 

  const login = async (e) => {
    e.preventDefault();

    const userLogin = form;
    const response = await postFetching("user/login", userLogin);

    if (response.status === "Success") {
      setLoged(true);
      Swal.fire({
        title: "Bienvenido",
        text: response.user.name,
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
        width: 500,
      });

      const newSession = {
        type: "newSession",
        payload: { user: response.user, token: response.token },
      };

      dispatch(newSession);
      const local = saveToLocalStorage({user: response.user, token: response.token});

      setTimeout(()=>{
        setSession(response.user);
      }, 1000);
    } else {
      setError(response.message);
    }
  };

  return (
    <div id="main_content-login">
      <header className="content__header">
        <h1 className="content__title">Inicio de sesión</h1>
      </header>

      <div className="content__posts">
        {loged === true ? (
          <div
            className="confirmation_message"
            style={{
              background: "#CEE6C9",
              borderRadius: "10px",
              width: "50%",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            <p style={{ fontWeight: "bolder" }}>
              <i
                className="fa-solid fa-check"
                style={{
                  color: "white",
                  background: "#4aa843",
                  borderRadius: "50%",
                  height: "30px",
                  width: "30px",
                  paddingTop: "8px",
                  marginRight: "10px",
                }}
              ></i>
              <span className="confirmation_message_paragraph">
                Bienvenido nuevamente
              </span>
            </p>
          </div>
        ) : (
          error !== "" && (
            <div
              className="confirmation_message"
              style={{
                background: "#EEC5C5",
                borderRadius: "10px",
                width: "50%",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              <p style={{ fontWeight: "bolder" }}>
                <span className="confirmation_message_paragraph">{error}</span>
              </p>
            </div>
          )
        )}
        <form
          action=""
          id="form_login"
          className="login-form"
          style={{ width: "30%" }}
          onSubmit={login}
        >
          <div className="form-group">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email@email.com"
              onChange={changes}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Contraseña</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
              onChange={changes}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};
