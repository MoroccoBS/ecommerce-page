"use server";
import prisma from "@/lib/prisma-client";

export default async function getImagesOfProduct(id: string) {
  try {
    const images = await prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        images: true,
      },
    });
    if (!images) {
      return null;
    }
    return images;
  } catch (error) {
    console.log(error);
  }
}
