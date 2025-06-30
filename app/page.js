import { getFeaturedProducts } from "@/lib/firestore/products/read-server";
import Header from "./components/header";
import Productslider from "./components/slider";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <main>
      <Header/>
      <Productslider featuredProducts={featuredProducts} />
      <h1>Ecommerce</h1>
    </main>
  );
}
