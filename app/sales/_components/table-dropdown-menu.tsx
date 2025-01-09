import { deleteSale } from "@/app/_actions/sale/delete-sale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { ProductDto } from "@/app/_data-access/products/get-products";
import { GetSalesDto } from "@/app/_data-access/sales/get-sales";
import {
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";
import UpsertSheetContent from "./upsert-sheet-content";

interface SalesTableDropdownMenuProps {
  sale: Pick<GetSalesDto, "id" | "saleProducts">;
  productOptions: ComboboxOption[];
  products: ProductDto[];
}

const SalesTableDropDownMenu = ({
  sale,
  productOptions,
  products,
}: SalesTableDropdownMenuProps) => {
  const [upsertSheetIsOpen, setUpsertIsOpen] = useState(false);

  const { execute } = useAction(deleteSale, {
    onSuccess: () => toast.success("Venda deletada com sucesso"),
    onError: () => toast.error("Erro ao deletar venda"),
  });

  const handleCopyToClipboardClick = () => {
    navigator.clipboard.writeText(sale.id);
    toast.success("ID copiado para a área de transferência");
  };

  const handleConfirmDeleteClick = () => execute({ id: sale.id });

  return (
    <Sheet open={upsertSheetIsOpen} onOpenChange={setUpsertIsOpen}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-1.5"
              onClick={() => handleCopyToClipboardClick()}
            >
              <ClipboardCopyIcon size={16} />
              Copiar ID
            </DropdownMenuItem>

            <SheetTrigger asChild>
              <DropdownMenuItem className="gap-1.5">
                <EditIcon size={16} />
                Editar
              </DropdownMenuItem>
            </SheetTrigger>

            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="gap-1.5">
                <TrashIcon size={16} />
                Deletar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a excluir esta venda. Esta ação não pode ser
              desfeita. Deseja continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDeleteClick}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <UpsertSheetContent
        isOpen={upsertSheetIsOpen}
        saleId={sale.id}
        productsOptions={productOptions}
        products={products}
        setSheetIsOpen={setUpsertIsOpen}
        defaultSelectedProducts={sale.saleProducts.map((saleProduct) => ({
          id: saleProduct.productId,
          quantity: saleProduct.quantity,
          price: Number(saleProduct.unitPrice),
          name: saleProduct.productName,
        }))}
      />
    </Sheet>
  );
};

export default SalesTableDropDownMenu;
