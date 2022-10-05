/* eslint-disable jsx-a11y/anchor-is-valid */
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { MdExitToApp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import logo from "../../images/Logo.png";
import { LogOut } from "../../slices/authSlice";
import "./_navbar.scss";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [sidebar, setSidebar] = useState(false);
  const logout = async () => {
    await signOut(auth);
    dispatch(LogOut());
    sessionStorage.removeItem("dsx-access-token");
    sessionStorage.removeItem("dsx-profile");
  };
  const handleLogOut = (e) => {
    e.preventDefault();
    logout();
  };
  const handleSidebarClick = (e) => {
    e.preventDefault();

    setSidebar(!sidebar);
  };
  return (
    <nav className='navbar'>
      <div onClick={handleSidebarClick} className='hamburger-lines'>
        <span className='line line1'></span>
        <span className='line line2'></span>
        <span className='line line3'></span>
      </div>
      <div className='navbar__logo'>
        <img src={logo} alt='logo' />
      </div>
      <ul className={`navbar__menu ${sidebar && "active"}`}>
        <div className='close'>
          <MdClose onClick={handleSidebarClick} color='#00518b' />
        </div>

        <li className='item'>
          <Link className='item__link' to='/'>
            Home
          </Link>
        </li>

        <li className='item'>
          <Link to='/personal' className='item__link'>
            profile
          </Link>
        </li>
        <li className='item'>
          <a className='item__link' href='#contacts'>
            contact
          </a>
        </li>
      </ul>
      <div className='navbar__user'>
        {user ? (
          <>
            <MdExitToApp
              onClick={handleLogOut}
              className='profile-btn'
              size={20}
              color='#00518b'
            />
            {user.photo ? (
              <Link to='/personal'>
                <img src={user.photo} alt='' />
              </Link>
            ) : (
              <Link to='/personal'>
                <AiOutlineUser
                  className='profile-btn'
                  size={20}
                  color='#00518b'
                />
              </Link>
            )}
          </>
        ) : (
          <Link to='/auth'>
            <button className='btn'>Sign In</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
