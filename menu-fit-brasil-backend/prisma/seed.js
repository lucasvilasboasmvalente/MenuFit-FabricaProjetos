// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // ----------------- RESTAURANTS & MEALS -----------------
  const mcDonalds = await prisma.restaurant.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "McDonald's",
      meals: {
        create: [
          { name: "McWrap de Frango Grelhado", calories: 350 },
          { name: "Salada Premium", calories: 150 },
        ],
      },
    },
  });

  const subway = await prisma.restaurant.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Subway",
      meals: {
        create: [
          { name: "Sub Frango Grelhado 15cm", calories: 320 },
          { name: "Salada de Atum", calories: 210 },
        ],
      },
    },
  });

  // ----------------- USERS -----------------
  const user1 = await prisma.user.upsert({
    where: { email: "joshua@example.com" },
    update: {},
    create: { name: "Joshua", email: "joshua@example.com", level: 1 },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "ana@example.com" },
    update: {},
    create: { name: "Ana", email: "ana@example.com", level: 2 },
  });

  // ----------------- MEDALS -----------------
  await prisma.medal.createMany({
    data: [
      { name: "Iniciante", userId: user1.id },
      { name: "Expert", userId: user2.id },
    ],
  });

 // ----------------- COUPONS -----------------
const coupon1 = await prisma.coupon.upsert({
  where: { code: "WELCOME10" },
  update: {},
  create: { code: "WELCOME10", discount: 10, validUntil: new Date("2025-12-31") },
});

const coupon2 = await prisma.coupon.upsert({
  where: { code: "FIT20" },
  update: {},
  create: { code: "FIT20", discount: 20, validUntil: new Date("2025-12-31") },
});


  // ----------------- NUTRITIONISTS & DIETS -----------------
  const nutri1 = await prisma.nutritionist.upsert({
    where: { email: "maria@nutri.com" },
    update: {},
    create: { name: "Maria Nutri", email: "maria@nutri.com" },
  });

  const nutri2 = await prisma.nutritionist.upsert({
    where: { email: "carlos@nutri.com" },
    update: {},
    create: { name: "Carlos Nutri", email: "carlos@nutri.com" },
  });

  await prisma.diet.createMany({
    data: [
      { title: "Dieta Low Carb", nutritionistId: nutri1.id },
      { title: "Dieta Vegana", nutritionistId: nutri1.id },
      { title: "Dieta Mediterrânea", nutritionistId: nutri2.id },
    ],
  });

  console.log("🌱 Seed finalizado com sucesso!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
