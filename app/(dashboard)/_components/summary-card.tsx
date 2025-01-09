import { Skeleton } from "@/app/_components/ui/skeleton";
import { ReactNode } from "react";

interface SummaryCardProps {
  children: ReactNode;
}

export const SummaryCardIcon = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-md bg-emerald-500 bg-opacity-10 text-slate-500">
      {children}
    </div>
  );
};

export const SummaryCardTitle = ({ children }: SummaryCardProps) => {
  return <p className="font-meudium text-sm text-slate-500">{children}</p>;
};

export const SummaryCardValue = ({ children }: SummaryCardProps) => {
  return <p className="text-2xl font-semibold text-slate-900">{children}</p>;
};

export const SummaryCard = ({ children }: SummaryCardProps) => {
  return <div className="rounded-xl bg-white p-6">{children}</div>;
};

export const SummaryCardSkeleton = () => (
  <Skeleton className="bg-white p-6">
    <div className="space-y-2">
      <Skeleton className="h-9 w-9 bg-gray-200" />
      <Skeleton className="h-5 w-[86.26px] bg-gray-200" />
      <Skeleton className="h-8 w-48 bg-gray-200" />
    </div>
  </Skeleton>
);
