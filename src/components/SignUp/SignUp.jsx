import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { Formik } from "formik";
import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { auth } from "../../firebase";
import "./_signUp.scss";

const SignUp = () => (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={async (values, { setSubmitting }) => {
      try {
        await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        ).then(() => {
          sendEmailVerification(auth.currentUser);
          toast.success("User created. Confirm your E-mail");
          setSubmitting(false);
        });
      } catch (err) {
        toast.error(err.message);
      }
    }}
    validationSchema={Yup.object().shape({
      email: Yup.string().email().required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number."),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    })}
  >
    {(props) => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;

      return (
        <>
          <Toaster />
          <div className='signup-window'>
            <form onSubmit={handleSubmit} className='signup-window__form '>
              <span
                className={`signup-window__form__input ${
                  errors.email && touched.email && "error"
                }`}
              >
                <input
                  name='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type='email'
                  placeholder='E-mail...'
                />

                {errors.email && touched.email && (
                  <div className='feedback'>{errors.email}</div>
                )}
              </span>
              <span
                className={`signup-window__form__input ${
                  errors.password && touched.password && "error"
                }`}
              >
                <input
                  name='password'
                  type='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Enter Password...'
                />

                {errors.password && touched.password && (
                  <div className='feedback'>{errors.password}</div>
                )}
              </span>
              <span
                className={`signup-window__form__input ${
                  errors.email && touched.email && "error"
                }`}
              >
                <input
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name='confirmPassword'
                  type='password'
                  placeholder='Repeat Password...'
                />

                {errors.confirmPassword && touched.confirmPassword && (
                  <div className='feedback'>{errors.confirmPassword}</div>
                )}
              </span>
              <button type='submit' disabled={isSubmitting}>
                Submit
              </button>
              <div className='link'>
                <p>
                  has an account?&nbsp; <Link to='/auth'>Sign in now!</Link>{" "}
                </p>
              </div>
            </form>
          </div>
        </>
      );
    }}
  </Formik>
);

export default SignUp;
