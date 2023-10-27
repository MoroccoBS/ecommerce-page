"use client";
import { useEffect, useState } from "react";
import Logo from "../Logo";
import Cart from "./Cart";
import NavbarItem from "./NavbarItem";
import Profile from "./Profile";
import NavBarMobile from "./NavBarMobile";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { AiOutlineClose } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeSwitch } from "../ThemeSwitch";

const links = [
  {
    href: "#",
    name: "Collections",
  },
  {
    href: "#",
    name: "Men",
  },
  {
    href: "#",
    name: "Women",
  },
  {
    href: "#",
    name: "About",
  },
  {
    href: "#",
    name: "Contact",
  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <nav
        className={`w-full flex gap-10 items-center max-w-[1400px] px-4 relative ${
          isMobile ? "py-6" : "py-0"
        }`}
      >
        {isMobile && isMobileMenuOpen && (
          <NavBarMobile links={links} setIsMobileNavOpen={setIsMobile} />
        )}
        <button
          className={`absolute top-1/2 -translate-y-1/2 left-4 z-50 block md:hidden`}
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <Logo className={`${isMobile ? "ml-10" : ""}`} />
        {!isMobile && (
          <div className="flex gap-4 h-full justify-evenly w-[450px]">
            {links.map((link) => (
              <NavbarItem
                {...link}
                key={link.name}
                className="w-full text-center"
              />
            ))}
          </div>
        )}

        <div className="ml-auto mr-4 flex gap-6 items-center">
          {!isMobile && <ThemeSwitch />}
          <Cart className="w-6 aspect-square" />
          <Profile className="w-10" width={40} />
        </div>
      </nav>
      <AnimatePresence mode="wait">
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.15,
              type: "tween",
              // type: "spring",
              // stiffness: 125,
              // damping: 10,
              // mass: 1,
            }}
            className="fixed z-50 top-0 left-0 w-full h-[100dvh] bg-black/25"
          >
            <motion.nav
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              exit={{ x: -100 }}
              transition={{
                duration: 0.15,
                type: "tween",
              }}
              className={cn(
                "w-[80%] max-w-[300px] h-full flex items-center flex-col gap-4 bg-white sm:px-20 px-12 py-14 relative"
              )}
            >
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <AiOutlineClose className="w-6 h-6 absolute top-4 right-4 text-2xl text-primary/75 hover:text-primary transition-all" />
              </button>
              {links.map((link) => (
                <NavbarItem
                  {...link}
                  key={link.name}
                  className="w-full text-center"
                />
              ))}
            </motion.nav>
            <ThemeSwitch className="absolute bottom-4 left-1/2 -translate-x-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
