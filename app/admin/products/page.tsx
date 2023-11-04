import getProducts from "@/app/api/actions/getProducts";
import Table from "@/components/DashBoard/Products/Table";
import { productsColumns } from "@/components/DashBoard/Table/columns";
import { DataTable } from "@/components/DashBoard/Table/data-table";
import { Product } from "@prisma/client";

export default async function page() {
  const products = await getProducts().then((res) => res);

  return (
    <div className="w-full h-full">
      <Table products={products as Product[]} />
    </div>
  );
}
