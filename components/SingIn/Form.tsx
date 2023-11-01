"use client";

import { useEffect, useState } from "react";
import Logo from "../Logo";
import Input from "./Input";
import { Button } from "../ui/button";
import { BsArrowLeft, BsGithub, BsGoogle } from "react-icons/bs";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { signIn } from "next-auth/react";
// import ThemeSwitch from "../ThemeSwitch";
import { ImSpinner8 } from "react-icons/im";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { userSchema, loginSchema } from "@/validations/login-validation";

export default function Form() {
  const [variants, setVariants] = useState<"LOGIN" | "REGISTER">("LOGIN");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const session = useSession();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSign = async () => {
    if (variants === "LOGIN") {
      try {
        const isValid = await loginSchema.validate(credentials, {
          abortEarly: false,
        });
        if (!isValid) {
          setErrors(isValid);
          return;
        }
        setLoading(true);
        let toastId = toast.loading("Logging in...");
        await signIn("credentials", {
          email: credentials.email,
          password: credentials.password,
          callbackUrl: "/",
          redirect: false,
        })
          .then((res) => {
            res?.error
              ? toast.error(res.error, { id: toastId })
              : (toast.success("Logged in successfully", { id: toastId }),
                router.push("/"));
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error: any) {
        // The error object contains all the validation errors
        setErrors(error.errors);
        console.log(error.errors);
      }
    } else {
      try {
        const isValid = await userSchema.validate(credentials, {
          abortEarly: false,
        });
        if (!isValid) {
          setErrors(isValid);
          return;
        }
        setLoading(true);
        await toast
          .promise(axios.post("/api/register", credentials), {
            loading: "Creating account...",
            success: "Account created successfully",
            error: (e) => {
              return e.response.data.error;
            },
          })
          .then(() => {
            signIn("credentials", credentials);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error: any) {
        // The error object contains all the validation errors
        setErrors(error.errors);
        console.log(error.errors);
      }
    }
  };

  const socialLogin = async (provider: string) => {
    let toastId = toast.loading("Logging in...");
    await signIn(provider, {
      redirect: false,
    }).finally(() => {
      toast.dismiss(toastId);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session.status, router]);

  return (
    <motion.div
      layout
      transition={{ duration: 0.25, type: "spring" }}
      className="w-11/12 max-w-2xl h-max sm:p-10 px-6 py-10 flex flex-col gap-4 relative z-10 bg-background rounded-xl shadow-2xl"
    >
      <div className="mb-2 w-full justify-between items-center flex ">
        <Logo />
        {/* <ThemeSwitch /> */}
      </div>
      <h1 className="text-2xl font-extrabold my-4 md:text-3xl">
        {variants == "REGISTER"
          ? "Welcome to Sneakers, Register Now."
          : "Welcome back, Login."}
      </h1>
      <Input
        label="Email"
        placeholder="example@example.com"
        type="email"
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
        isError={errors.email !== ""}
        error={errors.email}
        onFocus={() => {
          setErrors((prev) => ({ ...prev, email: "" }));
        }}
        loading={loading}
      />
      {variants == "REGISTER" && (
        <Input
          label="Name"
          placeholder="John Doe"
          type="text"
          value={credentials.name}
          onChange={(e) =>
            setCredentials({ ...credentials, name: e.target.value })
          }
          isError={errors.name !== ""}
          error={errors.name}
          onFocus={() => {
            setErrors((prev) => ({ ...prev, name: "" }));
          }}
          loading={loading}
        />
      )}

      <Input
        label="Password"
        placeholder="Password"
        type="password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        isError={errors.password !== ""}
        error={errors.password}
        onFocus={() => {
          setErrors((prev) => ({ ...prev, password: "" }));
        }}
        loading={loading}
      />
      <Button
        className={`text-lg group mt-2 text-white`}
        disabled={loading}
        onClick={handleSign}
      >
        {!loading ? (
          <>
            <h1 className="group-hover:-translate-x-1/4 transition-all">
              {variants == "LOGIN" ? "Login" : "Register"}
            </h1>
            <BsArrowLeft className="ml-2 rotate-180 opacity-0 group-hover:opacity-100 group-hover:translate-x-[150%] transition-all absolute" />
          </>
        ) : (
          <ImSpinner8 className="animate-spin" />
        )}
      </Button>
      <div className="w-full my-2 relative after:content-[''] after:z-0 after:absolute after:bottom-1/2 after:left-0 after:w-full after:h-[1px] after:bg-foreground/25">
        <h1 className="text-foreground/50 text-center z-10 relative bg-background w-max mx-auto px-2">
          Or continue with
        </h1>
      </div>
      <div className="flex items-center justify-center w-full gap-4 text-foreground/50">
        <Button
          variant="outline"
          className="text-lg w-full hover:bg-primary/80 hover:text-white"
          onClick={() => socialLogin("github")}
        >
          <BsGithub />
        </Button>
        <Button
          variant="outline"
          className="text-lg w-full hover:bg-primary/80 hover:text-white"
          onClick={() => socialLogin("google")}
        >
          <BsGoogle />
        </Button>
      </div>
      <p className="text-foreground/50 text-center mt-2">
        {variants == "LOGIN"
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <span
          className={`inline-block underline cursor-pointer hover:text-foreground transition-all ${
            loading ? "pointer-events-none cursor-wait" : "pointer-events-auto"
          }`}
          onClick={() => {
            setVariants(variants == "LOGIN" ? "REGISTER" : "LOGIN");
            setCredentials({ email: "", password: "", name: "" });
          }}
        >
          {variants == "LOGIN" ? "SingUp" : "SingIn"}
        </span>
      </p>
    </motion.div>
  );
}
