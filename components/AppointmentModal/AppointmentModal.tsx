"use client";

import { useEffect, MouseEvent } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import css from "./AppointmentModal.module.css";
import { IoCloseOutline } from "react-icons/io5";
import AppointmentForm from "../AppointmentForm";
import Image from "next/image";

interface AppointmentModalProps {
  onClose: () => void;
  name: string;
  avatar_url: string;
}

export default function AppointmentModal({
  onClose,
  name,
  avatar_url,
}: AppointmentModalProps) {
  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleSuccess = () => {
    toast.success("Your application has been successfully sent!");
    onClose();
  };

  if (typeof window === "undefined") return null;

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <IoCloseOutline className={css.closeIcon} size={32} />
        </button>

        <h2 className={css.modalTitle}>
          Make an appointment with a psychologist
        </h2>
        <p className={css.modalText}>
          You are on the verge of changing your life for the better. Fill out
          the short form below to book your personal appointment with a
          professional psychologist. We guarantee confidentiality and respect
          for your privacy.
        </p>

        <div className={css.psychologWrapper}>
          <Image
            src={avatar_url || "/Default.png"}
            className={css.cardAvatar}
            alt={name}
            width={44}
            height={44}
            priority
          />

          <div className={css.nameWrapper}>
            <span className={css.title}>Your psychologist</span>
            <h5 className={css.name}>{name}</h5>
          </div>
        </div>

        <AppointmentForm onSuccess={handleSuccess} psychologistName={name} />
      </div>
    </div>,
    document.body,
  );
}
