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
  restaurant?: { name: string }; // pra mostrar o nome do restaurante
};

const Index = () => {
  const [meals, setMeals] = useState<Meal[]>([]);

  // 🔥 Buscar refeições do backend
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch("/api/meals/recommended");
        if (!res.ok) throw new Error("Erro na API");
        const data = await res.json();
        setMeals(data);
      } catch (err) {
        console.error("Erro ao buscar refeições:", err);
      }
    };

    fetchMeals();
  }, []);

  // Animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Smooth scroll
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href")?.substring(1);
        if (!targetId) return;

        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;

        const offset = window.innerWidth < 768 ? 100 : 80;

        window.scrollTo({
          top: targetElement.offsetTop - offset,
          behavior: "smooth",
        });
      });
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="space-y-0">
        <Hero />
        <Features />

        {/* 🍴 Refeições vindas do backend */}
        <section className="p-6">
          <h2 className="text-2xl font-bold mb-4">🍴 Refeições Recomendadas</h2>

          {meals.length === 0 ? (
            <p className="text-gray-500">Carregando refeições...</p>
          ) : (
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {meals.map((meal) => (
                <li
                  key={meal.id}
                  className="p-4 rounded-xl bg-black-100 shadow hover:shadow-lg transition"
                >
                  <p className="font-medium">{meal.name}</p>
                  <p className="text-sm text-gray-600">
                    {meal.calories} cal
                  </p>
                  {meal.restaurant && (
                    <p className="text-xs text-gray-500">
                      {meal.restaurant.name}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        <RestaurantShowcase />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
