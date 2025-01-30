"use client";

import { useCart } from "@/hooks/use-cart";

export function CartCounter() {
  const count = useCart(state => state.count);
  return <>{count}</>;
};