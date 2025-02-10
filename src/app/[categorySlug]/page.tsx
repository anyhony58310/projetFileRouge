import { BreadCrumbs } from "@arthur.eudeline/starbucks-tp-kit/components/breadcrumbs";
import { SectionContainer } from "@arthur.eudeline/starbucks-tp-kit/components/section-container";
import { ProductGrid } from "@/components/product-grid";
import { NextPageProps } from "@/types";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import prisma from "@/prisma";

type Props = {
  categorySlug: string;
};

/**
 * Récupère une catégorie produit à partir de son slug depuis la base de données
 */
const getCategoryFromDb = async (slug: string) => {
  try {
    const category = await prisma.productCategory.findUnique({
      where: { slug },
      include: { products: true },
    });

    if (!category) return null;

    return {
      ...category,
      count: category.products.length,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération de la catégorie", error);
    return null;
  }
};

export async function generateMetadata({ params }: NextPageProps<Props>): Promise<Metadata | null> {
  const category = await getCategoryFromDb(params.categorySlug);
  if (!category) return null;

  return {
    title: category.name,
    description: `Trouvez votre inspiration avec un vaste choix de boissons Starbucks parmi nos produits ${category.name}`,
  };
}

export default async function CategoryPage({ params }: NextPageProps<Props>) {
  const category = await getCategoryFromDb(params.categorySlug);
  if (!category) notFound();

  return (
    <SectionContainer>
      <BreadCrumbs 
        items={[
          { label: "Accueil", url: "/" },
          { label: category.name, url: `/${category.slug}` },
        ]}
      />
      <ProductGrid categories={[category]} />
    </SectionContainer>
  );
}
