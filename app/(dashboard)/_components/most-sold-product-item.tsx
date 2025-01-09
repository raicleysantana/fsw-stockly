import ProductStatusBadge from "@/app/_components/product-status-badge";
import { MostSoldProductDto } from "@/app/_data-access/dashboard/get-dashboard";
import { formatCurrency } from "@/app/_helpers/currency";

interface MostSoldProductProps {
  product: MostSoldProductDto;
}

const MostSoldProductItem = ({ product }: MostSoldProductProps) => {
  return (
    <div className="item-center flex justify-between">
      <div className="space-y-[6px]">
        <ProductStatusBadge status={product.status} />
        <p className="font-semibold">{product.name}</p>
        <p className="font-medium text-slate-500">
          {formatCurrency(product.price)}
        </p>
      </div>

      <div>
        <p className="font-semibold">{product.totalSold} vendido(s)</p>
      </div>
    </div>
  );
};

export default MostSoldProductItem;
