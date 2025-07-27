export interface Iproducts {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  discount?: IDiscount;
  category: ICategory;
  imageUrl?: string;
  images?: IImage[];
  variants?: IVariant[];
}

export interface IDiscount {
  amount: number;
  type: 'percentage' | 'fixed';
}

export interface ICategory {
  _id: string;
  name: string;
}

export interface IImage {
  url: string;
  id?: string | null;
}

export interface IVariant {
  color: string;
  size: string;
  quantity: number;
  _id: string;
}
