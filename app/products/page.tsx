import { DataTable } from "@/app/_components/ui/data-table";

import { getProducts } from "@/app/_data-access/products/get-products";

import Header, {
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import CreateProductButton from "./_components/create-product-button";
import { productTableColumns } from "./_components/table-columns";

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <div className="m-8 h-fit w-full min-h-full space-y-8 rounded-lg bg-white p-8 overflow-auto">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle> Gestão de Produtos</HeaderSubtitle>
          <HeaderTitle>Produtos</HeaderTitle>
        </HeaderLeft>

        <HeaderRight>
          <CreateProductButton />
        </HeaderRight>
      </Header>

      <DataTable
        columns={productTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      />
    </div>
  );
};

export default ProductsPage;
