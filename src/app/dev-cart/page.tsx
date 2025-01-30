"use client"

import { PRODUCTS_CATEGORY_DATA } from "@arthur.eudeline/starbucks-tp-kit/data";
import { Button } from "@arthur.eudeline/starbucks-tp-kit/components/button";
import { ProductCardLayout } from "@arthur.eudeline/starbucks-tp-kit/components/products/product-card-layout";
import { SectionContainer } from "@arthur.eudeline/starbucks-tp-kit/components/section-container";
import { addLine, clearCart } from "@/hooks/use-cart";
import { Cart } from "@/components/cart";
import { CartCounter } from "@/components/cart-counter";

const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);

export default function DevCartPage() {
  console.count('rendu page');

  return (
    <SectionContainer
      className="py-36"
      wrapperClassName="flex flex-col lg:flex-row gap-24"
    >
      {/* Produits */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
        {products.map((product) => (
          <ProductCardLayout
            key={product.id}
            product={product}
            button={<Button
              variant={"ghost"}
              fullWidth
              onClick={() => addLine(product)}
              >
              Ajouter au panier
            </Button>
            } />
        ))}
      </section>
      {/* /Produits */}

      {/* Panier */}
      <section className="w-full lg:w-1/3 space-y-8">
        <p>CartCounter : <CartCounter /></p>
        <Cart />

        {/* Vider le panier */}
        <Button variant={"outline"} fullWidth onClick={clearCart}>
          Vider le panier
        </Button>
      </section>
      {/* /Panier */}
    </SectionContainer>
  );
}