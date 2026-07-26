"use client";

import css from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
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
            {/* Для Home просто звичайний пункт без активного класу */}
            <li className={css.navItem}>
              <Link href="/" className={css.link} aria-label="Go to home page">
                Home
              </Link>
            </li>

            {/* Активна крапка тільки тут */}
            <li
              className={`${css.navItem} ${pathname === "/catalog" ? css.active : ""}`}
            >
              <Link
                href="/catalog"
                className={css.link}
                aria-label="View psychologists list"
              >
                Psychologists
              </Link>
            </li>

            {/* І тут */}
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
              <Link className={css.authLogin} href="/sign-in">
                Login
              </Link>
            </li>

            <li className={css.authItem}>
              <Link className={css.authRegister} href="/sign-in">
                Register
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
