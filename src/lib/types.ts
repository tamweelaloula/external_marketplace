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
  title_en?: string;
  title_ar?: string;
  store: string;
  price: string;
  image: string;
  product_type?: string;
  product_id?: string;
  document_ld?: string;
  main_image_url?: string;
  currency?: string;
}