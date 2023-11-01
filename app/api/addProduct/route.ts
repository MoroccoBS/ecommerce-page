import { NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";
import { Product, Image } from "@prisma/client";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, price, description, images } = body;
  if (!name || !price || !description || !images) {
    return NextResponse.json(
      { error: "Name, price, description and images are required" },
      { status: 400 }
    );
  }

  const product: Product = await prisma.product.create({
    data: {
      name,
      price,
      description,
      images: {
        create: images.map((image: Image) => ({
          url: image,
        })),
      },
    },
  });

  if (!product) {
    return NextResponse.json(
      { error: "Product could not be created" },
      { status: 500 }
    );
  }

  return NextResponse.json(product);

  //   const image: Image = images.map(async (image: any) => {
  //     await prisma.image.create({
  //       data: {
  //         url: image,
  //         product: {
  //           connect: {
  //             id: product.id,
  //           },
  //         },
  //       },
  //     });
  //   });
}
