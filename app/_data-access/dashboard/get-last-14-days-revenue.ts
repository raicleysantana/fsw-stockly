"server-only";
import { db } from "@/app/_lib/prisma";
import dayjs from "dayjs";
export interface DayTotalRevenueDto {
  day: string;
  totalRevenue: number;
}

export const getLast14DaysRevenue = async (): Promise<DayTotalRevenueDto[]> => {
  const today = dayjs().endOf("day").toDate();

  const last14Days = Array.from({ length: 14 }, (_, i) =>
    dayjs(today).subtract(13 - i, "day"),
  );

  const totalLast14DaysRevenue: DayTotalRevenueDto[] = [];

  for (const day of last14Days) {
    const query = `SELECT SUM("unitPrice" * "quantity") AS "totalRevenue" FROM  sale_product 
    JOIN "sale" s ON s.id = "saleId"
    WHERE s."date" >= $1 AND s."date" <= $2`;

    const dayTotalRevenue = await db.$queryRawUnsafe<
      { totalRevenue: number }[]
    >(query, day.startOf("day").toDate(), day.endOf("day").toDate());

    totalLast14DaysRevenue.push({
      day: day.format("DD/MM"),
      totalRevenue: Number(dayTotalRevenue[0].totalRevenue),
    });
  }

  return totalLast14DaysRevenue;
};
