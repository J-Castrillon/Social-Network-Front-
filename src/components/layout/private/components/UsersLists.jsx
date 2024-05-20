import React, { useEffect } from "react";
import { ButtonsFollow } from "./ButtonsFollow";
import avatar from "../../../../assets/img/user.png";
import { GetProfile } from "../../../../helpers/Profiles/GetProfile";
import { Link, useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

export const UsersLists = ({
  users,
  url,
  followings,
  setFollowings,
  profile,
  setProfile,
}) => {
  const navigate = useNavigate();

  const toProfile = (user) => {
    GetProfile(user?._id, setProfile);
    navigate(`/social/profile/${user?._id}`);
  };

  return (
    <div className="content__posts">
      {users.length !== 0 &&
        users.map((user, index) => {
          return (
            <article key={index} className="posts__post">
              <div className="post__container">
                <div
                  className="post__image-user"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <a
                    href="#"
                    className="post__image-link"
                    onClick={() => toProfile(user)}
                  >
                    {user?.image === "default.png" ? (
                      <img
                        src={avatar}
                        className="container-avatar__img"
                        alt="Foto de perfil"
                      />
                    ) : (
                      <img
                        src={`${url}user/avatar/${user?.image}`}
                        className="container-avatar__img"
                        alt="Foto de perfil"
                      />
                    )}
                  </a>
                </div>

                <div className="post__body">
                  <div className="post__user-info">
                    <a href="#" className="user-info__name">
                      {user.name} {user.lastName}
                    </a>
                    <span className="user-info__divider"> | </span>
                    <a href="#" className="user-info__create-date">
                      <ReactTimeAgo date={user.created_at} locale="es-ES" />
                    </a>
                  </div>

                  <h6 className="post__content">
                    {user.bio !== "" ? user.bio : "Sin biografía"}
                  </h6>
                </div>
              </div>

              <div className="post__buttons">
                <ButtonsFollow
                  followings={followings}
                  setFollowings={setFollowings}
                  user={user}
                  profile={{}}
                />
              </div>
            </article>
          );
        })}
    </div>
  );
};
