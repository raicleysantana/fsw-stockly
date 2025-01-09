"server-only";
import { db } from "@/app/_lib/prisma";
import { ProductStatusDto } from "../products/get-products";

export interface MostSoldProductDto {
  productId: string;
  name: string;
  totalSold: number;
  status: ProductStatusDto;
  price: number;
}

export const getMostSoldProducts = async (): Promise<MostSoldProductDto[]> => {
  const mostSoldProductQuery = `SELECT
      p."id" AS "productId",
      p."name",
      SUM(sp.quantity) AS "totalSold",
      p."price",
      p."stock"
    FROM
      sale_product sp
    JOIN product p ON
      p.id = sp."productId"
    GROUP BY
      p."name",
      p."price",
      p."stock",
      p."price",
      p."id"
    ORDER BY
      "totalSold" DESC
    LIMIT 5`;

  const mostSoldProducts =
    await db.$queryRawUnsafe<
      { productId: string; name: string; totalSold: number; price: number }[]
    >(mostSoldProductQuery);

  return mostSoldProducts.map((product) => ({
    ...product,
    status: product.totalSold > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
    totalSold: Number(product.totalSold),
  }));
};
