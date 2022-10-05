import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Favourites from "../Favourites/Favourites";
import Settings from "../Settings/Settings";
import "./_cabinet.scss";

const Cabinet = () => {
  const [mainContent, setMainContent] = useState(true);
  const openSettings = () => {
    setMainContent(false);
  };
  const openFavs = () => {
    setMainContent(true);
  };
  const { user } = useSelector((state) => state.auth);
  return (
    <div className='user'>
      <aside className='sidebar'>
        <section className='sidebar__avatar'>
          {user?.photo ? (
            <img src={user?.photo} alt='' />
          ) : (
            <div className='altlogo'>?</div>
          )}
        </section>
        <section className='sidebar__menu'>
          <div onClick={openFavs} className={`item ${mainContent && "active"}`}>
            My Favourites
          </div>
          <div
            className={`item ${!mainContent && "active"}`}
            onClick={openSettings}
          >
            Settings
          </div>
        </section>
      </aside>
      <main className='main'>
        {mainContent ? <Favourites /> : <Settings />}
      </main>
    </div>
  );
};

export default Cabinet;
