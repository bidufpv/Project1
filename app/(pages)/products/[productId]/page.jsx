import { getProduct } from "@/lib/firestore/products/read-server";

export default async function Page({ params }) {
  const { productId } = await params;

  const product = await getProduct({ id: productId });

  return (
    <main className="p-5 md:p-10">

        {/* Photos and details */}
        <section>
            <div>
               
            </div>
            <div></div>
        </section>

         {/* descriptiona nd reviews */}
        <section>
           <div></div>
           <div></div>
        </section>

      {/* Related Products */}
      <section></section>

        
      <h1>{product?.title}</h1>
    </main>
  );
}
