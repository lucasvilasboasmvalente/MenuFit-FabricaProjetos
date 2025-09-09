import { Router } from "express";

const router = Router();

// mock de restaurantes
const restaurants = [
  { id: 1, name: "McDonald's" },
  { id: 2, name: "Subway" },
  { id: 3, name: "Burger King" },
];

// GET /restaurants
router.get("/", (req, res) => {
  res.json(restaurants);
});

// GET /restaurants/:id
router.get("/:id", (req, res) => {
  const restaurant = restaurants.find(r => r.id === Number(req.params.id));
  if (!restaurant) return res.status(404).json({ message: "Restaurante não encontrado" });
  res.json(restaurant);
});

export default router;
