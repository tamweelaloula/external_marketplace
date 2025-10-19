export interface Category {
  id: string;
  label: string;
  icon: string;
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