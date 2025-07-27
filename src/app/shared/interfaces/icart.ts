 export interface Icart {
  _id: string;
  user: string;
  items: Item[];
  subTotal: number;
  createdAt: string;
  updatedAt: string;
}

interface Item {
  product: Product;
  quantity: number;
  color: string;
  size: string;
  _id: string;
  itemTotalPrice: number;
}

interface Product {
  _id: string;
  title: string;
  originalPrice: number;
  price: number;
  quantity: number;
  images: Image[];
  imageUrl: string;
  id: string;
}

interface Image {
  url: string;
  public_id: string;
  _id: string;
  id: string;
}
