import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/Logo.png";
import "./_header.scss";
const Header = () => {
  return (
    <header>
      <Link to='/'>
        <div className='logo'>
          <img src={logo} alt='logo' />
        </div>
      </Link>
    </header>
  );
};

export default Header;
