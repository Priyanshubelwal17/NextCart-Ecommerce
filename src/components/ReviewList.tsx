import { prisma } from "../lib/prisma";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={i < rating ? "text-yellow-400" : "text-gray-600"}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default async function ReviewList({ productId }: { productId: string }) {
  const reviews = await prisma.review.findMany({
    where: {
      productId,
    },
    include: {
      user: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  if (reviews.length === 0) {
    return <p className="text-gray-400 mt-8">No reviews yet. Be the first!</p>;
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-white mb-6">Customer Reviews</h3>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-800 p-4 rounded-lg ">
            <div className="flex items-center mb-2">
              <StarRating rating={review.rating} />
              <p className="ml-4 font-semibold text-white">
                {review.user.name}
              </p>
            </div>
            <p className="text-gray-300 ">{review.text}</p>
            <p className="text-xs text-gray-500 mt-2">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
