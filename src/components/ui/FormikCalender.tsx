"use client";

import React, { useEffect, useRef, useState } from "react";
import { useField } from "formik";
import dayjs from "dayjs";
import { SlCalender } from "react-icons/sl";

/* ---------------------------------- Types --------------------------------- */

interface FormikCalendarProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

/* -------------------------------- Constants ------------------------------- */

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const YEARS_PER_PAGE = 12;

/* -------------------------------- Component ------------------------------- */

const FormikCalendar: React.FC<FormikCalendarProps> = ({
  name,
  label,
  placeholder = "Select date",
  required,
  disabled,
}) => {
  const [field, meta, helpers] = useField<Date | null>(name);
  const { value } = field;
  const { setValue, setTouched } = helpers;

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"date" | "month" | "year">("date");
  const [current, setCurrent] = useState(dayjs(value || new Date()));
  const [yearStart, setYearStart] = useState(
    Math.floor(current.year() / YEARS_PER_PAGE) * YEARS_PER_PAGE
  );

  const wrapperRef = useRef<HTMLDivElement>(null);

  /* ---------------- Close on Outside Click ---------------- */

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setTouched(true);
      }
    };

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setTouched]);

  /* ---------------- Helpers ---------------- */

  const selectDate = (day: number) => {
    setValue(current.date(day).toDate());
    setTouched(true);
    setOpen(false);
  };

  const selectMonth = (month: number) => {
    setCurrent(current.month(month));
    setView("date");
  };

  const selectYear = (year: number) => {
    setCurrent(current.year(year));
    setView("month");
  };

  const clearDate = () => {
    setValue(null);
    setTouched(true);
    setOpen(false);
  };

  /* ---------------- Render ---------------- */

  return (
    <div ref={wrapperRef} className="relative">
      {/* LABEL */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* INPUT */}
      <div
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className={`relative cursor-pointer rounded-md border px-3 py-2 text-sm
          ${disabled ? "bg-[#E1E3E6]" : "bg-white"}
          ${meta.touched && meta.error ? "border-red-500" : "border-gray-300"}
        `}
      >
        {value ? dayjs(value).format("DD/MM/YYYY") : placeholder}
        <SlCalender className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
      </div>

      {/* ERROR */}
      {meta.touched && meta.error && (
        <div className="mt-1 text-xs text-red-500">{meta.error}</div>
      )}

      {/* CALENDAR */}
      {open && !disabled && (
        <div className="absolute z-50 mt-2 w-[320px] rounded-lg bg-white p-4 border border-gray-200 shadow-lg">
          {/* HEADER */}
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() =>
                view === "year"
                  ? setYearStart(yearStart - YEARS_PER_PAGE)
                  : setCurrent(
                      current.subtract(1, view === "date" ? "month" : "year")
                    )
              }
            >
              ‹
            </button>

            <button
              className="font-medium"
              onClick={() => setView(view === "date" ? "month" : "year")}
            >
              {view === "date" && current.format("MMMM YYYY")}
              {view === "month" && current.year()}
              {view === "year" &&
                `${yearStart} - ${yearStart + YEARS_PER_PAGE - 1}`}
            </button>

            <button
              onClick={() =>
                view === "year"
                  ? setYearStart(yearStart + YEARS_PER_PAGE)
                  : setCurrent(
                      current.add(1, view === "date" ? "month" : "year")
                    )
              }
            >
              ›
            </button>
          </div>

          {/* DATE VIEW */}
          {view === "date" && (
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
                <div key={d} className="text-gray-400">
                  {d}
                </div>
              ))}

              {Array.from(
                { length: current.daysInMonth() },
                (_, i) => i + 1
              ).map((day) => (
                <button
                  key={day}
                  onClick={() => selectDate(day)}
                  className={`rounded-lg py-1 ${
                    value && dayjs(value).isSame(current.date(day), "day")
                      ? "bg-[#006E7E] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          )}

          {/* MONTH VIEW */}
          {view === "month" && (
            <div className="grid grid-cols-4 gap-4 text-center">
              {months.map((m, i) => (
                <button
                  key={m}
                  onClick={() => selectMonth(i)}
                  className={`rounded-lg py-2 ${
                    current.month() === i
                      ? "bg-[#006E7E] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          )}

          {/* YEAR VIEW */}
          {view === "year" && (
            <div className="grid grid-cols-4 gap-4 text-center">
              {Array.from(
                { length: YEARS_PER_PAGE },
                (_, i) => yearStart + i
              ).map((y) => (
                <button
                  key={y}
                  onClick={() => selectYear(y)}
                  className={`rounded-lg py-2 ${
                    current.year() === y
                      ? "bg-[#006E7E] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          )}

          {/* FOOTER */}
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              className="flex-1 rounded-full bg-[#006E7E] py-2 text-white"
              onClick={() => selectDate(dayjs().date())}
            >
              Today
            </button>
            <button
              type="button"
              className="flex-1 rounded-full border py-2"
              onClick={clearDate}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormikCalendar;
