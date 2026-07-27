"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./LoginModal.module.css";
import { IoCloseOutline } from "react-icons/io5";
import LoginForm from "@/components/LoginForm"

interface ModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
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

        <h2 className={css.modalTitle}>Log In</h2>
        <p className={css.modalText}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for a psychologist.
        </p>

        <LoginForm onSuccess={onClose} />
      </div>
    </div>,
    document.body,
  );
}
