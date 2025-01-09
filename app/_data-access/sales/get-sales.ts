"server only";

import { db } from "@/app/_lib/prisma";

interface SaleProductDto {
  productId: string;
  quantity: number;
  unitPrice: number;
  productName: string;
}

export interface GetSalesDto {
  id: string;
  productsName: string;
  totalProducts: number;
  totalAmount: number;
  date: Date;
  saleProducts: SaleProductDto[];
}

export const getSales = async (): Promise<GetSalesDto[]> => {
  const sales = await db.sale.findMany({
    include: {
      saleProducts: {
        include: {
          product: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return sales.map((sale) => ({
    id: sale.id,
    date: sale.date,
    productsName: sale.saleProducts
      .map((saleProduct) => saleProduct.product.name)
      .join(" • "),
    totalProducts: sale.saleProducts.reduce(
      (acc, saleProduct) => acc + saleProduct.quantity,
      0,
    ),
    totalAmount: sale.saleProducts.reduce(
      (acc, saleProduct) =>
        acc + saleProduct.quantity * Number(saleProduct.unitPrice),
      0,
    ),
    saleProducts: sale.saleProducts.map(
      (saleProduct): SaleProductDto => ({
        productId: saleProduct.productId,
        productName: saleProduct.product.name,
        quantity: saleProduct.quantity,
        unitPrice: Number(saleProduct.unitPrice),
      }),
    ),
  }));
};
