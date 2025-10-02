import { auth } from "@/auth";
import ReviewForm from "@/src/components/ReviewForm";
import ReviewList from "@/src/components/ReviewList";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          )}
        </div>
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-white">{product.name}</h1>
          <p className="text-2xl font-semibold text-cyan-400 my-4}">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-300 flex-grow">{product.description} </p>
          <button>Add to Cart</button>
        </div>
      </div>

      <hr className="my-10 border-gray-700" />

      {session && <ReviewForm productId={product.id} />}

      <Suspense
        fallback={<p className="text-gray-400 mt-8"> Loading reviews...</p>}
      >
        <ReviewList productId={product.id} />
      </Suspense>
    </main>
  );
}
