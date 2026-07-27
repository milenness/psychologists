import css from "./PsychologistCard.module.css";
import Image from "next/image";
import { RiStarSFill } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";



export default function Hero() {
  return (
    <div className={css.card}>
      <div className={css.imgWrapper}>
        <Image
          src="/Default.png"
          className={css.CardAvatar}
          alt="Avatar"
          width={96}
          height={96}
          priority
        />
        <div className={css.online}></div>
      </div>
      <div className={css.contentWrapper}>
        <div className={css.nameWrapper}>
          <span className={css.profession}>Psychologist</span>
          <p className={css.name}>Dr. Mark Thompson</p>
        </div>

        <div className={css.ratingWrapper}>
          <span className={css.rating}>
            <RiStarSFill className={css.star} size={16} />
            Rating: 4.7
          </span>

          <span className={css.price}>
            Price / 1 hour: <span className={css.eccent}>180$</span>
          </span>

          <button className={css.favourite}>
            <FaRegHeart size={26} />
          </button>
        </div>
      </div>
    </div>
  );
}