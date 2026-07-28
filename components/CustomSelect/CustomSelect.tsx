"use client";

import { useState, useRef, useEffect } from "react";
import css from "./CustomSelect.module.css";
import { FaChevronDown } from "react-icons/fa";

const options = [
  { label: "A to Z", value: "asc" },
  { label: "Z to A", value: "desc" },
  { label: "Less than 10$", value: "less_10" },
  { label: "Greater than 10$", value: "greater_10" },
  { label: "Popular", value: "popular" },
  { label: "Not popular", value: "not_popular" },
  { label: "Show all", value: "all" },
];

interface CustomSelectProps {
  selected: string;
  onChange: (value: string, label: string) => void;
}

export default function CustomSelect({
  selected,
  onChange,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedLabel =
    options.find((opt) => opt.value === selected)?.label || "A to Z";

  return (
    <div className={css.wrapper} ref={dropdownRef}>
      <span className={css.labelTitle}>Filters</span>

      <button
        type="button"
        className={`${css.selectButton} ${isOpen ? css.open : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selectedLabel}</span>
        <FaChevronDown
          className={`${css.arrow} ${isOpen ? css.arrowRotated : ""}`}
          size={14}
        />
      </button>

      {isOpen && (
        <ul className={css.dropdownList}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`${css.dropdownItem} ${selected === option.value ? css.selected : ""}`}
              onClick={() => {
                onChange(option.value, option.label);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
