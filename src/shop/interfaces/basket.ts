import { BasketItem } from '../../basket/basket-item.entity';

export type AddProductToBasketResponse =
  | {
      isSuccess: true;
      id: string;
    }
  | {
      isSuccess: false;
    };

export interface RemoveProductFromBasketResponse {
  isSuccess: boolean;
}

export type ProductsFromBasketResponse = BasketItem[];

export type GetTotalPriceResponse = number | { isSuccess: false };
