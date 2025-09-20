// src/pages/index.tsx
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import RestaurantShowcase from "@/components/RestaurantShowcase";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

type Meal = {
  id: number;
  restaurantId: number;
  name: string;
  calories: number;
  restaurant?: { id: number; name: string };
};

type Restaurant = {
  id: number;
  name: string;
};

type Diet = { id: number; title: string; description?: string };
type Nutritionist = { id: number; name: string; diets: Diet[] };

const Index = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [search, setSearch] = useState("");
  const [maxCalories, setMaxCalories] = useState<number | null>(null);
  const [restaurant, setRestaurant] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [nutritionists, setNutritionists] = useState<Nutritionist[]>([]);

  // Buscar restaurantes
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch("/api/restaurants");
        if (!res.ok) throw new Error("Erro ao buscar restaurantes");
        const data = await res.json();
        setRestaurants(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRestaurants();
  }, []);

  // Buscar refeições
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (maxCalories) params.append("maxCalories", maxCalories.toString());
        if (restaurant) params.append("restaurantId", restaurant.toString());

        const res = await fetch(`/api/meals/recommended?${params.toString()}`);
        if (!res.ok) throw new Error("Erro na API");
        const data = await res.json();
        setMeals(data);
      } catch (err) {
        setError("Erro ao carregar refeições. Tente novamente mais tarde.");
        console.error("Erro ao buscar refeições:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, [search, maxCalories, restaurant]);

  // Buscar nutricionistas + dietas
  useEffect(() => {
    const fetchNutritionists = async () => {
      try {
        const res = await fetch("/api/nutritionists-with-diets");
        if (!res.ok) throw new Error("Erro ao buscar nutricionistas");
        const data = await res.json();
        setNutritionists(data);
      } catch (err) {
        console.error("Erro ao buscar nutricionistas:", err);
      }
    };
    fetchNutritionists();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="space-y-8">
        <Hero />
        <Features />

        {/* 🍴 Refeições Recomendadas */}
        <section className="p-6 space-y-6">
          <h2 className="text-2xl font-bold">🍴 Refeições Recomendadas</h2>

          {/* Filtros */}
          <div className="grid gap-4 md:grid-cols-4 items-end">
            <input
              type="text"
              placeholder="Buscar refeição..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <select
              value={maxCalories ?? ""}
              onChange={(e) =>
                setMaxCalories(e.target.value ? Number(e.target.value) : null)
              }
              className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Todas as calorias</option>
              <option value="500">Até 500 cal</option>
              <option value="1000">Até 1000 cal</option>
            </select>

            <select
              value={restaurant ?? ""}
              onChange={(e) =>
                setRestaurant(e.target.value ? Number(e.target.value) : null)
              }
              className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Todos os restaurantes</option>
              {restaurants.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setSearch("");
                setMaxCalories(null);
                setRestaurant(null);
              }}
              className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Limpar filtros
            </button>
          </div>

          {/* Loading / Erro / Lista */}
          {loading && <p className="text-gray-500">Carregando refeições...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <>
              {meals.length === 0 ? (
                <p className="text-gray-500">Nenhuma refeição encontrada.</p>
              ) : (
                <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {meals.map((meal) => (
                    <li
                      key={meal.id}
                      className="p-4 rounded-xl bg-gray-100 shadow hover:shadow-lg transition"
                    >
                      <p className="font-medium">{meal.name}</p>
                      <p className="text-sm text-gray-600">{meal.calories} cal</p>
                      {meal.restaurant && (
                        <p className="text-xs text-gray-500">
                          {meal.restaurant.name}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </section>

        {/* 💎 Benefícios & Parcerias */}
        <section className="p-6 space-y-6">
          <h2 className="text-2xl font-bold">💎 Benefícios & Parcerias</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Medalhas */}
            <div className="p-4 rounded-xl bg-yellow-100 shadow hover:shadow-lg transition text-center">
              <p className="text-lg font-semibold">🏅 Medalhas</p>
              <p className="text-sm text-gray-600">Suba de nível e desbloqueie conquistas!</p>
            </div>

            {/* Cupom / Desconto */}
            <div className="p-4 rounded-xl bg-green-100 shadow hover:shadow-lg transition text-center">
              <p className="text-lg font-semibold">🎟️ Cupom de Desconto</p>
              <p className="text-sm text-gray-600">Ganhe descontos em mensalidades ou parceiros.</p>
            </div>

            {/* Propagandas */}
            <div className="p-4 rounded-xl bg-red-100 shadow hover:shadow-lg transition text-center">
              <p className="text-lg font-semibold">📢 Propagandas</p>
              <p className="text-sm text-gray-600">Ofertas especiais de restaurantes e parceiros.</p>
            </div>

            {/* Nutricionistas / Dietas */}
            <div className="p-4 rounded-xl bg-blue-100 shadow hover:shadow-lg transition">
              <p className="text-lg font-semibold text-center">🥗 Nutricionistas</p>
              <ul className="text-sm mt-2 space-y-1">
                {nutritionists.length === 0 && (
                  <li className="text-gray-500 text-center">Nenhum nutricionista cadastrado</li>
                )}
                {nutritionists.map((n) => (
                  <li key={n.id} className="border-b border-gray-200 pb-2">
                    <p className="font-medium">{n.name}</p>
                    {n.diets.length > 0 && (
                      <ul className="text-xs list-disc list-inside mt-1 space-y-0.5">
                        {n.diets.map((d) => (
                          <li key={d.id}>
                            {d.title} {d.description && `- ${d.description}`}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <RestaurantShowcase />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
