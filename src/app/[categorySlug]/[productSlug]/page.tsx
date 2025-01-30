import { BreadCrumbs } from "@arthur.eudeline/starbucks-tp-kit/components/breadcrumbs";
import { Button } from "@arthur.eudeline/starbucks-tp-kit/components/button";
import { FormattedPrice } from "@arthur.eudeline/starbucks-tp-kit/components/data-display/formatted-price";
import { ProductCardLayout } from "@arthur.eudeline/starbucks-tp-kit/components/products/product-card-layout";
import { ProductGridLayout } from "@arthur.eudeline/starbucks-tp-kit/components/products/product-grid-layout";
import { ProductRating } from "@arthur.eudeline/starbucks-tp-kit/components/products/product-rating";
import { ProductImage } from "@arthur.eudeline/starbucks-tp-kit/components/products/product-image";
import { SectionContainer } from "@arthur.eudeline/starbucks-tp-kit/components/section-container";
import { NextPageProps } from "@/types";
import {
  ProductAttribute,
  ProductAttributesTable,
} from "@/components/product-attributes-table";
import { cache } from "react";
import { notFound } from "next/navigation";
import { ProductData, ProductsCategoryData } from "@arthur.eudeline/starbucks-tp-kit/types";
import { PRODUCTS_CATEGORY_DATA } from "@arthur.eudeline/starbucks-tp-kit/data";
import { Metadata } from "next";


type Product = ProductData & {
  /**
   * Contient la catégorie pour permettre de lister les produits liés.
   * Ces derniers excluent le produit actuel de la page
   */
  category: ProductsCategoryData
}

/**
 * Trouve un produit à partir de sa catégorie et de son slug
 */
const getProduct = cache(async (categorySlug: string, productSlug: string) : Promise<Product | null> => {
  const category = PRODUCTS_CATEGORY_DATA.find(cat => cat.slug === categorySlug);
  if (!category) return null;

  const product = category.products.find(prod => prod.slug === productSlug);
  if (!product) return null;
  
  return {
    ...product,
    category: {
      ...category,
      // Exclue le produit actuel des produits liés
      products: category.products.filter((prod) => prod.slug !== productSlug),
    }
  }
});

type Props = {
  categorySlug: string;
  productSlug: string;
};

const productAttributes: ProductAttribute[] = [
  { label: "Intensité", rating: 3 },
  { label: "Volupté", rating: 2 },
  { label: "Amertume", rating: 1 },
  { label: "Onctuosité", rating: 4 },
  { label: "Instagramabilité", rating: 5 },
];

export async function generateMetadata({params}: NextPageProps<Props>): Promise<Metadata | null> {
  const product = await getProduct(params.categorySlug, params.productSlug);
  if (!product) return null;

  return {
    title: product.name,
    description:
      product.desc ??
      `Succombez pour notre ${product.name} et commandez-le sur notre site !`,
  };
}

export default async function ProductPage({ params }: NextPageProps<Props>) {
  const product = await getProduct(params.categorySlug, params.productSlug);
  if (!product) notFound();

  return (
    <SectionContainer wrapperClassName="max-w-5xl">
      <BreadCrumbs
        className="my-8"
        items={[
          {
            label: "Accueil",
            url: "/",
          },
          {
            label: product.category.name,
            url: `/${product.category.slug}`,
          },
          {
            label: product.name,
            url: `/${product.path}`,
          },
        ]}
      />

      {/* Produit */}
      <section className="flex flex-col md:flex-row justify-center gap-8">
        {/* Product Image */}
        <div className="relative">
          <ProductImage
            {...product}
            priority
            className="rounded-lg sticky top-12 object-cover sm:aspect-video md:aspect-auto w-full md:w-[300px]"
          />
        </div>

        {/* Product body */}
        <div className="flex-1">
          <div className="prose prose-lg">
            {/* Product Name */}
            <h1>{product.name}</h1>

            {/* Product Rating */}
            <ProductRating value={4} size={18} className="not-prose"/>

            {/* Desc */}
            <p>{product.desc}</p>

            {/* Prix et ajout au panier */}
            <div className="flex justify-between items-center gap-8">
              <p className="!my-0 text-xl">
                <FormattedPrice price={product.price} />
              </p>
              <Button variant={"primary"} product={product} fullWidth={false}>
                Ajouter au panier
              </Button>
            </div>
          </div>

          {/* Products attribute */}
          <ProductAttributesTable className="mt-6" data={productAttributes} />
        </div>
      </section>

      {/* Related products */}
      <section>
        <div className="mt-24">
          <div className="prose prose-lg mb-8">
            <h2>Vous aimerez aussi</h2>
          </div>

          <ProductGridLayout products={product.category.products}>
            {(product) => (
              <ProductCardLayout
                product={product}
                button={
                  <Button variant="ghost" className="flex-1 !py-4">
                    Ajouter au panier
                  </Button>
                }
              />
            )}
          </ProductGridLayout>
        </div>
      </section>
      {/* /Related products */}
    </SectionContainer>
  );
}
