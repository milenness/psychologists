"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./ConfirmModal.module.css";
import { IoMdClose } from "react-icons/io";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onCancel]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onCancel();
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
          className={css.closeButton}
          onClick={onCancel}
          aria-label="Close"
        >
          <IoMdClose size={24} />
        </button>

        <h2 className={css.modalTitle}>Are you sure you want to log out?</h2>
        <p className={css.modalText}>
          After logging out, you will need to log in to your account again.
        </p>

        <div className={css.buttonGroup}>
          <button className={css.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button className={css.confirmBtn} onClick={onConfirm}>
            Log out
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
