import prisma from "@/lib/prisma-client";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import getUser from "../actions/getUser";
import { $Enums } from "@prisma/client";

const f = createUploadthing();

const auth = async (req: Request) => {
  const user = await getUser().then((res) => res);
  if (!user) {
    return null;
  }
  if (user.role === $Enums.Role.Admin) {
    return user;
  }
  return null;
  //   const body = await req.json();
  //   const { user } = body;

  //   try {
  //     const User = await prisma.user.findUnique({
  //       where: {
  //         email: user.email,
  //       },
  //     });
  //     if (user.role === "ADMIN") {
  //       return User;
  //     }
  //     return null;
  //   } catch (error) {
  //     console.log(error);
  //   }
}; // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 5 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) {
        throw new Error("Unauthorized");
      }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
