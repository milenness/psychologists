"use client";

import { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { LuClock } from "react-icons/lu";
import css from "./AppointmentForm.module.css";

const AppointmentSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  phone: Yup.string()
    .matches(/^\+380\d{9}$/, "Phone must be in format +380XXXXXXXXX")
    .required("Phone number is required"),
  time: Yup.string().required("Meeting time is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  comment: Yup.string()
    .min(10, "Comment must be at least 10 characters")
    .max(300, "Comment must be at most 300 characters")
    .required("Comment is required"),
});

interface AppointmentFormProps {
  onSuccess?: () => void;
}

interface FormValues {
  name: string;
  phone: string;
  time: string;
  email: string;
  comment: string;
}

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 18; hour++) {
    const formattedHour = hour.toString().padStart(2, "0");
    slots.push(`${formattedHour}:00`);
    if (hour !== 18) {
      slots.push(`${formattedHour}:30`);
    }
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

export default function AppointmentForm({ onSuccess }: AppointmentFormProps) {
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsTimeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (
    values: FormValues,
    { resetForm, setSubmitting }: FormikHelpers<FormValues>,
  ) => {
    try {
      console.log("Appointment data:", values);
      resetForm();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Appointment error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        phone: "+380",
        time: "",
        email: "",
        comment: "",
      }}
      validationSchema={AppointmentSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        touched,
        isSubmitting,
        setFieldValue,
        values,
        setFieldTouched,
        handleBlur,
      }) => (
        <Form className={css.form}>
          <div className={css.inputsContainer}>
            {/* Name */}
            <div className={css.inputWrapper}>
              <Field
                type="text"
                name="name"
                placeholder="Name"
                onFocus={() => setFieldTouched("name", false, false)}
                onBlur={handleBlur}
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

            <div className={css.rowContainer}>
              {/* Phone */}
              <div className={css.inputWrapper}>
                <Field
                  type="text"
                  name="phone"
                  placeholder="+380"
                  onFocus={() => setFieldTouched("phone", false, false)}
                  onBlur={handleBlur}
                  className={`${css.input} ${
                    errors.phone && touched.phone ? css.errorInput : ""
                  }`}
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className={css.errorText}
                />
              </div>

              {/* Time */}
              <div className={css.inputWrapper} ref={dropdownRef}>
                <div
                  className={css.timeContainer}
                  onClick={() => setIsTimeOpen((prev) => !prev)}
                >
                  <Field
                    type="text"
                    name="time"
                    placeholder="00:00"
                    readOnly
                    onFocus={() => setFieldTouched("time", false, false)}
                    onBlur={handleBlur}
                    className={`${css.input} ${css.timeInput} ${
                      errors.time && touched.time && !values.time
                        ? css.errorInput
                        : ""
                    }`}
                  />
                  <span className={css.clockIcon}>
                    <LuClock size={20} />
                  </span>
                </div>

                {isTimeOpen && (
                  <div className={css.timeDropdown}>
                    <p className={css.timeDropdownTitle}>Meeting time</p>
                    <ul className={css.timeList}>
                      {TIME_SLOTS.map((slot) => (
                        <li
                          key={slot}
                          className={`${css.timeItem} ${
                            values.time === slot ? css.selectedTime : ""
                          }`}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setFieldValue("time", slot);
                            setFieldTouched("time", false, false);
                            setIsTimeOpen(false);
                          }}
                        >
                          {slot.replace(":", " : ")}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {errors.time && touched.time && !values.time && (
                  <div className={css.errorText}>{errors.time}</div>
                )}
              </div>
            </div>

            <div className={css.inputWrapper}>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                onFocus={() => setFieldTouched("email", false, false)}
                onBlur={handleBlur}
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

            {/* Comment */}
            <div className={css.inputWrapper}>
              <Field
                as="textarea"
                name="comment"
                placeholder="Comment"
                onFocus={() => setFieldTouched("comment", false, false)}
                onBlur={handleBlur}
                className={`${css.textarea} ${
                  errors.comment && touched.comment ? css.errorInput : ""
                }`}
              />
              <ErrorMessage
                name="comment"
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
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
