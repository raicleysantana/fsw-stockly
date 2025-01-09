import { getTotalSales } from "@/app/_data-access/dashboard/get-total-sales";
import { CircleDollarSign } from "lucide-react";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";

const TotalSalesCard = async () => {
  const totalSales = await getTotalSales();

  return (
    <SummaryCard>
          <SummaryCardIcon>
            <CircleDollarSign />
          </SummaryCardIcon>
          <SummaryCardTitle>Vendas Totais</SummaryCardTitle>
          <SummaryCardValue>{totalSales}</SummaryCardValue>
        </SummaryCard>
  );
};

export default TotalSalesCard;
