"use client";

import { useCallback, useState, type FC } from "react";
import { Button } from "@arthur.eudeline/starbucks-tp-kit/components/button";
import { ProductData } from "@arthur.eudeline/starbucks-tp-kit/types";
import { addLine } from "@/hooks/use-cart";
import { LoadingIndicator } from "@arthur.eudeline/starbucks-tp-kit/components/loading-indicator";

type Props = {
  product: ProductData
}

export const AddToCartButton: FC<Props> = function ({product}) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddToCart = useCallback(() => {
    // Si on est déjà en train d'ajouter au panier, on ignore
    if (loading) return;

    // On affiche le chargement
    setLoading(true);

    // On ajoute le produit au panier puis on cache le chargement
    addLine(product).finally(() => setLoading(false));
  }, [product]);

  return <Button 
    variant="ghost" 
    fullWidth 
    onClick={handleAddToCart} 
    className="relative"
    disabled={loading}
  >
    Ajouter au panier
    {loading && <LoadingIndicator className="absolute right-4 inset-y-0 my-auto" />}
  </Button>;
};