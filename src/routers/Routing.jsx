import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "../components/layout/public/Layout";
import { Login } from "../components/user/Login";
import { Register } from "../components/user/Register";
import { PrivateLayout } from "../components/layout/private/PrivateLayout";
import { Feed } from "../components/publication/Feed";
import {Error} from "../components/layout/Error"; 

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/social" element={<PrivateLayout />}>
          <Route index element={<Feed />} />
          <Route path="feed" element={<Feed />} />
        </Route>

        <Route path='*' element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  );
};
