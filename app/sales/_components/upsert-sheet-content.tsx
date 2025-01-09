"use client";

import { upsertSale } from "@/app/_actions/sale/upsert-sale";
import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { ProductDto } from "@/app/_data-access/products/get-products";
import { formatCurrency } from "@/app/_helpers/currency";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, PlusIcon } from "lucide-react";
import { flattenValidationErrors } from "next-safe-action";
import { useAction } from "next-safe-action/hooks";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import UpsertSalesTableDropDownMenu from "./upsert-table-dropdown-menu";

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface UpsertSheetContentProps {
  isOpen: boolean;
  saleId?: string;
  productsOptions: ComboboxOption[];
  products: ProductDto[];
  setSheetIsOpen: Dispatch<SetStateAction<boolean>>;
  defaultSelectedProducts?: SelectedProduct[];
}

const formSchema = z.object({
  productId: z.string().uuid({
    message: "O produto é obrigátorio.",
  }),
  quantity: z.coerce.number().int().positive(),
});

type FormSchema = z.infer<typeof formSchema>;

const UpsertSheetContent = ({
  isOpen,
  saleId,
  productsOptions,
  products,
  setSheetIsOpen,
  defaultSelectedProducts,
}: UpsertSheetContentProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    defaultSelectedProducts ?? [],
  );

  const { execute: executeUpsertSale } = useAction(upsertSale, {
    onError: ({ error: { validationErrors, serverError } }) => {
      const flattednedErrors = flattenValidationErrors(validationErrors);

      toast.error(serverError ?? flattednedErrors.formErrors[0]);
    },
    onSuccess: () => {
      toast.success("Venda realizada com sucesso.");
      setSheetIsOpen(false);
    },
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const onSubmit = (data: FormSchema) => {
    const selectedProduct = products.find(
      (product) => product.id === data.productId,
    );
    if (!selectedProduct) return;

    let resetForm = false;

    setSelectedProducts((currentProducts) => {
      const existingProduct = currentProducts.find(
        (product) => product.id === selectedProduct.id,
      );
      if (existingProduct) {
        const productIsOutOfStock =
          existingProduct.quantity + data.quantity > selectedProduct.stock;
        if (productIsOutOfStock) {
          form.setError("quantity", {
            message: "Quantidade indisponível em estoque.",
          });
          return currentProducts;
        }
        resetForm = true;

        return currentProducts.map((product) => {
          if (product.id === selectedProduct.id) {
            return {
              ...product,
              quantity: product.quantity + data.quantity,
            };
          }
          return product;
        });
      }

      const productIsOutOfStock = data.quantity > selectedProduct.stock;
      if (productIsOutOfStock) {
        form.setError("quantity", {
          message: "Quantidade indisponível em estoque.",
        });
        return currentProducts;
      }
      resetForm = true;

      if (resetForm) {
        form.reset();
      }

      return [
        ...currentProducts,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
  };

  const productTotal = useMemo(() => {
    return selectedProducts.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }, [selectedProducts]);

  const onDelete = (productId: string) => {
    setSelectedProducts((currentProduct) => {
      return currentProduct.filter((product) => product.id !== productId);
    });
  };

  const onSubmitSale = async () => {
    executeUpsertSale({
      id: saleId,
      products: selectedProducts.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
    });
  };

  useEffect(() => {
    if (!isOpen) {
      form.reset();
      setSelectedProducts([]);
    }
  }, [form, isOpen]);

  useEffect(() => {
    setSelectedProducts(defaultSelectedProducts ?? []);
  }, [defaultSelectedProducts]);

  return (
    <SheetContent className="!max-w-[700px]">
      <SheetHeader>
        <SheetTitle>Nova venda</SheetTitle>
        <SheetDescription>Insira as informções abaixo.</SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox
                    {...field}
                    placeholder="Selecione um produto..."
                    options={productsOptions}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite a quantidade"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full gap-2" variant={"secondary"}>
            <PlusIcon size={20} /> Adicionar produto à venda
          </Button>
        </form>
      </Form>

      <Table>
        <TableCaption>Lista dos produtos adicionado a venda</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço Unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(product.price * product.quantity)}
              </TableCell>
              <TableCell>
                <UpsertSalesTableDropDownMenu
                  product={product}
                  onDelete={onDelete}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              {formatCurrency(productTotal)}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <SheetFooter className="pt-6">
        <Button
          type="button"
          className="w-full gap-2"
          onClick={onSubmitSale}
          disabled={selectedProducts.length === 0}
        >
          <CheckIcon size={20} /> Finalizar Venda
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSheetContent;
