// src/index.ts
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// ========================
// MEALS
// ========================
app.get("/meals/recommended", async (req, res) => {
  const { search, maxCalories, restaurantId } = req.query;
  const where: any = {
    calories: { lt: maxCalories ? Number(maxCalories) : 400 },
  };
  if (search) where.name = { contains: String(search).toLowerCase() };
  if (restaurantId) where.restaurantId = Number(restaurantId);

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

// ========================
// RESTAURANTS
// ========================
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

// ========================
// USERS
// ========================
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({ data: { name, email } });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { medals: true, subscriptions: true, coupons: true },
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

// ========================
// SUBSCRIPTIONS
// ========================
app.post("/users/:id/subscription", async (req, res) => {
  const { id } = req.params;
  const { price, discount } = req.body;

  try {
    const subscription = await prisma.subscription.create({
      data: { price, discount: discount || 0, userId: Number(id) },
    });
    res.json(subscription);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar assinatura" });
  }
});

app.get("/users/:id/subscriptions", async (req, res) => {
  const { id } = req.params;
  try {
    const subs = await prisma.subscription.findMany({ where: { userId: Number(id) } });
    res.json(subs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar assinaturas" });
  }
});

// ========================
// MEDALS
// ========================
app.post("/users/:id/medals", async (req, res) => {
  const { id } = req.params;
  const { name, icon } = req.body;

  try {
    const medal = await prisma.medal.create({ data: { name, icon, userId: Number(id) } });
    res.json(medal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao adicionar medalha" });
  }
});

app.get("/users/:id/medals", async (req, res) => {
  const { id } = req.params;
  try {
    const medals = await prisma.medal.findMany({ where: { userId: Number(id) } });
    res.json(medals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar medalhas" });
  }
});

// ========================
// COUPONS
// ========================
app.post("/coupons", async (req, res) => {
  const { code, discount, validUntil } = req.body;
  try {
    const coupon = await prisma.coupon.create({
      data: { code, discount, validUntil: new Date(validUntil) },
    });
    res.json(coupon);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar cupom" });
  }
});

app.post("/users/:userId/coupons/:couponId", async (req, res) => {
  const { userId, couponId } = req.params;
  try {
    const coupon = await prisma.coupon.update({
      where: { id: Number(couponId) },
      data: { users: { connect: { id: Number(userId) } } },
    });
    res.json(coupon);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao aplicar cupom" });
  }
});

// ========================
// NUTRITIONISTS
// ========================
app.post("/nutritionists", async (req, res) => {
  const { name, email } = req.body;
  try {
    const nutritionist = await prisma.nutritionist.create({ data: { name, email } });
    res.json(nutritionist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar nutricionista" });
  }
});

app.get("/nutritionists", async (req, res) => {
  try {
    const nutritionists = await prisma.nutritionist.findMany({ include: { diets: true } });
    res.json(nutritionists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar nutricionistas" });
  }
});

// ========================
// DIETS
// ========================
app.post("/nutritionists/:id/diets", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const diet = await prisma.diet.create({
      data: { title, description, nutritionistId: Number(id) },
    });
    res.json(diet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar dieta" });
  }
});

app.get("/nutritionists/:id/diets", async (req, res) => {
  const { id } = req.params;
  try {
    const diets = await prisma.diet.findMany({ where: { nutritionistId: Number(id) } });
    res.json(diets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar dietas" });
  }
});

// ----------------- NUTRITIONISTS + DIETS -----------------
app.get("/nutritionists-with-diets", async (req, res) => {
  try {
    const nutritionists = await prisma.nutritionist.findMany({
      include: { diets: true }, // pega as dietas relacionadas
    });
    res.json(nutritionists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar nutricionistas" });
  }
});



// ========================
// START SERVER
// ========================
app.listen(4000, () => {
  console.log("🔥 Backend rodando em http://localhost:4000");
});
