"use client";

import { Product } from "@prisma/client";
import { productsColumns } from "../Table/columns";
import { DataTable } from "../Table/data-table";
import { useState } from "react";
import Modal from "./Modal";
import { AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
interface TableProps {
  products: Product[];
}

export default function Table({ products }: TableProps) {
  const [productModal, setProductModal] = useState(false);
  return (
    <>
      <DataTable
        columns={productsColumns}
        data={products as Product[]}
        name="Products"
        button={true}
        btnLabel="Add Product"
        setModal={setProductModal}
      />
      <Dialog open={productModal} onOpenChange={setProductModal}>
        <Modal />
      </Dialog>
    </>
  );
}
