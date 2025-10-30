import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Category } from "./types";

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
