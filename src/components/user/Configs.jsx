import React, { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png";
import useSession from "../../hooks/useSession";
import { serializeForm } from "../../helpers/Forms/Seralize";
import { postFetching, postUploadFetching, putFetching } from "../../helpers/Fetching/Fetchs";
import { getToLocalStorage } from "../../helpers/storage/Session";

export const Configs = () => {
  const [saved, setSaved] = useState(false);
  const { session, setSession } = useSession({});
  const [error, setError] = useState("");
  const apiUrl = import.meta.env.VITE_REACT_APP_URL;

  const update = async (e) => {
    e.preventDefault();

    const configUser = serializeForm(e.target);
    delete configUser.file0;

    const request = await putFetching(
      `user/update/${getToLocalStorage("Session")?.user?.id}`,
      configUser
    );
    const file = document.querySelector("#file0");

    if (request.status === "Success") {
      delete request.user.password;

      if(file.files[0]  ){
        const formData = new FormData();
        formData.append("file0", file.files[0]);
  
        const requestFile = await postUploadFetching(
          `user/uploads/${getToLocalStorage("Session")?.user?.id}`,
          formData,
        );
      }

      if(Object.entries(configUser).length !== 0){
        setSession(configUser);
      }
      setSaved(true);
    } else {
      setSaved(false);
    }
  };

  return (
    <div id="main_content-config">
      <header className="content__header">
        <h1 className="content__title">Actualización de información</h1>
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
                Usuario actualizado correctamente
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

        <form className="config-form" id="config-form" onSubmit={update}>
          <div className="form-group input-avatar">
            <label htmlFor="file0" className="input-file">
              <div className="avatar general-info__container-avatar">
                {session?.image === "default.png" ? (
                  <img
                    src={avatar}
                    className="container-avatar__img"
                    alt="Default avatar image"
                  />
                ) : (
                  <img
                    src={`${apiUrl}user/avatar/${session?.image}`}
                    className="container-avatar__img"
                    alt="Foto de perfil"
                  />
                )}
              </div>
              <div className="input_avatar-content">
                <p>Cambiar imagen de perfil:</p>
                <input type="file" name="file0" id="file0" />
              </div>
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="name">Nombres:</label>
            <input
              type="text"
              name="name"
              placeholder="Nombres"
              defaultValue={session?.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Apellidos:</label>
            <input
              type="text"
              name="lastName"
              placeholder="Apellidos"
              defaultValue={session?.lastName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nickName">Usuario:</label>
            <input
              type="text"
              name="nickName"
              placeholder="Nombre de usuario"
              defaultValue={session?.nickName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio:</label>
            <textarea
              name="bio"
              id="bio"
              cols="30"
              rows="5"
              placeholder="Agrega una descripción sobre tí..."
              defaultValue={session?.bio}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Email@email.com"
              defaultValue={session?.email}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Actualizar
          </button>
        </form>
      </section>
    </div>
  );
};
