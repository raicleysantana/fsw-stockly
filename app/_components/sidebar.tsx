"use client";

import {
  LayoutGrid,
  LucideProps,
  PackageIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Button } from "./ui/button";

interface iconButtonType {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

const Sidebar = () => {
  const pathName = usePathname();

  const IconButton = ({ icon: Icon, label, href }: iconButtonType) => (
    <Button
      variant={pathName === href ? "secondary" : "ghost"}
      className="justify-start gap-1 px-6 py-3"
      asChild
    >
      <Link href={href}>
        <Icon size={18} /> {label}
      </Link>
    </Button>
  );

  return (
    <div className="h-full w-64 bg-white">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold">STOCKLY</h1>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <IconButton icon={LayoutGrid} label="Dashboard" href={"/"} />
        <IconButton icon={PackageIcon} label="Produtos" href={"/products"} />
        <IconButton icon={ShoppingBasketIcon} label="Vendas" href={"/sales"} />
      </div>
    </div>
  );
};

export default Sidebar;
