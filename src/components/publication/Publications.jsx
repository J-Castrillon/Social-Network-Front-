import React, { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png";
import { getFetching } from "../../helpers/Fetching/Fetchs";
import { useLocation, useParams } from "react-router-dom";
import { getToLocalStorage } from "../../helpers/storage/Session";
import { Delete } from "./Delete";
import ReactTimeAgo from "react-time-ago";

export const Publications = ({ user, profile, news }) => {
  const [articles, setArticles] = useState([]);
  const location = useLocation();
  const params = useParams();
  const [actualUser, setActualUser] = useState({});
  const url = import.meta.env.VITE_REACT_APP_URL;

  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => {
    if (news) {
      getArticles();
    }
  }, [news]);

  useEffect(() => {
    handleUser();
  }, [user, profile]);

  useEffect(() => {
    handleUser();
  }, [params.id]);

  useEffect(() => {
    getArticles();
  }, [actualUser]);

  const handleUser = () => {
    if (Object.entries(user).length !== 0) {
      setActualUser(user);
    } else if (Object.entries(profile).length !== 0) {
      setActualUser(profile);
    }
  };

  const getArticles = async () => {
    if (location.pathname == "/social" || location.pathname == "/social/feed") {
      const request = await getFetching(`publication/feed`, "");
      if (request?.status === "Success") {
        const publications = request.totalPublications;

        const userProfilePromises = publications.map((publication) =>
          getFetching(`user/profile/${publication.user}`)
        );

        const userProfiles = await Promise.all(userProfilePromises);

        const updatedPublications = publications.map((publication, index) => {
          const userProfile = userProfiles[index];
          if (userProfile?.status === "Success") {
            publication.image = userProfile.userProfile.image;
          }
          return publication;
        });

        setArticles(updatedPublications);
      }
    } else {
      if (actualUser?.id) {
        const request = await getFetching(
          `publication/all/${actualUser?.id}`,
          ""
        );
        if (request?.status === "Success") {
          setArticles(request?.publications);
        }
      } else if (actualUser?._id) {
        const request = await getFetching(
          `publication/all/${actualUser?._id}`,
          ""
        );
        if (request?.status === "Success") {
          setArticles(request?.publications);
        }
      }
    }
  };

  return (
    <div className="content__posts">
      {articles.map((publication, index) => {
        return (
          <article className="posts__post" key={index}>
            <div className="post__container">
              <div className="post__image-user">
                <a href="#" className="post__image-link">
                  {actualUser?.image === "default.png" ||
                  publication?.image === "default.png" ? (
                    <img
                      src={avatar}
                      className="container-avatar__img"
                      alt="Foto de perfil"
                    />
                  ) : (
                    <img
                      src={`${url}user/avatar/${
                        Object.entries(actualUser).length !== 0
                          ? actualUser?.image
                          : publication.image
                      }`}
                      className="container-avatar__img"
                      alt="Foto de perfil"
                    />
                  )}
                </a>
              </div>

              <div className="post__body">
                <div className="post__user-info">
                  <a href="#" className="user-info__name">
                    {publication?.user.name}
                  </a>
                  <span className="user-info__divider"> | </span>
                  <a href="#" className="user-info__create-date">
                    <ReactTimeAgo
                      date={publication.created_at}
                      locale="es-ES"
                    />
                  </a>
                </div>

                <h4 className="post__content">{publication.text}</h4>

                {publication?.file !== "default.png" && (
                  <img
                    src={`${url}publication/viewfile/${publication?._id}`}
                    className="img_publication"
                    alt="Foto de perfil"
                  />
                )}
              </div>
            </div>

            {actualUser?.id == getToLocalStorage("Session")?.user?.id ||
              (actualUser?._id == getToLocalStorage("Session")?.user?.id && (
                <Delete
                  publicationId={publication?._id}
                  articles={articles}
                  setArticles={setArticles}
                />
              ))}
          </article>
        );
      })}
    </div>
  );
};
