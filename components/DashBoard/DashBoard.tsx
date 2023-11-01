import { User } from "@prisma/client";
import Nav from "./NavBar/Nav";

interface DashBoardProps {
  user: User;
}

export default function DashBoard({ user }: DashBoardProps) {
  return <div className="w-full h-full">Dashboard</div>;
}
