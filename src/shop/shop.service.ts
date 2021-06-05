import { Injectable } from '@nestjs/common';
import { GetProductListResponse } from './interfaces/shop';

@Injectable()
export class ShopService {
  getProducts(): GetProductListResponse {
    return [
      {
        name: 'Test1',
        description: 'Lorem ipsum',
        price: 4,
      },
      {
        name: 'Test2',
        description: 'Lorem ipsum',
        price: 4.5,
      },
      {
        name: 'Test3',
        description: 'Lorem ipsum',
        price: 5.5,
      },
    ];
  }

  hasProduct(name: string): boolean {
    return this.getProducts().some((item) => item.name === name);
  }

  getPriceOfProduct(name: string): number {
    return this.getProducts().find((item) => item.name === name).price;
  }
}
