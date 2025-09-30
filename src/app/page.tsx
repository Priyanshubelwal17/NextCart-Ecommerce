import Cart from "../components/Cart";
import Header from "../components/Header";
import ProductList from "../components/ProductList";

export default function Home() {
  return (
    <main className="min-h-screen p-8 sm:p-20 bg-gray-900">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductList />
        <hr className="my-10 border-gray-700" />
        <Cart />
      </div>
    </main>
  );
}
