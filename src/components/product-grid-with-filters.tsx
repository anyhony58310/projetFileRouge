"use client";

import { type FC, useEffect, useState } from "react";
import { ProductFiltersResult } from "@/types";
import { ProductFilters } from "./product-filters";
import { ProductGrid } from "./product-grid";
import { ProductsCategoryData } from "@arthur.eudeline/starbucks-tp-kit/types";

// Définition des props
type Props = {
  categories: ProductsCategoryData[];
  showFilters?: boolean;
};

export const ProductGridWithFilters: FC<Props> = function ({ categories }) {
  // Stocke la valeur des filtres du formulaire
  const [filters, setFilters] = useState<ProductFiltersResult | undefined>();
  const [filteredCategories, setFilteredCategories] = useState<ProductsCategoryData[]>(categories);
  const [isLoading, setLoading] = useState<boolean>(false);

  // Effect déclenché à chaque changement des filtres
  useEffect(() => {
    if (!filters) {
      setFilteredCategories(categories);
      return;
    }

    setLoading(true);

    // Construction des paramètres de requête
    const query = new URLSearchParams();
    if (filters?.search) query.set("search", filters.search);
    filters?.categoriesSlugs.forEach(slug => query.append("cat", slug));

    // Appel API pour filtrer les catégories
    fetch(`/api/product-filters?${query}`)
      .then(res => res.json())
      .then(res => {
        setFilteredCategories(res.categories);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [filters, categories]);

  return (
    <div className="flex gap-8">
      {/* Filtres */}
      <ProductFilters
        className="max-w-xs w-full"
        categories={categories}
        onChange={setFilters}
      />

      {/* Grille des produits */}
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <ProductGrid categories={filteredCategories} />
      )}
    </div>
  );
};