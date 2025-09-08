import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const mcDonalds = await prisma.restaurant.create({
    data: {
      name: "McDonald's",
      meals: {
        create: [
          { name: "McWrap de Frango Grelhado", calories: 350 },
          { name: "Salada Premium", calories: 150 },
        ],
      },
    },
  });

  const subway = await prisma.restaurant.create({
    data: {
      name: "Subway",
      meals: {
        create: [
          { name: "Sub Frango Grelhado 15cm", calories: 320 },
          { name: "Salada de Atum", calories: 210 },
        ],
      },
    },
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
