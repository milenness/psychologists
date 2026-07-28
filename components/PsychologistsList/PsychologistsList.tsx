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

  const getFilteredAndSortedPsychologists = () => {
    let result = [...psychologists];

    if (filter === "less_10") {
      result = result.filter((item) => item.price_per_hour < 100);
    } else if (filter === "greater_10") {
      result = result.filter((item) => item.price_per_hour >= 100);
    } else if (filter === "popular") {
      result = result.filter((item) => item.rating >= 4.8);
    } else if (filter === "not_popular") {
      result = result.filter((item) => item.rating < 4.8);
    }

    if (filter === "asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filter === "desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  };

  const filteredPsychologists = getFilteredAndSortedPsychologists();
  const visiblePsychologists = filteredPsychologists.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPsychologists.length;

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
