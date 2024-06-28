import { getAllProducts } from "@/actions/product";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <main>
      <SearchBar />
      <div className="grid grid-cols-4">
        {products?.map((product) => (
          <ProductCard key={product.url} product={product} />
        ))}
      </div>
    </main>
  );
}
