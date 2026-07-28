"use client";

import { useState } from "react";
import css from "./PsychologistCard.module.css";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Psychologist } from "@/types/psychologist";
import { useAuthStore } from "@/lib/store/authStore";

interface PsychologistCardProps {
  psychologist: Psychologist & { id?: string; _id?: string };
}

export default function PsychologistCard({
  psychologist,
}: PsychologistCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { user, favorites, toggleFavorite } = useAuthStore();

  const psychologistId = psychologist.id || psychologist._id || "";

  const isFavorite = Boolean(user && favorites.includes(psychologistId));

  const handleFavoriteClick = () => {
    if (!user) {
      alert(
        "Будь ласка, увійдіть у систему, щоб додавати психологів в обрані!",
      );
      return;
    }
    if (psychologistId) {
      toggleFavorite(psychologistId);
    }
  };

  const {
    name,
    avatar_url,
    experience,
    reviews,
    price_per_hour,
    rating,
    license,
    specialization,
    initial_consultation,
    about,
  } = psychologist;

  return (
    <div className={css.card}>
      <div className={css.imgWrapper}>
        <Image
          src={avatar_url || "/Default.png"}
          className={css.CardAvatar}
          alt={name}
          width={96}
          height={96}
          priority
        />
        <div aria-hidden="true" className={css.online}></div>
      </div>
      <div className={css.info}>
        <div className={css.topInfo}>
          <div className={css.nameWrapper}>
            <span className={css.profession}>Psychologist</span>
            <h3 className={css.name}>{name}</h3>
          </div>

          <div className={css.ratingWrapper}>
            <span className={css.rating}>
              <FaStar className={css.star} size={16} />
              Rating: {rating}
            </span>

            <span className={css.price}>
              Price / 1 hour:{" "}
              <span className={css.eccent}>{price_per_hour}$</span>
            </span>

            <button
              type="button"
              className={css.favourite}
              onClick={handleFavoriteClick}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              {isFavorite ? (
                <FaHeart size={26} style={{ color: "var(--green)" }} />
              ) : (
                <FaRegHeart size={26} />
              )}
            </button>
          </div>
        </div>

        <div className={css.bottomInfo}>
          <ul className={css.skillsList}>
            <li className={css.skillItem}>
              <span className={css.skillName}>Experience: </span>
              {experience}
            </li>
            <li className={css.skillItem}>
              <span className={css.skillName}>License: </span>
              {license}
            </li>
            <li className={css.skillItem}>
              <span className={css.skillName}>Specialization: </span>
              {specialization}
            </li>
            <li className={css.skillItem}>
              <span className={css.skillName}>Initial consultation: </span>
              {initial_consultation}
            </li>
          </ul>

          <p className={css.description}>{about}</p>

          {!isExpanded && (
            <button
              type="button"
              className={css.readMore}
              onClick={() => setIsExpanded(true)}
            >
              Read more
            </button>
          )}

          {isExpanded && (
            <div className={css.additionalContent}>
              <ul className={css.comments}>
                {reviews.map((review, index) => (
                  <li key={index} className={css.comment}>
                    <div className={css.accInfo}>
                      <div className={css.letter}>
                        {review.reviewer.charAt(0)}
                      </div>
                      <div className={css.nameRating}>
                        <h4 className={css.accName}>{review.reviewer}</h4>
                        <span className={css.ratingNumber}>
                          <FaStar className={css.star} size={16} />
                          {review.rating}
                        </span>
                      </div>
                    </div>
                    <p className={css.comentText}>{review.comment}</p>
                  </li>
                ))}
              </ul>

              <button type="button" className={css.appointment}>
                Make an appointment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
