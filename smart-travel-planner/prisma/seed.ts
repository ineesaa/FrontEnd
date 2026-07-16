import { PrismaClient, ExpenseCategory, FavoriteType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding demo account...");

  const passwordHash = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: "alex@example.com" },
    update: {},
    create: {
      name: "Alex Morgan",
      email: "alex@example.com",
      password: passwordHash,
      country: "United States",
      bio: "Always planning the next trip.",
    },
  });

  const existingTrip = await prisma.trip.findFirst({
    where: { userId: user.id, destination: "Paris" },
  });

  if (!existingTrip) {
    await prisma.trip.create({
      data: {
        userId: user.id,
        destination: "Paris",
        country: "France",
        city: "Paris",
        startDate: new Date("2026-09-04"),
        endDate: new Date("2026-09-12"),
        budget: 2400,
        description: "A week in Paris — museums, food, and the river.",
        itineraryDays: {
          create: [
            {
              dayNumber: 1,
              date: new Date("2026-09-04"),
              activities: {
                create: [
                  { title: "Arrive & check in", order: 0 },
                  { title: "Eiffel Tower at sunset", order: 1 },
                ],
              },
            },
            {
              dayNumber: 2,
              date: new Date("2026-09-05"),
              activities: {
                create: [
                  { title: "Louvre Museum", order: 0 },
                  { title: "Lunch in Le Marais", order: 1 },
                  { title: "Seine river cruise", order: 2 },
                ],
              },
            },
          ],
        },
        expenses: {
          create: [
            { category: ExpenseCategory.HOTEL, title: "Hotel deposit", amount: 600 },
            { category: ExpenseCategory.TRANSPORTATION, title: "Flight", amount: 540 },
            { category: ExpenseCategory.FOOD, title: "Dinner reservations", amount: 120 },
          ],
        },
      },
    });
  }

  const existingFavoritesCount = await prisma.favorite.count({ where: { userId: user.id } });
  if (existingFavoritesCount === 0) {
    await prisma.favorite.createMany({
      data: [
        {
          userId: user.id,
          type: FavoriteType.DESTINATION,
          name: "Kyoto, Japan",
          location: "Kyoto, Japan",
        },
        {
          userId: user.id,
          type: FavoriteType.RESTAURANT,
          name: "Le Comptoir du Relais",
          location: "Paris, France",
        },
      ],
    });
  }

  console.log(`Seed complete — demo account: ${user.email} / password123`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
