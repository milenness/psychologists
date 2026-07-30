'use client';

import { useEffect, useState } from "react";
import PsychologistCard from "@/components/PsychologistCard";
import { fetchPsychologists } from "@/services/api";
import { Psychologist } from "@/types/psychologist";
import css from "./PsychologistsList.module.css";
import Loader from "../Loader";
import CustomSelect from "../CustomSelect";
import { useAuthStore } from "@/lib/store/authStore";

const ITEMS_PER_PAGE = 3;

interface PsychologistsListProps {
  isFavoritesOnly?: boolean;
}

export default function PsychologistsList({
  isFavoritesOnly = false,
}: PsychologistsListProps) {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("asc");

  const favorites = useAuthStore((state) => state.favorites);

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

  const baseList = isFavoritesOnly
    ? psychologists.filter(
        (psychologist: Psychologist & { id?: string; _id?: string }) => {
          const psychologistId = psychologist.id || psychologist._id || "";
          return favorites.includes(psychologistId);
        },
      )
    : psychologists;

  const getSortedPsychologists = () => {
    const result = [...baseList];

    switch (filter) {
      case "asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "less_10":
        result.sort((a, b) => a.price_per_hour - b.price_per_hour);
        break;
      case "greater_10":
        result.sort((a, b) => b.price_per_hour - a.price_per_hour);
        break;
      case "popular":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "not_popular":
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
      {baseList.length > 0 && (
        <CustomSelect
          selected={filter}
          onChange={(value) => setFilter(value)}
        />
      )}

      {isFavoritesOnly && baseList.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "40px", fontSize: "18px" }}>
          У вас поки немає обраних психологів.
        </p>
      ) : (
        <>
          <ul className={css.list}>
            {visiblePsychologists.map((psychologist, index) => (
              <li key={index}>
                <PsychologistCard
                  psychologist={psychologist}
                />
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
        </>
      )}
    </section>
  );
}