"use client";

import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import { AnimatePresence, motion } from "framer-motion";
import { User, Role } from "@prisma/client";
import DashBoard from "./DashBoard";

interface LoaderProps {
  user: User;
}

export default function Loader({ user }: LoaderProps) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [spinner, setSpinner] = useState(true);

  const checkIfAdmin = (user: User) => {
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
    console.log(user);
  }, [user]);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            exit={{ opacity: 0 }}
            className="w-full h-full fixed z-50 bg-foreground/25 backdrop-blur-lg flex"
          >
            {spinner && <Spinner className="m-auto" />}
            {!spinner && !isAdmin && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-red-500 text-4xl m-auto"
              >
                You are not authorized to access this page.
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {!loading && isAdmin && <DashBoard user={user as User} />}
    </>
  );
}
