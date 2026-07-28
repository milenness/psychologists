"use client";

import css from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  onOpenLoginModal: () => void;
  onOpenRegisterModal: () => void;
}

export default function Header({
  onOpenLoginModal,
  onOpenRegisterModal,
}: HeaderProps) {
  const pathname = usePathname();

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
              className={`${css.navItem} ${pathname === "/catalog" ? css.active : ""}`}
            >
              <Link
                href="/psychologists"
                className={css.link}
                aria-label="View psychologists list"
              >
                Psychologists
              </Link>
            </li>

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
          </ul>

          <ul className={css.authList}>
            <li className={css.authItem}>
              <button
                type="button"
                className={css.authLogin}
                onClick={onOpenLoginModal}
              >
                Login
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
          </ul>
        </nav>
      </div>
    </header>
  );
}
