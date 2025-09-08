import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rota: listar refeições recomendadas (< 400 calorias)
app.get("/meals/recommended", async (req, res) => {
  const meals = await prisma.meal.findMany({
    where: { calories: { lt: 400 } },
    include: { restaurant: true },
  });
  res.json(meals);
});

// Rota: listar restaurantes com refeições
app.get("/restaurants", async (req, res) => {
  const restaurants = await prisma.restaurant.findMany({
    include: { meals: true },
  });
  res.json(restaurants);
});

app.listen(4000, () => {
  console.log("🔥 Backend rodando em http://localhost:4000");
});

