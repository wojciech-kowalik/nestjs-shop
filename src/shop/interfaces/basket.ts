import { AddProductDto } from '../../basket/dto/add-product.dto';

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

export type ProductsFromBasketResponse = AddProductDto[];

export type GetTotalPriceResponse = number | { isSuccess: false };
