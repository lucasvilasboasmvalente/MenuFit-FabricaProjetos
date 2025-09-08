import { Router } from "express";

const router = Router();

// mock de refeições
const meals = [
  { id: 1, restaurantId: 1, name: "Salada Caesar com frango", calories: 320 },
  { id: 2, restaurantId: 2, name: "Sub 15cm frango grelhado", calories: 280 },
  { id: 3, restaurantId: 3, name: "Sanduíche vegetariano", calories: 250 },
];

// GET /meals/recommended
router.get("/recommended", (req, res) => {
  const recommended = meals.filter(m => m.calories < 350);
  res.json(recommended);
});

// GET /meals/:restaurantId
router.get("/:restaurantId", (req, res) => {
  const result = meals.filter(m => m.restaurantId === Number(req.params.restaurantId));
  res.json(result);
});

export default router;
