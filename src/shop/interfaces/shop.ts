export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

export type GetProductResponse = ShopItem;
export type GetProductListResponse = ShopItem[];