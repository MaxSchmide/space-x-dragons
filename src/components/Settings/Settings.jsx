import { Formik } from "formik";
import * as Yup from "yup";
import { auth } from "../../firebase";

import React from "react";
import "./_settings.scss";
import { Toaster, toast } from "react-hot-toast";
import {
  sendEmailVerification,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";

const Settings = () => (
  <Formik
    initialValues={{ email: "", password: "", name: "" }}
    onSubmit={async (values, { setSubmitting }) => {
      try {
        if (values.email) {
          await updateEmail(auth.currentUser, values.email).then(() => {
            sendEmailVerification(auth.currentUser);

            toast.success("E-mail updated");
            setSubmitting(false);
            values.email = "";
          });
        }
        if (values.name) {
          await updateProfile(auth.currentUser, {
            displayName: values.name,
          }).then(() => {
            toast.success("Name updated");
            setSubmitting(false);
            values.name = "";
          });
        }
        if (values.password) {
          await updatePassword(auth.currentUser, values.password).then(() => {
            toast.success("Password updated");
            setSubmitting(false);
            values.password = "";
          });
        }
      } catch (err) {
        toast.error(err.message);
      }
    }}
    validationSchema={Yup.object().shape({
      name: Yup.string().matches(/^[A-Za-z ]*$/, "Please enter valid name"),
      email: Yup.string()
        .email()
        .matches(auth.currentUser.email, "E-mail already used"),
      password: Yup.string()
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number."),
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
        <div className='settings-box'>
          <Toaster />
          <div className='title'>Settings</div>
          <form onSubmit={handleSubmit} className='form'>
            <div className='form__input'>
              <label htmlFor='name'>Change Username</label>
              <input
                name='name'
                className={errors.name && touched.name && "error"}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                type='text'
              />
              {errors.name && touched.name && (
                <div className='feedback'>{errors.name}</div>
              )}
            </div>
            <div className='form__input'>
              <label htmlFor='email'>Change your E-mail</label>
              <input
                name='email'
                className={errors.email && touched.email && "error"}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                type='email'
              />
              {errors.email && touched.email && (
                <div className='feedback'>{errors.email}</div>
              )}
            </div>
            <div className='form__input'>
              <label htmlFor='password'>Change password</label>{" "}
              <input
                name='password'
                className={errors.password && touched.password && "error"}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                type='password'
              />
              {errors.password && touched.password && (
                <div className='feedback'>{errors.password}</div>
              )}
            </div>{" "}
            <button disabled={isSubmitting} type='submit'>
              Save
            </button>
          </form>
        </div>
      );
    }}
  </Formik>
);

export default Settings;
