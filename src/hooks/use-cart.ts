import { create } from "zustand";
import { CartData, ProductLineData } from "@/types";
import { ProductData } from "@arthur.eudeline/starbucks-tp-kit/types";
import { wait } from "@arthur.eudeline/starbucks-tp-kit/utils/wait";

/**
 * Notre store zustand
 */
export const useCart = create<CartData>(() => ({
  lines: [],
  count: 0,
}));

/**
 * Ajoute une nouvelle ligne au panier.
 * Si le produit est déjà dans le panier, augmente la quantité de 1.
 * 
 * @param product 
 */
export async function addLine(product: ProductData) {
  // On récupères les lignes actuellement présentes dans la panier
  const {lines} = useCart.getState();

  // Cherche à récupérer la quantité d'une ligne si déjà présente dans le panier
  const i = lines.findIndex((l) => l.product.id === product.id);
  const qty = (lines[i]?.qty ?? 0) + 1;

  // Ajoute la nouvelle ligne si elle n'existe pas
  if (i < 0) {
    lines.push({ product, qty });
  }
  // Modifie la quantité de la ligne existante
  else {
    lines[i].qty = qty;
  }

  await wait(500);

  // On met à jour le state du panier
  useCart.setState({ lines: [...lines], count: lines.length });
}

/**
 * Modifie une ligne produit du panier
 * 
 * @param line 
 */
export function updateLine(line: ProductLineData) {
  useCart.setState(({ lines }) => {
    const i = lines.findIndex((l) => l.product.id === line.product.id);
    if (i < 0)
      throw new Error(
        `Il n'y a pas de ligne dans le panier pour le produit ${line.product.id}`
      );

    lines[i].qty = line.qty;

    return { lines: [...lines] };
  });
}

/**
 * Supprime la ligne produit du panier
 *
 * @param productId
 * @returns
 */
export const removeLine = (productId: number) =>
  useCart.setState(({ lines }) => {
    const i = lines.findIndex((l) => l.product.id === productId);
    if (i < 0)
      throw new Error(
        `Il n'y a pas de ligne dans le panier pour le produit ${productId}`
      );

    delete lines[i];

    // Object.values() permet de supprimer les entrées `empty` (si on laisse le delete seul) ou `undefined` (si on avait utilisé [...lines])
    const updatedLines = Object.values(lines);

    return { lines: updatedLines, count: updatedLines.length };
  });

/**
 * Vide le contenu du panier actuel
 */
export const clearCart = () => {
  useCart.setState({
    lines: [],
    count: 0
  });
}

/**
 * Calcule le total d'une ligne
 * 
 * @param lines 
 * @returns 
 */
export const computeLineSubtotal = (line: ProductLineData): number => {
  return line.product.price * line.qty;
}

/**
 * Calcule le total du panier 
 * 
 * @param lines 
 * @returns 
 */
export const computeCartTotal = (lines: ProductLineData[]): number => {
  if (lines.length === 0) return 0;

  return lines
    .map((l) => computeLineSubtotal(l))
    .reduce((a, b) => a + b);
}

