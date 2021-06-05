export interface ShopItem {
  name: string;
  description: string;
  price: number;
}

export type GetProductListResponse = ShopItem[];