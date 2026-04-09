import { useState } from "react";
import { addItemToCart } from "../../../hooks/useCart";
import { type PricedProduct } from "../../../hooks/useShopProducts";
import Button from "../Button";

export default function ProductCard({ product }: { product: PricedProduct }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addToCartError, setAddToCartError] = useState<string | null>(null);

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      setAddToCartError(null);
      await addItemToCart(product.id);
    } catch (error) {
      setAddToCartError(
        error instanceof Error ? error.message : "Failed to add item to cart.",
      );
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="flex h-full flex-col gap-4 shadow-lg bg-white p-4 rounded-xl">
      <div className="h-48 w-full overflow-hidden rounded-xl bg-gray-100">
        <img
          src={product.image_url ?? undefined}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <h3 className="line-clamp-2 min-h-10 text-lg font-bold font-lato  leading-7">
          {product.name}
        </h3>
        <p className="line-clamp-3 min-h-10 text-sm font-lato ">
          {product.description}
        </p>
        <p className="mt-auto text-xl font-bold  font-lato">
          ${product.price.toFixed(2)}
        </p>
        <Button
          variant="primary"
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="text-sm font-semibold"
        >
          <p className="font-lato">{isAddingToCart ? "Adding..." : "Add to cart"}</p>
        </Button>
        {addToCartError ? (
          <p className="text-sm text-red-600 font-lato">{addToCartError}</p>
        ) : null}
      </div>
    </div>
  );
}
