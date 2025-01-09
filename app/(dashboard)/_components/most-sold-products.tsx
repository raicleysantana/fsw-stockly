import { getMostSoldProducts } from "@/app/_data-access/dashboard/get-most-sold-products";
import MostSoldProductItem from "./most-sold-product-item";

const MostSoldProducts = async () => {
  const mostSoldProducts = await getMostSoldProducts();

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white">
      <p className="p-6 text-lg font-semibold text-slate-900">
        Produtos mais vendidos
      </p>

      <div className="space-y-7 overflow-auto p-6 pb-6">
        {mostSoldProducts.map((product) => (
          <MostSoldProductItem key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MostSoldProducts;
