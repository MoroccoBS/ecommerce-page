"use client";
import { useState } from "react";
import Navbar from "./Navbar";
import { useSession } from "next-auth/react";

interface NavProps {
  className?: string;
}

type user = { name: string; image: string | null; email: string };

export default function Nav({ className }: NavProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [timeOutId, setTimeOutId] = useState(0);
  const session = useSession();

  const handleNav = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (timeOutId) {
      window.clearTimeout(timeOutId);
    }
    if (event.type === "mouseenter") {
      setTimeOutId(window.setTimeout(() => setIsNavOpen(true), 250));
    } else {
      setTimeOutId(window.setTimeout(() => setIsNavOpen(false), 250));
    }
  };

  return (
    <div
      className={`w-full h-full relative overflow-hidden ${
        !isNavOpen ? "max-w-[90px]" : "max-w-sm"
      } shadow-[1.5rem_0_2rem_rgba(0,0,0,0.1)] transition-all`}
      onMouseEnter={handleNav}
      onMouseLeave={handleNav}
    >
      <Navbar
        session={session.data?.user as user}
        setIsNavOpen={setIsNavOpen}
        isNavOpen={isNavOpen}
      />
    </div>
  );
}
