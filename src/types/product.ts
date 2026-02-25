export interface FunkoPop {
  id: number | string;
  title: string;
  price: number;
  imageUrl: string;
  isExclusive: boolean;
  collection: string;
  isBundle?: boolean;
  bundleImages?: string[];
  originalPrice?: number;
}

export interface CartItem {
  product: FunkoPop;
  quantity: number;
}
