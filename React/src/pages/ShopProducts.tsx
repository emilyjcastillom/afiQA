import useShopProducts from "../hooks/useShopProducts";
import ProductCard from "../components/ui/shop/ProductCard";
import NavBar from "../components/layout/NavBar";

function ProductsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-48 w-full rounded-xl bg-gray-300" />
      <div className="mt-4 h-6 w-3/4 rounded bg-gray-300" />
      <div className="mt-2 h-4 w-1/2 rounded bg-gray-300" />
    </div>
  );
}

export default function ShopProducts() {

  const { 
    products, 
    loading: productsLoading,
    error: productsError 
  } = useShopProducts();

  if (productsLoading) {
    return (<>
      <NavBar />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProductsSkeleton />
        <ProductsSkeleton />
        <ProductsSkeleton />
      </div>
    </>);
  }

  if (productsError) {
    return (<>
      <NavBar />
      <div className="flex items-center justify-center px-6 text-center font-lato text-lg text-red-600">
        Error loading products. Please try again.
      </div>
      </>
    );
  }

  return (<>
    <NavBar />
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </>);
}