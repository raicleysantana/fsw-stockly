"server-only"
import { db } from "@/app/_lib/prisma";

export const getTotalRevenue = async (): Promise<number> => {
  const totalRevenueQuery = `SELECT SUM("unitPrice" * quantity) AS "totalRevenue" FROM sale_product`;

  const totalRevenue =
    await db.$queryRawUnsafe<{ totalRevenue: number }[]>(totalRevenueQuery);

  return totalRevenue[0].totalRevenue;
};
