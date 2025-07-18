import { getAllProducts, getFeaturedProducts } from "@/lib/firestore/products/read-server";
import Header from "./components/header";
import Productslider from "./components/slider";
import { getfeaturedcollection } from "@/lib/firestore/collections/read-server";
import Featuredcollection from "./components/featuredcollection";
import Categories from "./components/categories";
import { getCategories } from "@/lib/firestore/categories/read-server";
import Products from "./components/products";
import CustomerReviews from "./components/customerreviews";
import Brands from "./components/brands";
import { getBrands } from "@/lib/firestore/brands/read-server";
import Footer from "./components/footer";

export default async function Home() {
   
  const[featuredProducts, featuredcollections, categories,products, brands] = await Promise.all([
    getFeaturedProducts(),
    getfeaturedcollection(),
    getCategories(),
    getAllProducts(),
    getBrands()
  ])


  return (
    <main className="flex gap-4">
      <section className="flex flex-col overflow-x-hidden">
      <Header/>
      <Productslider featuredProducts={featuredProducts} />
      <Featuredcollection featuredcollections={featuredcollections} />
      <Categories categories={categories}/>
      <Products products={products}/>
      <Brands brands={brands}/>
      <CustomerReviews />
      <Footer/>
      </section>
    </main>
  );
}
