import { getAllProducts } from "@/actions/product";
import { SearchBar } from "@/components/SearchBar";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <main>
      <SearchBar />
      {products?.map((product) => JSON.stringify(product))}
    </main>
  );
}
