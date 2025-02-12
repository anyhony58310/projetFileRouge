import { NextRequest, NextResponse } from "next/server";
import { ProductFiltersResult } from "../../../types";
import prisma from "@/prisma";

export async function GET(request: NextRequest) {
  const params: ProductFiltersResult = {
    categoriesSlugs: request.nextUrl.searchParams.getAll("cat"),
    search: request.nextUrl.searchParams.get("search") ?? undefined,
  };

  // Si les deux paramètres sont vides, retourner tous les produits
  if (!params.search && params.categoriesSlugs.length === 0) {
    const categories = await prisma.productCategory.findMany({
      include: {
        products: true,
      },
    });
    return NextResponse.json({
      params,
      categories,
    });
  }

  const categories = await prisma.productCategory
    .findMany({
      include: {
        // Filters on product name
        products: params.search
          ? {
              where: {
                name: {
                  contains: params.search,
                  // Ignore the case
                  mode: "insensitive",
                },
              },
            }
          : true,
      },
      // Filters on categories slugs
      where: params.categoriesSlugs.length > 0
        ? {
            slug: {
              in: params.categoriesSlugs,
            },
          }
        : undefined,
    })
    // Remove empty categories from results
    .then((categories) => {
      console.log(categories);
      return categories.filter((cat) => cat.products.length > 0);
    });

  return NextResponse.json({
    params,
    categories,
  });
}
