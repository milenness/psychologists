"use client";

import { useEffect, useState } from "react";
import PsychologistCard from "@/components/PsychologistCard";
import { fetchPsychologists } from "@/services/api";
import { Psychologist } from "@/types/psychologist";
import css from "./PsychologistsList.module.css";
import Loader from "../Loader";
import CustomSelect from "../CustomSelect";

const ITEMS_PER_PAGE = 3;

export default function PsychologistsList() {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Стейт для обраного критерію сортування
  const [filter, setFilter] = useState<string>("asc");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchPsychologists();
        setPsychologists(data as Psychologist[]);
      } catch (error) {
        console.error("Failed to fetch psychologists:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + ITEMS_PER_PAGE);
  };

  // Сортування масиву (картки не зникають, лише міняють порядок)
  const getSortedPsychologists = () => {
    const result = [...psychologists]; // Змінили let на const

    switch (filter) {
      case "asc": // A to Z
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "desc": // Z to A
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "less_10": // Від найнижчої ціни
        result.sort((a, b) => a.price_per_hour - b.price_per_hour);
        break;
      case "greater_10": // Від найвищої ціни
        result.sort((a, b) => b.price_per_hour - a.price_per_hour);
        break;
      case "popular": // Від найвищого рейтингу
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "not_popular": // Від найнижчого рейтингу
        result.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }

    return result;
  };

  const sortedPsychologists = getSortedPsychologists();
  const visiblePsychologists = sortedPsychologists.slice(0, visibleCount);
  const hasMore = visibleCount < sortedPsychologists.length;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={css.section}>
      <CustomSelect selected={filter} onChange={(value) => setFilter(value)} />

      <ul className={css.list}>
        {visiblePsychologists.map((psychologist, index) => (
          <li key={index}>
            <PsychologistCard psychologist={psychologist} />
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          className={css.loadMoreBtn}
          onClick={handleLoadMore}
        >
          Load more
        </button>
      )}
    </section>
  );
}
