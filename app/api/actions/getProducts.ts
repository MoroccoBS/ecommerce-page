import prisma from "@/lib/prisma-client";

export default async function getUsers() {
  try {
    const products = await prisma.product.findMany();
    if (!products) {
      return null;
    }
    return products;
  } catch (error) {
    console.log(error);
  }
}
