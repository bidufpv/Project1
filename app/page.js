import { getFeaturedProducts } from "@/lib/firestore/products/read-server";
import Header from "./components/header";
import Productslider from "./components/slider";
import { getfeaturedcollection } from "@/lib/firestore/collections/read-server";
import Featuredcollection from "./components/featuredcollection";
import Categories from "./components/categories";
import { getCategories } from "@/lib/firestore/categories/read-server";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const featuredcollections = await getfeaturedcollection();
  const categories = await getCategories(); 

  return (
    <main className="flex gap-4">
      <section className="flex flex-col overflow-x-hidden">
      <Header/>
      <Productslider featuredProducts={featuredProducts} />
      <Featuredcollection featuredcollections={featuredcollections} />
      <Categories categories={categories}/>
      </section>
    </main>
  );
}
