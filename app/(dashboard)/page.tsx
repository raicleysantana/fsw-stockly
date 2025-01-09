import { Suspense } from "react";
import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";

import { Skeleton } from "../_components/ui/skeleton";
import Last14DaysRevenueCard from "./_components/last-14-days-revenue-card";
import MostSoldProductSkeleton from "./_components/most-sold-product-skeleton";
import MostSoldProducts from "./_components/most-sold-products";
import { SummaryCardSkeleton } from "./_components/summary-card";
import TodayRevenueCard from "./_components/today-revenue-card";
import TotalProductsCard from "./_components/total-products-card";
import TotalRevenueCard from "./_components/total-revenue-card";
import TotalSalesCard from "./_components/total-sales-card";
import TotalInStockCard from "./_components/total-sales-in-stock-card";

// Essa página será montada uma vez e reutilizada (SSG), podendo ser incrementada de forma regenerativa (ISR)
export const dynamic = "force-static";
export const revalidate = 10;

const Home = async () => {
  return (
    <div className="m-8 h-full w-full space-y-8 overflow-auto rounded-lg">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Visão geral dos dados</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>
      <div className="grid grid-cols-2 gap-6">
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalRevenueCard />
        </Suspense>

        <Suspense fallback={<SummaryCardSkeleton />}>
          <TodayRevenueCard />
        </Suspense>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalSalesCard />
        </Suspense>

        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalInStockCard />
        </Suspense>

        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalProductsCard />
        </Suspense>
      </div>

      <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-6">
        <Suspense
          fallback={
            <Skeleton className="bg-white p-6">
              <div className="space-y-2">
                <Skeleton className="h-5 w-[180px]" />
                <Skeleton className="h-4 w-[180px]" />
              </div>
            </Skeleton>
          }
        >
          <Last14DaysRevenueCard />
        </Suspense>

        <Suspense fallback={<MostSoldProductSkeleton />}>
          <MostSoldProducts />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
