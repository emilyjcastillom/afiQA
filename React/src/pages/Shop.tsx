import NavBar from "../components/layout/NavBar"
import { ProductGroupCard } from "../components/ui/shop/ProductGroupCard"; 
import { useCategories, useCollections, usePlayers } from "../hooks/useShopGroups";

export default function Shop() {
  const { 
    categories, 
    loading: categoriesLoading, 
    error: categoriesError 
  } = useCategories();
  // const { 
  //   collections, 
  //   loading: collectionsLoading, 
  //   error: collectionsError 
  // } = useCollections();
  // const { 
  //   players, 
  //   loading: playersLoading, 
  //   error: playersError 
  // } = usePlayers();

  if (categoriesLoading) {
    return (
      <>
        <NavBar />
        <div className="p-4">Loading shop...</div>
      </>
    );
  }

  if (categoriesError) {
    return (
      <>
        <NavBar />
        <div className="p-4">Could not load shop categories.</div>
      </>
    );
  }

  return (<>
  <NavBar />
  {categories.map(category => (
    <ProductGroupCard
      key={category.name}
      title={category.name}
      imageUrl={category.image_url}
      onClick={() => console.log(`Category ${category.name} clicked`)}
    />
  ))}
  </>);
}
