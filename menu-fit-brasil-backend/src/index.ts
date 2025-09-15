// src/index.ts
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rota: listar refeições recomendadas com filtros
app.get("/meals/recommended", async (req, res) => {
  const { search, maxCalories, restaurantId } = req.query;

  // Monta o filtro dinamicamente
  const where: any = {
    calories: { lt: maxCalories ? Number(maxCalories) : 400 },
  };

  if (search) {
    // Prisma v5 não aceita "mode: insensitive" no contains, então usamos lowercase
    where.name = { contains: String(search).toLowerCase() };
  }

  if (restaurantId) {
    where.restaurantId = Number(restaurantId);
  }

  try {
    const meals = await prisma.meal.findMany({
      where,
      include: { restaurant: true },
    });
    res.json(meals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar refeições" });
  }
});

// Rota: listar restaurantes
app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: { meals: true },
    });
    res.json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar restaurantes" });
  }
});

app.listen(4000, () => {
  console.log("🔥 Backend rodando em http://localhost:4000");
});
