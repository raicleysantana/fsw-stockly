import { getTotalInStock } from "@/app/_data-access/dashboard/get-total-in-stock";
import { PackageIcon } from "lucide-react";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";

const TotalInStockCard = async () => {
  const totalStock = await getTotalInStock();

  return (
    <SummaryCard>
      <SummaryCardIcon>
        <PackageIcon />
      </SummaryCardIcon>
      <SummaryCardTitle>Total em estoque</SummaryCardTitle>
      <SummaryCardValue>{totalStock}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalInStockCard;
