import { AuthOptions } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
export default async function getSession() {
  return await getServerSession(authOptions);
}
