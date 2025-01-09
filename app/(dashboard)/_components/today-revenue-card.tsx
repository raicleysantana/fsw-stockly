import { getTodayRevenue } from "@/app/_data-access/dashboard/get-today-revenue";
import { formatCurrency } from "@/app/_helpers/currency";
import { DollarSign } from "lucide-react";
import {
    SummaryCard,
    SummaryCardIcon,
    SummaryCardTitle,
    SummaryCardValue,
} from "./summary-card";

const TodayRevenueCard = async () => {
  const todayRevenue = await getTodayRevenue();
  return (
    <SummaryCard>
      <SummaryCardIcon>
        <DollarSign />
      </SummaryCardIcon>
      <SummaryCardTitle>Receita Hoje</SummaryCardTitle>
      <SummaryCardValue>{formatCurrency(todayRevenue)}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TodayRevenueCard;
