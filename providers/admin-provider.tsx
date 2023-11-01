"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { User, Role } from "@prisma/client";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";

interface LoaderProps {
  user: User;
  children: React.ReactNode;
}

export default function Loader({ user, children }: LoaderProps) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [spinner, setSpinner] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const checkIfAdmin = (user: User) => {
    if (!user) {
      setSpinner(false);
      setIsLoggedIn(false);
      setIsAdmin(false);
      return;
    }
    const isAdmin = user.role === Role.Admin;
    if (isAdmin) {
      setIsAdmin(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      setIsAdmin(false);
      setSpinner(false);
    }
  };

  useEffect(() => {
    checkIfAdmin(user);
  }, [user]);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            exit={{ opacity: 0 }}
            className="w-full h-full fixed z-50 bg-foreground/25 backdrop-blur-lg flex flex-col"
          >
            {spinner && <Spinner className="m-auto" />}
            {!spinner && !isAdmin && isLoggedIn && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-red-500 text-4xl m-auto"
              >
                You are not authorized to access this page.
              </motion.div>
            )}
            {!spinner && !isLoggedIn && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-red-500 text-4xl m-auto flex flex-col gap-4 justify-center items-center bg-background p-20 rounded-xl"
              >
                <h1>You are not logged in.</h1>
                <Link href="/login">
                  <Button className="text-xl">Login</Button>
                </Link>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {!loading && isAdmin && children}
    </>
  );
}
