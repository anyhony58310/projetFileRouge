"use client";

import { FC, memo, useCallback } from "react";
import { type ProductsCategoryData } from "@arthur.eudeline/starbucks-tp-kit/types";
import { useForm } from "@mantine/form";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@arthur.eudeline/starbucks-tp-kit/components/button";
import { Checkbox } from "@arthur.eudeline/starbucks-tp-kit/components/inputs/checkbox";
import { ProductFiltersResult } from "@/types";


type Props = {
  categories: ProductsCategoryData[];
  onChange: (values: ProductFiltersResult) => void;
  className?: string;
};

type ProductFiltersValues = {
  categories: Array<{
    name: string,
    slug: string,
    checked: boolean,
    count: number,
  }>;
  search?: string;
}

const ProductFilters: FC<Props> = memo(function ({ categories, onChange, className = '' }) {
  /**
   * Initializes the form with empty fields. Never let a field undefined to let react properly controls the inputs
   */
  const form = useForm<ProductFiltersValues>({
    initialValues: {
      search: "",
      categories: categories.map((cat) => ({
        name: cat.name,
        slug: cat.slug,
        checked: false,
        count: cat.products.length
      })),
    },
  });

  /**
   * Fired when form is submitted : send the form values to the parent component 
   */
  const handleSubmit = useCallback((values: ProductFiltersValues) => {
    const categoriesSlugs = values.categories.filter(c => c.checked).map(c => c.slug)
    onChange({
      categoriesSlugs,
      search: values.search || undefined
    });
  }, [onChange]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className={`space-y-8 mt-16 ${className}`}>
      {/* Search field */}
      <div className="relative">
        <MagnifyingGlass size={24} weight="duotone" className="absolute inset-y-2 left-2 text-brand my-auto" />

        <input
          id="search-input"
          placeholder="Rechercher une boisson..."
          className="w-full outline-brand outline-2 bg-gray-100 rounded-lg h-auto py-4 px-4 text-default !leading-none pl-[40px]"
          {...form.getInputProps("search")}
        />
      </div>

      {/* Categories checkbox list */}
      <ul
        className="space-y-2"
      >
        {form.values.categories.map((cat, i) => (
          <li key={cat.slug}>
            <Checkbox 
              label={`${cat.name} (${cat.count})`}
              {...form.getInputProps(`categories.${i}.checked`, {type: "checkbox"})}
            />
          </li>
        ))}
      </ul>

      {/* Submit button */}
      <Button fullWidth type={"submit"}>
        Filtrer
      </Button>
    </form>
  );
});

ProductFilters.displayName = "ProductFilters";
export { ProductFilters };
