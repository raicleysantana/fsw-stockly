"server-only"
import { db } from "@/app/_lib/prisma";

export const getTodayRevenue = async (): Promise<number> => {
  const todayRevenueQuery = `SELECT SUM("unitPrice" * "quantity") AS "todayRevenue" FROM sale_product
  JOIN "sale" s ON s.id = "saleId"
  WHERE s."date"::date = (now() AT TIME ZONE 'UTC' AT TIME ZONE '+4')::date`;

  const todayRevenue =
    await db.$queryRawUnsafe<{ todayRevenue: number }[]>(todayRevenueQuery);

  return Number(todayRevenue[0].todayRevenue);
};
