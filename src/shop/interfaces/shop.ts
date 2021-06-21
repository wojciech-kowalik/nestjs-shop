export interface ShopItemInterface {
  id: string;
  name: string;
  description: string;
  price: number;
}

export type GetProductResponse = ShopItemInterface;
export type GetProductListResponse = ShopItemInterface[];
export interface GetPaginatedListResponse {
  items: ShopItemInterface[];
  totalPages: number;
}
