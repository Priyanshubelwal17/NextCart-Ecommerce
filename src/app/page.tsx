import AuthDisplay from "../components/AuthDisplay";
import Cart from "../components/Cart";
import ProductList from "../components/ProductList";

export default function Home() {
  return (
    <main className="min-h-screen p-8 sm:p-20 bg-gray-900">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-cyan-400">NextCart</h1>
        <AuthDisplay />
      </header>
      <ProductList />
      <hr className="my-10 border-gray-700" />
      <Cart />
    </main>
  );
}
