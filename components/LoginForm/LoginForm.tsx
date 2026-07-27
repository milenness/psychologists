"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { LuEye } from "react-icons/lu";
import { FiEyeOff } from "react-icons/fi";
import css from "./LoginForm.module.css";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface LoginFormProps {
  onSuccess?: () => void;
}

interface FormValues {
  email: string;
  password: string;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

 const handleSubmit = (
   values: FormValues,
   { resetForm }: FormikHelpers<FormValues>,
 ) => {
   console.log("Form submitted values:", values);
   resetForm();
   if (onSuccess) onSuccess();
 };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
          <div className={css.inputsContainer}>
            <div className={css.inputWrapper}>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className={`${css.input} ${
                  errors.email && touched.email ? css.errorInput : ""
                }`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.errorText}
              />
            </div>
  
            <div className={css.inputWrapper}>
              <div className={css.passwordContainer}>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className={`${css.input} ${css.passwordInput} ${
                    errors.password && touched.password ? css.errorInput : ""
                  }`}
                />
                <button
                  type="button"
                  className={css.eyeButton}
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <LuEye size={20} /> : <FiEyeOff size={20} />}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className={css.errorText}
              />
            </div>
          </div>

          <button type="submit" className={css.submitButton}>
            Log In
          </button>
        </Form>
      )}
    </Formik>
  );
}
