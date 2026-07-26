import css from "./Hero.module.css"
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa6";
import Image from "next/image";

export default function Hero() {
    return (
      <section className={css.section}>
        <div className={`${css.heroWrapper} container`}>
          <div className={css.content}>
            <h1 className={css.title}>
              The road to the <span className={css.accent}>depths</span> of the
              human soul
            </h1>
            <p className={css.text}>
              We help you to reveal your potential, overcome challenges and find
              a guide in your own life with the help of our experienced
              psychologists.
            </p>
            <Link
              href="/catalog"
              className={css.link}
              aria-label="View psychologists list"
            >
              Get started
              <MdArrowOutward className={css.arrow} />
            </Link>
          </div>

          <div className={css.imageWrapper}>
            <Image
              src="/Hero.png"
              className={css.heroImage}
              alt="Girl"
              width={464}
              height={526}
              priority
            />

            <div className={css.green}>
              <div className={css.checkMark}>
                <FaCheck size={20} className={css.checkIcon} />
              </div>

              <div className={css.greenText}>
                <span className={css.greenName}>Experienced psychologists</span>
                <span className={css.greenNumber}>15,000</span>
              </div>
            </div>
            <div className={css.yellow}>
              <BsFillPeopleFill className={css.peopleIcon} size={16} />
            </div>
            <div className={css.purple}>
              <FaQuestion className={css.qIcon} size={17} />
            </div>
          </div>
        </div>
      </section>
    );
}