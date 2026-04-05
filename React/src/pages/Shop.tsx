import NavBar from "../components/layout/NavBar"
import { ProductGroupCard } from "../components/ui/shop/ProductGroupCard"; 

export default function Shop() {
  return (<>
  <NavBar />
  <ProductGroupCard
    title="Stephen Curry"
    description="#0 Guard"
    imageUrl="https://upktcnvztyldwzapbuqq.supabase.co/storage/v1/object/public/products/players/curry.webp"
    onClick={() => console.log("Product Group 1 clicked")}
  />

  </>);
}