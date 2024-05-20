import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "../components/layout/public/Layout";
import { Login } from "../components/user/Login";
import { Register } from "../components/user/Register";
import { PrivateLayout } from "../components/layout/private/PrivateLayout";
import { Feed } from "../components/publication/Feed";
import { Error } from "../components/layout/Error";
import { SessionProvider } from "../context/SessionProvider";
import { Persons } from "../components/layout/private/Persons";
import { Configs } from "../components/user/Configs";
import { Followings } from "../components/follow/Followings";
import { Followers } from "../components/follow/Followers";
import { Profile } from "../components/user/Profile";

export const Routing = () => {
  return (
    <BrowserRouter>
      <SessionProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/social" element={<PrivateLayout />}>
            <Route index element={<Feed />} />
            <Route path="feed" element={<Feed />} />
            <Route path="persons" element={<Persons />} />
            <Route path="configs" element={<Configs />} />
            <Route path="following/:id?" element={<Followings/>}></Route>
            <Route path="followers/:id?" element={<Followers/>}></Route>
            <Route path="profile/:id" element={<Profile/> }></Route>
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </SessionProvider>
    </BrowserRouter>
  );
};
