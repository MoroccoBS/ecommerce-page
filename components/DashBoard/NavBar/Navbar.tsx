import Profile from "./Profile";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { FaStore, FaBitbucket, FaBox } from "react-icons/fa";
import NavItem from "./NavItem";
import { BsPeopleFill } from "react-icons/bs";

interface NavbarProps {
  className?: string;
  session: { name: string; image: string | null; email: string };
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isNavOpen: boolean;
}

const size = 21;

const NavBarItems = [
  {
    label: "DashBoard",
    href: "/admin/dashboard",
    icon: <FaStore size={size} />,
  },

  {
    label: "Orders",
    href: "/admin/orders",
    icon: <FaBitbucket size={size} />,
  },

  {
    label: "Products",
    href: "/admin/products",
    icon: <FaBox size={size} />,
  },
  {
    label: "Customers",
    href: "/admin/customers",
    icon: <BsPeopleFill size={size} />,
  },
];

export default function Navbar({
  session,
  className,
  setIsNavOpen,
  isNavOpen,
}: NavbarProps) {
  return (
    <motion.div
      className={`w-[384px] h-full px-6 py-4 bg-white flex flex-col absolute`}
    >
      <div className="w-full flex flex-row justify-between">
        <Profile image={session?.image || ""} name={session?.name} />
        <button onClick={() => setIsNavOpen((prev) => !prev)}>
          <ChevronLeft
            className="text-foreground/50 hover:text-foreground transition-all"
            size={30}
          />
        </button>
      </div>
      <div className="w-full h-max flex flex-col gap-5 mt-20">
        {NavBarItems.map((item) => (
          <NavItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            href={item.href}
          />
        ))}
      </div>
    </motion.div>
  );
}
