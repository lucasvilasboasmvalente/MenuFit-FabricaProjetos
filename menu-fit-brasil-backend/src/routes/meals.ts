import { Router } from "express";

const router = Router();

// mock de refeições
const meals = [
  { id: 1, restaurantId: 1, name: "Salada Caesar com frango", calories: 320 },
  { id: 2, restaurantId: 2, name: "Sub 15cm frango grelhado", calories: 280 },
  { id: 3, restaurantId: 3, name: "Sanduíche vegetariano", calories: 250 },
  { id: 4, restaurantId: 1, name: "Frango grelhado com legumes", calories: 450 },
  { id: 5, restaurantId: 2, name: "Wrap integral de atum", calories: 380 },
];

// GET /meals/recommended com filtros
router.get("/recommended", (req, res) => {
  const { search, maxCalories, restaurantId } = req.query;

  let filtered = meals;

  // filtro por nome
  if (search) {
    filtered = filtered.filter((m) =>
      m.name.toLowerCase().includes(String(search).toLowerCase())
    );
  }

  // filtro por calorias
  if (maxCalories) {
    filtered = filtered.filter((m) => m.calories <= Number(maxCalories));
  }

  // filtro por restaurante
  if (restaurantId) {
    filtered = filtered.filter(
      (m) => m.restaurantId === Number(restaurantId)
    );
  }

  res.json(filtered);
});

// GET /meals/:restaurantId
router.get("/:restaurantId", (req, res) => {
  const result = meals.filter(
    (m) => m.restaurantId === Number(req.params.restaurantId)
  );
  res.json(result);
});

export default router;
