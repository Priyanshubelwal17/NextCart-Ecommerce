import { auth } from "@/auth";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/");
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px=8 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">
        <div className="space-y-8">
          {" "}
          {orders.length === 0 ? (
            <p className="text-gray-400">You havent placed any orders yet.</p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-800 p-6 rounded-xl  shadow-lg"
              >
                <div className="flex justify-between items=center mb-4">
                  <h2 className="text-xl font-bold text-white">
                    Order #{order.id.substring(0, 8)}
                  </h2>
                  <p className="text-sm  text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                  </p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-cyan-400">
                    {order.amount.toFixed(2)}
                  </p>
                  <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">
                    {order.status}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-300 mb-2">Items:</h3>
                  <ul className="space-y-2">
                    {order.items.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between text-gray-400"
                      >
                        <span>
                          {item.product.name} (x{item.quantity}){" "}
                        </span>
                        <span>
                          ${(item.product.price * item.quantity).toFixed(2)}{" "}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          )}{" "}
        </div>
      </h1>
    </main>
  );
}
