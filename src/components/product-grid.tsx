import { ProductCardLayout } from "@arthur.eudeline/starbucks-tp-kit/components/products/product-card-layout";
import { ProductGridLayout } from "@arthur.eudeline/starbucks-tp-kit/components/products/product-grid-layout";
import { ProductsCategoryData } from "@arthur.eudeline/starbucks-tp-kit/types";
import Link from "next/link";
import { type FC } from "react";
import { AddToCartButton } from "./add-to-cart-button";

type Props = {
  categories: ProductsCategoryData[]
}

export const ProductGrid: FC<Props> = function ({ categories }) {
  return <div className="space-y-24 relative">
    {categories.map((cat) => (
      <section key={cat.id}>
        {/* Titre de la catégorie (ex: Latte (11)) */}
        <Link href={`/${cat.slug}`} className="link">
          <h2 className="text-lg font-semibold mb-8 tracking-tight">
            {cat.name} ({cat.products.length})
          </h2>
        </Link>

        {/* Grille des produits pour la catégorie courante */}
        <ProductGridLayout products={cat.products}>
          {(product) => (
            // Carte produit
            <ProductCardLayout
              product={product}
              button={<AddToCartButton product={product} />}
            />
          )}
        </ProductGridLayout>
      </section>
    ))}
  </div>;
};