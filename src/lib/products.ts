export interface Product {
  id: number;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}

export type ProductChangeDirection = "up" | "down";

const productsUrl =
  "https://openapi.programming-hero.com/api/bazardor/products";

export async function fetchProductsByChange(
  direction: ProductChangeDirection,
): Promise<Product[]> {
  const listResponse = await fetch(productsUrl, { cache: "no-store" });

  if (!listResponse.ok) {
    throw new Error(
      `Failed to fetch products for ${direction === "up" ? "rising" : "falling"} prices: HTTP ${listResponse.status}`,
    );
  }

  const products: Product[] = await listResponse.json();
  const selectedProducts = products
    .filter((product) => product.change.dir === direction)
    .sort((first, second) => second.change.pct - first.change.pct)
    .slice(0, 6);

  return Promise.all(
    selectedProducts.map(async ({ id }) => {
      const response = await fetch(`${productsUrl}/${id}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch product ${id} details: HTTP ${response.status}`,
        );
      }

      const product: Product = await response.json();

      if (product.id !== id) {
        throw new Error(`Product API returned an unexpected product for ${id}`);
      }

      return product;
    }),
  );
}
