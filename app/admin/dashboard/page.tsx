import Loader from "@/components/DashBoard/Loader";
import getUser from "../../api/actions/getUser";
import { User } from "@prisma/client";
import Navbar from "@/components/DashBoard/NavBar/Navbar";

type Props = {
  params: { id: string };
};

export default async function page({ params }: Props) {
  const user = await getUser().then((res) => res);
  // console.log(user);
  return <Loader user={user as User} />;
}
