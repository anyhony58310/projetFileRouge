"use client";
import {
  updateLine,
  removeLine,
  useCart,
  computeCartTotal
} from "@/hooks/use-cart";
import { Button } from "@arthur.eudeline/starbucks-tp-kit/components/button";
import { Card } from "@arthur.eudeline/starbucks-tp-kit/components/card";
import { FormattedPrice } from "@arthur.eudeline/starbucks-tp-kit/components/data-display/formatted-price";
import { Heading } from "@arthur.eudeline/starbucks-tp-kit/components/heading";
import { ProductCartLine } from "@arthur.eudeline/starbucks-tp-kit/components/products/product-cart-line";

export function Cart() {
  // On récupère notre panier et on écoute sur tous ses champs
  const cart = useCart();

  return <Card className="space-y-8">
    {cart.count < 1
      ? <div className="py-12 text-center">Votre panier est vide</div>
      : <>
          <Heading as={"h2"} className="text-sm" >Mon panier</Heading>

          {/* Lines */}
          <div className="space-y-4">
            {/* On récupère et liste les lignes du panier */}
            {cart.lines.map(line => <ProductCartLine
              key={line.product.id}
              product={line.product}
              qty={line.qty}
              onDelete={() => removeLine(line.product.id)}
              onQtyChange={(qty) => updateLine({ ...line, qty })}
            />)}
          </div>

          {/* Total */}
          <div className="grid grid-cols-2 text-lg">
            <div>Total</div>
            <div className="text-right">
              <FormattedPrice price={computeCartTotal(cart.lines)} />
            </div>
          </div>

          {/* Bouton commander */}
          <Button variant={"primary"} fullWidth>
            Commander
          </Button>
        </>}
  </Card>
}