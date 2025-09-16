import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  Monitor,
  Camera,
  Car,
  GraduationCap,
  HeartPulse,
  Armchair,
  LucideIcon
} from "lucide-react";
import { Category } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const categories: (Category & { icon: LucideIcon })[] = [
  { id: "dior", label: "DIOR", path: "/dior", icon: Monitor,  active: true },
  { id: "electronics", label: "ELECTRONICS", path: "/electronics", icon: Camera },
  { id: "cars", label: "CARS", path: "/cars", icon: Car },
  { id: "education", label: "EDUCATION", path: "/education", icon: GraduationCap },
  { id: "health", label: "HEALTH", path: "/health", icon: HeartPulse },
  { id: "furniture", label: "FURNITURE", path: "/furniture", icon: Armchair },
];