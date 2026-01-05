import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Category } from "./types";
import moment from "moment-hijri";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const categories: (Category & { icon: string })[] = [
  {
    id: "dior",
    label: "DIOR",
    path: "/dior",
    icon: "/assets/svgs/electronics.svg",
  },
  {
    id: "electronics",
    label: "ELECTRONICS",
    path: "/electronics",
    icon: "/assets/svgs/camera.svg",
  },
  { id: "cars", label: "VEHICLE", path: "/cars", icon: "/assets/svgs/cars.svg" },
  {
    id: "education",
    label: "SCHOOL",
    path: "/education",
    icon: "/assets/svgs/education.svg",
  },
  {
    id: "health",
    label: "HEALTH",
    path: "/health",
    icon: "/assets/svgs/health.svg",
  },
  {
    id: "furniture",
    label: "FURNITURE",
    path: "/furniture",
    icon: "/assets/svgs/furniture.svg",
  },
  { id: "dior2", label: "DIOR", path: "/dior", icon: "/assets/svgs/cars.svg" },
  { id: "dior3", label: "DIOR", path: "/dior", icon: "/assets/svgs/cars.svg" },
];

export const jarirCategories: (Category & { icon: string })[] = [
  {
    id: "smartphones",
    label: "SMARTPHONES",
    path: "/smartphones",
    icon: "/assets/svgs/electronics.svg",
  },
  {
    id: "computers",
    label: "COMPUTERS",
    path: "/computers",
    icon: "/assets/svgs/camera.svg",
  },
];

export function wrapWithParagraphs(text: string): string {
  return text
    .trim()
    .split(/\n\s*\n/)
    .map((line) => `<p>${line.trim()}</p>`)
    .join("\n");
}

export const formatDateToDDMMYYYY = (date: string | Date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

export const convertToHijri = (date: any) => {
    // Format the date to hijri in dd/mm/yyyy
    return moment(date, "YYYY-MM-DD").format("iDD/iMM/iYYYY");
};

export const normalizeDob = (dob: unknown): string | null => {
  if (!dob) return null;
  if (typeof dob === "string") return dob;
  if (dob instanceof Date) return dob.toISOString().split("T")[0];
  return null;
};
