import { Metadata } from "next";
import { BreadCrumbs } from "@arthur.eudeline/starbucks-tp-kit/components/breadcrumbs";
import { SectionContainer } from "@arthur.eudeline/starbucks-tp-kit/components/section-container";
// Data
import { PRODUCTS_CATEGORY_DATA } from "@arthur.eudeline/starbucks-tp-kit/data";
import { ProductGridWithFilters } from "@/components/product-grid-with-filters";
const categories = PRODUCTS_CATEGORY_DATA;

export const metadata:Metadata = {
  title: `Page d’accueil - Starbucks`,
  description: "Commandez de délicieuses boissons préparées avec soin par nos baristas"
}

export default function Home() {
  return (
    <main>
      <SectionContainer>
        {/* Fil d'arianne */}
        <BreadCrumbs items={[
          {
            label: "Accueil",
            url: ""
          }
        ]} />

        {/* Grille Produit */}
        <ProductGridWithFilters categories={categories} />
      </SectionContainer>
    </main>
  );
}
