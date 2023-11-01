import Loader from "@/components/DashBoard/Loader";
import getUser from "../../api/actions/getUser";
import { User } from "@prisma/client";
import DashBoard from "@/components/DashBoard/DashBoard";

type Props = {
  params: { id: string };
};

export default async function page({ params }: Props) {
  const user = await getUser().then((res) => res);
  return <DashBoard user={user as User} />;
}

export const dynamic = "force-dynamic";
