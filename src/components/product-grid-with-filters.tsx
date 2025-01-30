"use client";

import { type FC, useMemo, useState } from "react";
import { ProductFiltersResult } from "@/types";
import { ProductFilters } from "./product-filters";
import { ProductGrid } from "./product-grid";
import { ProductsCategoryData } from "@arthur.eudeline/starbucks-tp-kit/types";
import { filterProducts } from "@/lib/filter-products";

type Props = {
  categories: ProductsCategoryData[]
}

export const ProductGridWithFilters: FC<Props> = function ({ categories }) {
  // Stoque la valeur des filtres du formulaire
  const [filters, setFilters] = useState<ProductFiltersResult | undefined>();

  // garde en mémoire le filtrage des catégories, la valeur est mise à jour à chaque modification des filtres
  const filteredCategories: ProductsCategoryData[] = useMemo(
    () => filterProducts(categories, filters),
    [filters, categories]
  );

  return <div className="flex gap-8">
    {/* Filtres */}
    <ProductFilters
      className="max-w-xs w-full"
      categories={categories}
      onChange={setFilters}
    />

    {/* Grilles des produits */}
    <ProductGrid categories={filteredCategories} />
  </div>;
};