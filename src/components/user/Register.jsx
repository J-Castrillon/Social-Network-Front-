import React, { useEffect, useState } from "react";
import { PublicHeader } from "../layout/public/Header";
import { useForm } from "../../hooks/useForm";
import { postFetching } from "../../helpers/Fetching/Fetchs";
import { configDotenv } from "dotenv";

export const Register = () => {
  const { form, setForm, changes } = useForm({});
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const saveUser = async (e) => {
    e.preventDefault();
    const newUser = form;
    const response = await postFetching("user/register", newUser);

    if (response.status === "Success") {
      alert(response.message);
      setSaved(true);
      setForm({});
    } else {
      setError(response.message);
    }
  };

  return (
    <div id="main_content-register">
      <header className="content__header">
        <h1 className="content__title">Registro</h1>
      </header>

      <section className="content__posts">
        {saved === true ? (
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
              <span className="confirmation_message_paragraph">
                Ya puedes iniciar sesión
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
          id="form_register"
          action=""
          className="register-form"
          style={{ width: "30%" }}
          onSubmit={saveUser}
        >
          <div className="form-group">
            <label htmlFor="name">Nombres:</label>
            <input
              type="text"
              name="name"
              placeholder="Nombres"
              onChange={changes}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Apellidos:</label>
            <input
              type="text"
              name="lastName"
              placeholder="Apellidos"
              onChange={changes}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nickName">Usuario:</label>
            <input
              type="text"
              name="nickName"
              placeholder="Nombre de usuario"
              onChange={changes}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Email@email.com"
              onChange={changes}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={changes}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Regístrate
          </button>
        </form>
      </section>
    </div>
  );
};
