"use client";

import css from "./Header.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // 1. Додали useRouter
import { useAuthStore } from "@/lib/store/authStore";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { IoMdPerson } from "react-icons/io";

interface HeaderProps {
  onOpenLoginModal: () => void;
  onOpenRegisterModal: () => void;
}

export default function Header({
  onOpenLoginModal,
  onOpenRegisterModal,
}: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter(); // 2. Ініціалізували роутер
  const { user, clearUser } = useAuthStore(); // 3. Дістали саме clearUser замість setUser

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearUser(); // 4. Повністю очищає юзера і масив обраних (сердечка стають прозорими)
      router.push("/"); // 5. Перенаправляє на головну сторінку
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className={css.header}>
      <div className="container">
        <nav className={css.nav}>
          <Link href="/" className={css.logo} aria-label="Go to home page">
            <span className={css.accentGreen}>psychologists</span>
            <span className={css.accentWeight}>.</span>
            <span className={css.accentBlack}>services</span>
          </Link>

          <ul className={css.navLinks}>
            <li className={css.navItem}>
              <Link href="/" className={css.link} aria-label="Go to home page">
                Home
              </Link>
            </li>

            <li
              className={`${css.navItem} ${pathname === "/psychologists" ? css.active : ""}`}
            >
              <Link
                href="/psychologists"
                className={css.link}
                aria-label="View psychologists list"
              >
                Psychologists
              </Link>
            </li>

            {user && (
              <li
                className={`${css.navItem} ${pathname === "/favorites" ? css.active : ""}`}
              >
                <Link
                  href="/favorites"
                  className={css.link}
                  aria-label="View favorites list"
                >
                  Favorites
                </Link>
              </li>
            )}
          </ul>

          <ul className={css.authList}>
            {user ? (
              <>
                <li className={css.authItem}>
                  <div className={css.accAvatar}>
                    <IoMdPerson size={20} />
                  </div>
                  <span className={css.userName}>
                    {user.displayName || "User"}
                  </span>
                </li>
                <li className={css.authItem}>
                  <button
                    type="button"
                    className={css.authLogout}
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className={css.authItem}>
                  <button
                    type="button"
                    className={css.authLogin}
                    onClick={onOpenLoginModal}
                  >
                    Log In
                  </button>
                </li>

                <li className={css.authItem}>
                  <button
                    type="button"
                    className={css.authRegister}
                    onClick={onOpenRegisterModal}
                  >
                    Register
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
