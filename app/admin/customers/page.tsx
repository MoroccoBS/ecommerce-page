import getUsers from "@/app/api/actions/getUsers";
import { customersColumns } from "@/components/DashBoard/Table/columns";
import { DataTable } from "@/components/DashBoard/Table/data-table";
import { User } from "@prisma/client";

export default async function page() {
  const users = await getUsers().then((res) => res);
  return (
    <div className="w-full h-full p-20">
      <DataTable
        columns={customersColumns}
        data={users as User[]}
        name="Customers"
      />
    </div>
  );
}
