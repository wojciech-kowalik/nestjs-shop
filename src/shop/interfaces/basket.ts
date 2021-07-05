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

export interface GetStatisticsResponse {
  itemInBasketAvgPrice: number;
  basketAvgTotalPrice: number;
}

export type ProductsFromBasketResponse = BasketItem[];

export type GetTotalPriceResponse = number | { isSuccess: false };
