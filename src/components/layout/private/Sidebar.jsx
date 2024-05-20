import React, { useState } from "react";
import avatar from "../../../assets/img/user.png";
import useSession from "../../../hooks/useSession";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../../hooks/useForm";
import {
  postFetching,
  postUploadFetching,
} from "../../../helpers/Fetching/Fetchs";
import { GetProfile } from "../../../helpers/Profiles/GetProfile";

export const Sidebar = () => {
  const url = import.meta.env.VITE_REACT_APP_URL;
  const { session, counters } = useSession();
  const [stored, setStored] = useState(false);
  const { form, changes } = useForm({});
  const [error, setError] = useState(false);
  const [profile, setProfile] = useState({}); 
  const navigate = useNavigate(); 

  const toProfile = (user) => {
    console.log(user)
    GetProfile(user?.id, setProfile); 
    navigate(`/social/profile/${user?.id}`); 
  }

  const savePublication = async (e) => {
    e.preventDefault();
    const publicationForm = form;

    const request = await postFetching("publication/save", publicationForm);

    if (request?.status === "Success" && e.target.file0.files[0]) {
      const formData = new FormData();
      formData.append("file0", e.target.file0.files[0]);

      const fileRequest = await postUploadFetching(
        `publication/upload/${request.newPublication._id}`,
        formData
      );

      if (fileRequest) {
        request?.status === "Success" ? setStored(true) : setError(true);

        const forms = document.querySelector('#publication-form'); 
        forms.reset(); 
      }

      
    } else if (request?.status === "Success") {
      request?.status === "Success" ? setStored(true) : setError(true);
    }
  };

  return (
    <aside className="layout__aside">
      <header className="aside__header">
        <h1 className="aside__title">Hola, {session?.name}</h1>
      </header>

      <div className="aside__container">
        <div className="aside__profile-info">
          <div className="profile-info__general-info">
            <div className="general-info__container-avatar">
              {session?.image === "default.png" ? (
                <img
                  src={avatar}
                  className="container-avatar__img"
                  alt="Foto de perfil"
                  onClick={() => toProfile(session)}
                />
              ) : (
                <img
                  src={`${url}user/avatar/${session?.image}`}
                  className="container-avatar__img"
                  alt="Foto de perfil"
                  onClick={() => toProfile(session)}
                />
              )}
            </div>

            <div className="general-info__container-names" onClick={() => toProfile(session)}>
              <a href="#" className="container-names__name">
                {session?.name} {session?.lastName}
              </a>
              <p className="container-names__nickname">{session?.nickName}</p>
            </div>
          </div>

          <div className="profile-info__stats">
            <div className="stats__following">
              <Link to="/social/following" className="following__link">
                <span className="following__title">Siguiendo</span>
                <span className="following__number">
                  {counters?.totalFollowings > 0 ? counters?.totalFollowings : 0}
                </span>
              </Link>
            </div>
            <div className="stats__following">
              <Link to="/social/followers" className="following__link">
                <span className="following__title">Seguidores</span>
                <span className="following__number">
                  {counters?.totalFollowers > 0 ? counters?.totalFollowers : 0}
                </span>
              </Link>
            </div>

            <div className="stats__following">
              <Link to={`/social/profile/${session?.id}`} href="#" className="following__link">
                <span className="following__title">Publicaciones</span>
                <span className="following__number">
                  {counters?.totalPublications > 0 ? counters?.totalPublications : 0}
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="aside__container-form">
          {stored ? (
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
                    textAlign: "center",
                  }}
                ></i>
                <span className="confirmation_message_paragraph">
                  Publicado
                </span>
              </p>
            </div>
          ) : (
            error && (
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
                  <span className="confirmation_message_paragraph">
                    {error}
                  </span>
                </p>
              </div>
            )
          )}
          <form
            className="container-form__form-post"
            id="publication-form"
            onSubmit={savePublication}
          >
            <div className="form-post__inputs">
              <label htmlFor="text" className="form-post__label">
                ¿Que estas pensando hoy?
              </label>
              <textarea
                name="text"
                id="text"
                className="form-post__textarea"
                onChange={changes}
              ></textarea>
            </div>

            <div className="form-post__inputs">
              <label htmlFor="file0" className="form-post__label">
                Sube tu foto
              </label>
              <input
                type="file"
                name="file0"
                id="file0"
                className="form-post__image"
              />
            </div>

            <button
              type="submit"
              value="Enviar"
              className="form-post__btn-submit"
            >
              Publicar
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
};
