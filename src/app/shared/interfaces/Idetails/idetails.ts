
 export interface Idetails {
  discount: Discount;
  _id: string;
  title: string;
  description: string;
  originalPrice: number;
  price: number;
  quantity: number;
  category: Category;
  images: Image[];
  user: string;
  colors: string[];
  size: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  imageUrl: string;
  id: string;
}

interface Image {
  url: string;
  public_id: string;
  _id: string;
  id: string;
}

interface Category {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Discount {
  amount: number;
  type: string;
}
