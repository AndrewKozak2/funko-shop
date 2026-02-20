export interface FunkoPop {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  isExclusive: boolean;
  collection: string;
}

export interface CartItem {
  product: FunkoPop;
  quantity: number;
}
