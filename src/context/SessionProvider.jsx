import React, { createContext, useEffect, useState } from "react";
import { getToLocalStorage } from "../helpers/storage/Session";
import { getFetching } from "../helpers/Fetching/Fetchs";
import { useParams } from "react-router-dom";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState({});
  const [counters, setCounters] = useState({});
  const [loading, setLoading] = useState(true); 
  const params = useParams(); 

  useEffect(() => {
    sessionUser();
  }, []);

  const sessionUser = async () => {
    const dataSession = getToLocalStorage("Session");

    if (!dataSession) {
      setLoading(false); 
      return false;
    } else {
      // Peticion de comprobacion de tokens;
      const request = await getFetching(
        `user/profile/${dataSession?.user?.id}`,
        dataSession.token
      );

      const counters = await getFetching(
        `follow/followers/${params.id ? params.id : dataSession?.user?.id}`,
        dataSession.token
      );

      const counts = {
        totalFollowers: counters?.totalFollowers,
        totalFollowings: counters?.totalFollowings,
        totalPublications: counters?.totalPublications,
      };

      setSession(dataSession.user);
      setCounters(counts);
      setLoading(false); 
    }
  };

  return (
    <SessionContext.Provider
      value={{
        session,
        counters,
        loading,
        setSession
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
