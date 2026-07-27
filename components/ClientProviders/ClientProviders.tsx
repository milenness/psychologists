"use client";

import { useState } from "react";
import Header from "@/components/Header";
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <Header
        onOpenLoginModal={() => setIsLoginOpen(true)}
        onOpenRegisterModal={() => setIsRegisterOpen(true)}
      />
      <main>{children}</main>

      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}

      {isRegisterOpen && (
        <RegisterModal onClose={() => setIsRegisterOpen(false)} />
      )}
    </>
  );
}
