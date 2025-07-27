
export interface Itshirts {
  _id: string;
  title: string;
  description: string;
  originalPrice: number;
  price: number;
  quantity: number;
  category: Category;
  images: Image[];
  colors: string[];
  size: string[];
  imageUrl: string;
  id: string;
}

interface Image {
  url: string;
  id: null;
}

interface Category {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
