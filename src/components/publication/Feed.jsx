import React, { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png";
import { Publications } from "./Publications";
export const Feed = () => {

  const [news, setNews] = useState(false); 

  const refresh = () => {
    setNews(true); 
  }

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Timeline</h1>
        <button type="button" className="content__button" onClick={refresh}>Mostrar nuevas</button>
      </header>

      <Publications 
        user={{}}
        profile={{}}
        news={news}
      />
    </>
  );
};
