import prisma from "@/lib/prisma-client";

export default async function getUsers() {
  try {
    const user = await prisma.user.findMany();
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.log(error);
  }
}
