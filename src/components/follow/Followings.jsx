import React, { useEffect, useState } from "react";
import { getFetching } from "../../helpers/Fetching/Fetchs";
import { Loader } from "../layout/Loader";
import { getToLocalStorage } from "../../helpers/storage/Session";
import { UsersLists } from "../layout/private/components/UsersLists";
import { useNavigate, useParams } from "react-router-dom";

export const Followings = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [limit, setLimit] = useState(false);
  const [loader, setLoader] = useState(true);
  const [followings, setFollowings] = useState([]);
  const [profile, setProfile] = useState({});
  const params = useParams();
  const url = import.meta.env.VITE_REACT_APP_URL;

  useEffect(() => {
    getAllUsers();
    getFollowings();
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [pagination]);

  const getAllUsers = async () => {
    const request = await getFetching(
      `follow/followers/${
        params.id ? params.id : getToLocalStorage("Session")?.user?.id
      }/${pagination}`
    );

    if (request?.status === "Success") {
      const allFollowings = request?.following?.map((follower) => {
        return follower.followed;
      });
      setUsers(allFollowings);
      pagination === request?.pages && setLimit(true);
      setLoader(false);
    } else {
      setUsers([]);
    }
  };

  const getFollowings = async () => {
    setFollowings([]);
    const request = await getFetching(
      `follow/followers/${getToLocalStorage("Session")?.user?.id}`
    );
    request?.following.map((user) => {
      setFollowings((prevFollowings) => [
        ...prevFollowings,
        user?.followed?._id,
      ]);
    });
  };

  const nextPage = () => {
    setPagination((state) => {
      return state + 1;
    });
  };

  const prevPage = () => {
    setPagination((state) => {
      return state - 1;
    });
    setLimit(false);
  };

  if (!loader) {
    return (
      <>
        <header className="content__header">
          <h1 className="content__title">
            Seguidos{" "}
            {profile.name
              ? `de ${profile.name}`
              : `de ${getToLocalStorage("Session")?.user?.name}`}
          </h1>
        </header>

        <UsersLists
          users={users}
          setUsers={setUsers}
          url={url}
          followings={followings}
          setFollowings={setFollowings}
          profile={profile}
          setProfile={setProfile}
        />

        <div className="content__container-btn">
          {pagination > 1 && (
            <button
              className="fa-solid fa-arrow-left"
              onClick={prevPage}
            ></button>
          )}

          <span>{pagination}</span>
          {limit !== true && (
            <button
              className="fa-solid fa-arrow-right"
              onClick={nextPage}
            ></button>
          )}
        </div>
      </>
    );
  } else {
    return <Loader />;
  }
};
