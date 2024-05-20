import React, { useEffect } from "react";
import {
  deleteFetching,
  postFetching,
} from "../../../../helpers/Fetching/Fetchs";

export const ButtonsFollow = ({ followings, setFollowings, user, profile }) => {
  const follow = async (id) => {
    const request = await postFetching("follow/save", { followed: id });
    if (request.status === "Success") {
      if (Object.entries(profile).length !== 0) {
        setFollowings([...followings, profile.id]);
      } else {
        setFollowings([...followings, id]);
      }
    }
  };

  const unfollow = async (id) => {
    const request = await deleteFetching(`follow/unfollow/${id}`);
    if (request?.status === "Success") {
      if (Object.entries(profile).length !== 0) {
        let filterFollowed = followings.filter(
          (userId) => userId !== profile.id
        );
        setFollowings(filterFollowed);
      } else {
        let filterFollowed = followings.filter((userId) => userId !== id);
        setFollowings(filterFollowed);
      }
    }
  };

  if (
    !followings?.includes(
      Object.entries(profile).length !== 0 ? profile.id : user?._id
    )
  ) {
    return (
      <button
        type="button"
        href="#"
        className="post__button follow__button--green"
        onClick={() => follow(user?._id)}
      >
        Seguir
      </button>
    );
  } else {
    return (
      <button
        type="button"
        href="#"
        className="post__button"
        onClick={() => unfollow(user?._id)}
      >
        Dejar de seguir
      </button>
    );
  }
};
