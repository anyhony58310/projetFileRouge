// Importation des dépendances
import { Metadata } from "next";
import { BreadCrumbs } from "@arthur.eudeline/starbucks-tp-kit/components/breadcrumbs";
import { SectionContainer } from "@arthur.eudeline/starbucks-tp-kit/components/section-container";
import { ProductGridWithFilters } from "@/components/product-grid-with-filters";
import prisma from "@/prisma";

const getCategoriesFromDb = async () => {
  try {
    // Récupération des catégories avec prisma
    const categories = await prisma.productCategory.findMany({
      include: {
        products: true,
      },
    });
    
    return categories;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories", error);
    return [];
  }
};

export const metadata: Metadata = {
  title: `Page d’accueil - Starbucks`,
  description: "Commandez de délicieuses boissons préparées avec soin par nos baristas",
};

export default async function Home() {
  const categories = await getCategoriesFromDb();

  const categoriesWithProductCount = categories.map((cat) => ({
    ...cat,
    count: cat.products ? cat.products.length : 0,
  }));

  return (
    <main>
      <SectionContainer>
        {/* Fil d'arianne */}
        <BreadCrumbs
          items={[
            {
              label: "Accueil",
              url: "",
            },
          ]}
        />

        {/* Grille Produit avec les catégories dynamiques */}
        <ProductGridWithFilters categories={categoriesWithProductCount} />
      </SectionContainer>
    </main>
  );
}
