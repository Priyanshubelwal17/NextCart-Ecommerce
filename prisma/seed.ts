import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");
  await prisma.product.createMany({
    data: [
      {
        name: "Modern Desk Lamp",
        description: "A sleek and modern desk lamp with adjstabel brightness.",
        price: 79.99,
        image:
          "https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      },
      {
        name: "Ergomic Office Chair",
        description:
          "A comfortable and supportive chair for long hours of work.",
        price: 249.5,
        image:
          "https://images.unsplash.com/photo-1580480055273-228ff53825b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      },
      {
        name: "Wireless Mechanical Keyboard",
        description:
          "A tactile and responsive keyboard for a better typing experience.",
        price: 125.0,
        image:
          "https://images.unsplash.com/photo-1618384887924-3366ab0a2ca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      },
    ],
    skipDuplicates: true,
  });
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
