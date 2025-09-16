import { LucideIcon } from "lucide-react";
import React from "react";

export interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
  active?: boolean;
}

export interface Product {
  id: string;
  category: string;
  title: string;
  store: string;
  price: string;
  image: string;
}