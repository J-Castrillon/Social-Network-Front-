import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import useSession from "../../../hooks/useSession";

export const PrivateLayout = () => {
  const { session, loading } = useSession();

  if(loading){
    return (
      <div className="loader">
        <p>cargando...</p>
      </div>
    )
  }else{
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
  
          <Sidebar />
        </div>
      </div>
    );
  }

};
