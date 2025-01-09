import { getTotalProducts } from "@/app/_data-access/dashboard/get-total-products";
import { ShoppingBasketIcon } from "lucide-react";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";

const TotalProductsCard = async () => {
  const totalProducts = await getTotalProducts();

  return (
    <SummaryCard>
      <SummaryCardIcon>
        <ShoppingBasketIcon />
      </SummaryCardIcon>
      <SummaryCardTitle>Total de Produtos</SummaryCardTitle>
      <SummaryCardValue>{totalProducts}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalProductsCard;
