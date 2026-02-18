export interface FunkoPop {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  franchise: string;
  isExclusive: boolean;
}

export interface CartItem {
  product: FunkoPop;
  quantity: number;
}
