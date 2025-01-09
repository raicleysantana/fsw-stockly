import { db } from "@/app/_lib/prisma";
import { NextRequest } from "next/server";

/*interface Params {
  params: {
    id: string;
  };
}*/

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("id");

  if (!productId) {
    return Response.json(
      { message: "Product ID is required" },
      { status: 404 },
    );
  }

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    return Response.json({ message: "Product not found" }, { status: 404 });
  }

  return Response.json(product, { status: 200 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("id");

  if (!productId) {
    return Response.json(
      { message: "Product ID is required" },
      { status: 404 },
    );
  }

  await db.product.delete({
    where: {
      id: productId,
    },
  });

  return Response.json({ message: "Product deleted" }, { status: 200 });
}
