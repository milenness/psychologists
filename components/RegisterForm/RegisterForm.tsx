"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { LuEye } from "react-icons/lu";
import { FiEyeOff } from "react-icons/fi";
import { registerUser } from "@/services/authService";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./RegisterForm.module.css";

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface RegisterFormProps {
  onSuccess?: () => void;
}

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (
    values: FormValues,
    { resetForm, setSubmitting, setFieldError }: FormikHelpers<FormValues>,
  ) => {
    try {
      const firebaseUser = await registerUser({
        email: values.email,
        password: values.password,
        name: values.name,
      });

      setUser({
        email: firebaseUser.email,
        displayName: values.name,
      });

      resetForm();
      if (onSuccess) onSuccess();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";

      if (errorMessage.includes("email-already-in-use")) {
        setFieldError("email", "Ця пошта вже використовується");
      } else {
        console.error("Firebase registration error:", errorMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={RegisterSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.inputsContainer}>
            <div className={css.inputWrapper}>
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className={`${css.input} ${
                  errors.name && touched.name ? css.errorInput : ""
                }`}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={css.errorText}
              />
            </div>

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

          <button
            type="submit"
            disabled={isSubmitting}
            className={css.submitButton}
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
