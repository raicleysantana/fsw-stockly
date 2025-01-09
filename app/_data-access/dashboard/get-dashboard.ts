"server-only";

import { ProductStatusDto } from "../products/get-products";

export interface MostSoldProductDto {
  productId: string;
  name: string;
  totalSold: number;
  status: ProductStatusDto;
  price: number;
}
