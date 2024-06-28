export type Product = {
  category?: string;
  condition?: string;
  description?: string;
  images: string[];
  originalPrice?: number;
  price: number;
  title: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
};
