
export interface Iuserorder  {
  shippingAddress: ShippingAddress;
  _id: string;
  user: string;
  orderNumber: string;
  items: Item[];
  subTotal: number;
  discount: number;
  shipping: number;
  Total: number;
  status: string;
  paymentMethod: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Item {
  snapshot: Snapshot;
  product: string;
  quantity: number;
  _id: string;
}

interface Snapshot {
  title: string;
  image: string;
  originalPrice: number;
  priceAfterDiscount: number;
  discountValuePerItem: number;
  totalDiscount: number;
  totalForThisItem: number;
  color: string;
  size: string;
}

interface ShippingAddress {
  fullName: string;
  phone: string;
  anotherPhone: string;
  addressLine: string;
  city: string;
  gov: string;
  country: string;
}
