"use client";

import { Button } from "@/app/_components/ui/button";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { ProductDto } from "@/app/_data-access/products/get-products";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import UpsertSheetContent from "./upsert-sheet-content";

interface UpsertSaleProps {
  productsOptions: ComboboxOption[];
  products: ProductDto[];
}

const UpsertSaleButton = (props: UpsertSaleProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button className="gap-2">
          <PlusIcon size={20} />
          Nova venda
        </Button>
      </SheetTrigger>

      <UpsertSheetContent
        isOpen={sheetIsOpen}
        {...props}
        setSheetIsOpen={setSheetIsOpen}
      />
    </Sheet>
  );
};

export default UpsertSaleButton;
