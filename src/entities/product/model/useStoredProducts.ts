"use client";

import { useEffect, useState } from "react";
import type { Product } from "./types";
import { getDefaultProducts, getStoredProducts, saveStoredProducts } from "./storage";

export function useStoredProducts() {
  const [items, setItems] = useState<Product[]>(() => getDefaultProducts());

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setItems(getStoredProducts());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function replaceProducts(nextItems: Product[]) {
    setItems(nextItems);
    saveStoredProducts(nextItems);
  }

  return {
    products: items,
    replaceProducts,
  };
}
