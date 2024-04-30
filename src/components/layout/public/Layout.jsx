import React from "react";
import { PublicHeader } from "./Header";
import { Navigate, Outlet } from "react-router-dom";
import useSession from '../../../hooks/useSession'

export const Layout = () => {
  const { session, counters } = useSession();

  return (
    <div>
      <PublicHeader />

      {session?.id ? (
        <Navigate to={"/social"} />
      ) : (
        <section className="layout__content">
          <Outlet />
        </section>
      )}
    </div>
  );
};
