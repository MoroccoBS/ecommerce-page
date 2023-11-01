"use client";
import { Order, Product, User } from "@prisma/client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const productsColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price as number);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("discount")}%</div>;
    },
  },
];

export const ordersColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "userId",
    header: "User Id",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];

export const customersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];
