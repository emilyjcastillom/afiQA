import NavBar from "../components/layout/NavBar"
import { ProductGroupCard } from "../components/ui/shop/ProductGroupCard"; 
import { useCategories, useCollections, usePlayers } from "../hooks/useShopGroups";
import ShopCarousel from "../components/ui/shop/Carrousel";
import ShopHero from "../components/ui/shop/Hero";
import ShopSeparator from "../components/ui/shop/Separator";


export default function Shop() {
  const { 
    //categories, 
    //loading: categoriesLoading, 
    //error: categoriesError 
  } = useCategories();
  const { 
    collections, 
    //loading: collectionsLoading, 
    //error: collectionsError 
  } = useCollections();
  const { 
    players, 
    //loading: playersLoading, 
    //error: playersError 
  } = usePlayers();
 

  return (<>
  <NavBar />
  <ShopHero />

<h2 className=" px-6 text-3xl md:text-4xl font-bold text-black font-anton md:px-8">Shop by Player</h2>
  <ShopCarousel>
    {players.map(player => (
      <ProductGroupCard
        key={player.name}
        title={player.name}
        description={`#${player.number} - ${player.position}`}
        imageUrl={player.image_url}
        onClick={() => console.log(`Player ${player.name} clicked`)}
      />
    ))}
  </ShopCarousel>

  <ShopSeparator message="Complete your fit with exclusive team collections" />

  <h2 className=" px-6 text-3xl md:text-4xl font-bold text-black font-anton md:px-8">Our Collections</h2>
  <ShopCarousel>
    {collections.map(collection => (
      <ProductGroupCard
        key={collection.name}
        title={collection.name}
        imageUrl={collection.image_url}
        onClick={() => console.log(`Collection ${collection.name} clicked`)}
      />
    ))}
  </ShopCarousel>
 

  </>);
}
