import Nav from "@/components/DashBoard/NavBar/Nav";
import getUser from "../api/actions/getUser";
import AdminProvider from "@/providers/admin-provider";
import { User } from "@prisma/client";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  return (
    <div className="w-full h-full flex items-center">
      <Nav />
      <AdminProvider user={user as User}>{children}</AdminProvider>
    </div>
  );
}
