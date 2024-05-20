import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetProfile } from "../../helpers/Profiles/GetProfile";
import avatar from "../../assets/img/user.png";
import { getFetching } from "../../helpers/Fetching/Fetchs";
import { getToLocalStorage } from "../../helpers/storage/Session";
import { ButtonsFollow } from "../layout/private/components/ButtonsFollow";
import { Publications } from "../publication/Publications";

export const Profile = () => {
  const [profile, setProfile] = useState({});
  const [following, setFollowing] = useState([]);
  const [counters, setCounters] = useState({});
  const params = useParams();
  const url = import.meta.env.VITE_REACT_APP_URL;

  useEffect(() => {
    GetProfile(params?.id, setProfile);
    getCounters();
  }, []);

  useEffect(() => {
    GetProfile(params?.id, setProfile);
  }, [params.id]);

  const getCounters = async () => {
    const countersRequest = await getFetching(
      `follow/followers/${params?.id ? params?.id : profile?._id}`,
      ""
    );

    const results = countersRequest?.followers?.map(
      (follower) => follower?.user?._id
    );

    setFollowing(results);

    const counts = {
      totalFollowers: countersRequest?.totalFollowers,
      totalFollowings: countersRequest?.totalFollowings,
      totalPublications: countersRequest?.totalPublications,
    };

    setCounters(counts);
  };

  return (
    <div className="profile_content">
      <header className="aside__profile-info">
        <div className="profile-info__general-info">
          <div className="general-info__container-avatar">
            {profile?.image === "default.png" ? (
              <img
                src={avatar}
                className="container-avatar__img"
                alt="Foto de perfil"
              />
            ) : (
              <img
                src={`${url}user/avatar/${profile?.image}`}
                className="container-avatar__img"
                alt="Foto de perfil"
              />
            )}
          </div>

          <div className="general-info__container-names">
            <div>
              <h1 href="#" className="container-names__name">
                {profile.name} {profile?.lastName}
              </h1>

              {profile._id !== getToLocalStorage("Session")?.user?.id && (
                <ButtonsFollow
                  followings={following}
                  setFollowings={setFollowing}
                  user={profile}
                  profile={getToLocalStorage("Session")?.user}
                />
              )}
            </div>
            <h2 className="container-names__nickname">{profile?.nickName}</h2>
            <p>{profile?.bio}</p>
          </div>
        </div>

        <div className="profile-info__stats">
          <div className="stats__following">
            <Link
              to={`/social/following/${params?.id ? params.id : profile?._id}`}
              className="following__link"
            >
              <span className="following__title">Siguiendo</span>
              <span className="following__number">
                {counters?.totalFollowings > 0 ? counters?.totalFollowings : 0}
              </span>
            </Link>
          </div>
          <div className="stats__following">
            <Link
              to={`/social/followers/${params?.id ? params.id : profile?._id}`}
              className="following__link"
            >
              <span className="following__title">Seguidores</span>
              <span className="following__number">
                {counters?.totalFollowers > 0 ? counters?.totalFollowers : 0}
              </span>
            </Link>
          </div>

          <div className="stats__following">
            <a href="#" className="following__link">
              <span className="following__title">Publicaciones</span>
              <span className="following__number">
                {counters?.totalPublications > 0
                  ? counters?.totalPublications
                  : 0}
              </span>
            </a>
          </div>
        </div>
      </header>

      <Publications
        user={profile}
        profile={getToLocalStorage("Session")?.user}
        news={{}}
      />
    </div>
  );
};
