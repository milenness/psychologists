"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import css from "./ErrorWhileSavingModal.module.css";

interface ErrorWhileSavingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ErrorWhileSavingModal({
  isOpen,
  onClose,
}: ErrorWhileSavingModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <button
          type="button"
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          <IoMdClose size={24} />
        </button>

        <h2 className={css.modalTitle}>Authorization required</h2>

        <p className={css.modalText}>
          Please log in to your account to save psychologists to your favorites.
        </p>

          <button type="button" className={css.confirmBtn} onClick={onClose}>
            OK
          </button>
      </div>
    </div>,
    document.body,
  );
}
