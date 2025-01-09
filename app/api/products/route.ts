import { getProducts } from "@/app/_data-access/products/get-products";
import { db } from "@/app/_lib/prisma";

export async function GET() {
  const products = await getProducts();

  return Response.json(products, {
    status: 200,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const { name, price, stock } = body;

  await db.product.create({
    data: {
      name,
      price,
      stock,
    },
  });

  return Response.json({}, { status: 201 });
}
