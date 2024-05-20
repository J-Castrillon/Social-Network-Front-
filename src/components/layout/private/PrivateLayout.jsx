import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import useSession from "../../../hooks/useSession";

export const PrivateLayout = () => {
  const { session, loading } = useSession();
  const location = useLocation();

  if (loading) {
    return <div className="loader"></div>;
  } else {
    return (
      <div>
        <Header />

        <div className="feed__content">
          {session?.id ? (
            <section className="layout__content">
              <Outlet />
            </section>
          ) : (
            <Navigate to={"/login"} />
          )}

          {location?.pathname !== "/social/configs" && <Sidebar />}
        </div>
      </div>
    );
  }
};
