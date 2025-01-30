import { BreadCrumbs } from "@arthur.eudeline/starbucks-tp-kit/components/breadcrumbs";
import { SectionContainer } from "@arthur.eudeline/starbucks-tp-kit/components/section-container";
import { ProductGrid } from "@/components/product-grid";
import { NextPageProps } from "@/types";
import { notFound } from "next/navigation";
import { PRODUCTS_CATEGORY_DATA } from "@arthur.eudeline/starbucks-tp-kit/data";
import { ProductsCategoryData } from "@arthur.eudeline/starbucks-tp-kit/types";
import { cache } from "react";
import { Metadata } from "next";

type Props = {
  categorySlug: string;
};

/**
 * Récupère une catégorie produit à partir de son slug
 */
const getCategory = cache(async (slug: string) : Promise<ProductsCategoryData | null> => {
  return PRODUCTS_CATEGORY_DATA.find(cat => cat.slug === slug) ?? null;
});

export async function generateMetadata({ params } : NextPageProps<Props>) : Promise<Metadata | null > {
  const category = await getCategory(params.categorySlug);
  if (!category) return null;

  return {
    title: category.name,
    description: `Trouvez votre inspiration avec un vaste choix de boissons Starbucks parmi nos produits ${category.name}`
  }
}

export default async function CategoryPage({params}: NextPageProps<Props>) {
  const category = await getCategory(params.categorySlug);
  if (!category) notFound();

  return <SectionContainer>
    <BreadCrumbs 
      items={[
        {
          label: "Accueil",
          url: "/"
        },
        {
          label: category.name,
          url: `/${category.slug}`
        }
      ]}
    />

    <ProductGrid categories={[category]} />
  </SectionContainer>
}