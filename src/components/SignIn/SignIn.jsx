import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { BsKey } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { GoMail } from "react-icons/go";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import logo from "../../images/auth-logo.png";
import "./_signIn.scss";
import { authFail, authRequest, authSuccess } from "../../slices/authSlice";

const SignIn = () => {
  const token = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passRef = useRef();
  const [userProps, setUserProps] = useState({ email: "", password: "" });
  const changeEmailProps = (e) => {
    setUserProps({ ...userProps, email: e.target.value });
  };
  const changePassProps = (e) => {
    setUserProps({ ...userProps, password: e.target.value });
  };
  const loginWithGoogle = async () => {
    try {
      dispatch(authRequest());
      const provider = new GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
      await signInWithPopup(auth, provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const profile = {
          name: result.user.displayName,
          photo: result.user.photoURL,
        };
        sessionStorage.setItem("dsx-access-token", token);
        sessionStorage.setItem("dsx-profile", JSON.stringify(profile));
        dispatch(authSuccess({ token, profile }));
      });
    } catch (err) {
      dispatch(authFail(err.message));
    }
  };
  const loginWithUser = async () => {
    try {
      dispatch(authRequest());

      await signInWithEmailAndPassword(
        auth,
        userProps.email,
        userProps.password
      ).then((result) => {
        const token = result.user.accessToken;
        const profile = {
          name: result.user.displayName,
          photo: result.user.photoURL,
        };
        sessionStorage.setItem("dsx-access-token", token);
        sessionStorage.setItem("dsx-profile", JSON.stringify(profile));
        dispatch(authSuccess({ token, profile }));
        navigate("/");
      });
    } catch (err) {
      if (err.message.includes("user")) {
        toast.error("Wrong E-mail. User not found");
      }
      if (err.message.includes("password")) {
        toast.error("Wrong password");
      } else {
        console.log(err);
      }
    }
  };
  const handleSignInWithGoogle = (event) => {
    event.preventDefault();
    loginWithGoogle();
  };
  const handleSignInWithUser = (e) => {
    e.preventDefault();
    loginWithUser();
  };
  useEffect(() => {
    userProps.email
      ? (emailRef.current.className = "has-value")
      : (emailRef.current.className = "");
    userProps.password
      ? (passRef.current.className = "has-value")
      : (passRef.current.className = "");
  }, [userProps]);
  useEffect(() => {
    token && navigate("/");
  }, [token, navigate]);
  return (
    <>
      <Toaster />
      <div className='window'>
        <div className='window__logo'>
          <img src={logo} alt='logo' /> <h1>Welcome</h1>
        </div>
        <form onSubmit={handleSignInWithUser} className='window__form '>
          <span className='window__form__input'>
            <input
              ref={emailRef}
              value={userProps.email}
              onChange={(e) => changeEmailProps(e)}
              type='email'
              placeholder='E-mail...'
            />
            <label>
              <GoMail color=' #a8abae' />
            </label>
          </span>
          <span className='window__form__input'>
            <input
              ref={passRef}
              value={userProps.password}
              onChange={(e) => changePassProps(e)}
              type='password'
              placeholder='Password...'
            />

            <label>
              <BsKey color=' #a8abae' />
            </label>
          </span>

          <button type='submit'> Submit </button>
          <div className='window__form__google'>
            <p> Or Sign In with </p>
            <button onClick={handleSignInWithGoogle}>
              <FcGoogle size={22} />
            </button>
          </div>
          <div className='link'>
            <p>
              Not a member?&nbsp;
              <Link to='/signup'>Sign up now!</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
