import React, { useState } from "react";
import { Star, MapPin, Clock, Utensils, X } from "lucide-react";

const RestaurantShowcase = () => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  const openLocationModal = (restaurantName: string) => {
    setSelectedRestaurant(restaurantName);
    setShowLocationModal(true);
  };

  const closeLocationModal = () => {
    setShowLocationModal(false);
    setSelectedRestaurant("");
  };

  const handleLocationClick = (url: string) => {
    window.open(url, '_blank');
  };

  const restaurants = [
    {
      name: "McDonald's",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/McDonalds-Logo.png",
      rating: 4.5,
      dishes: 147,
      healthyOptions: 23,
      description: "Opções saudáveis e proteicas",
      meals: [
        {
          name: "Hamburguer Duplo + 4 Nuggets + Coca Zero",
          calories: "540 kcal",
          protein: "28g",
          carbs: "35g",
          fat: "32g",
          description: "Hamburguer duplo com queijo, nuggets de frango e refrigerante zero"
        },
        {
          name: "McChicken + 4 Nuggets + Coca Zero",
          calories: "600 kcal",
          protein: "25g",
          carbs: "52g",
          fat: "28g",
          description: "McChicken com nuggets de frango e refrigerante zero"
        }
      ]
    },
    {
      name: "Burger King",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Burger-King-Logo.png",
      rating: 4.3,
      dishes: 89,
      healthyOptions: 18,
      description: "Grelhados e saladas frescas",
      meals: [
        {
          name: "Whopper Jr. + 4 Chicken Nuggets + Pepsi Zero",
          calories: "535 kcal",
          protein: "24.5g",
          carbs: "34.4g",
          fat: "35.7g",
          description: "Whopper Jr. com nuggets de frango e refrigerante zero açúcar, opção equilibrada para cutting"
        },
        {
          name: "BK Chicken + 4 Chicken Nuggets + Pepsi Zero",
          calories: "580 kcal",
          protein: "26g",
          carbs: "36g",
          fat: "32g",
          description: "BK Chicken com 4 nuggets de frango e refrigerante zero"
        }
      ]
    },
    {
      name: "Subway",
      logo: "https://logos-world.net/wp-content/uploads/2023/01/Subway-Symbol.png",
      rating: 4.7,
      dishes: 156,
      healthyOptions: 45,
      description: "Sanduíches personalizáveis (15 cm com refrigerante zero)",
      meals: [
        {
          name: "Sanduíche de Peito de Peru (15 cm) + Coca Zero",
          calories: "293 kcal",
          protein: "20.2g",
          carbs: "45.5g",
          fat: "3.4g",
          description: "Sanduíche de peito de peru com pão de 15 cm e refrigerante zero açúcar"
        },
        {
          name: "Sanduíche Frango Grelhado (15 cm) + Coca Zero",
          calories: "308 kcal",
          protein: "26.2g",
          carbs: "45.2g",
          fat: "2.6g",
          description: "Sanduíche de frango grelhado com pão de 15 cm e refrigerante zero açúcar"
        }
      ]
    },
    {
      name: "KFC",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/KFC-Logo.png",
      rating: 4.2,
      dishes: 67,
      healthyOptions: 12,
      description: "Frango grelhado e assado",
      meals: [
        {
          name: "Salada de Frango Caesar",
          calories: "185 kcal",
          protein: "28g",
          carbs: "4g",
          fat: "6g",
          description: "Frango grelhado, alface romana e molho light"
        },
        {
          name: "Frango Grelhado ",
          calories: "345 kcal",
          protein: "31g",
          carbs: "32g",
          fat: "12g",
          description: "Peito de frango grelhado com pão e vegetais"
        }
      ]
    },
    {
      name: "Kozan Sushi",
      logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMjAiIGZpbGw9IiNmZjZkNmQiLz4KPHN2ZyB4PSIyNSIgeT0iMjUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0tMiAxNWwtNS01aDNWOGg0djRoM2wtNSA1eiIvPgo8L3N2Zz4KPC9zdmc+",
      rating: 4.8,
      dishes: 89,
      healthyOptions: 28,
      description: "Sushi e comida japonesa autêntica",
      meals: [
        {
          name: "Rodízio Japonês c/ Bebida + Sobremesa",
          calories: "385 kcal",
          protein: "42g",
          carbs: "38g",
          fat: "8g",
          description: "Entrada Fria + Quente + Prato Principal + Temaki + Bebida + Sobremesa"
        },
        {
          name: "Combo de Salmão - 40 un",
          calories: "420 kcal",
          protein: "38g",
          carbs: "45g",
          fat: "12g",
          description: "40 peças: Hossomaki, Hot Roll, Niguiri, Sashimi e Uramaki de Salmão"
        }
      ]
    }
  ];

  return (
    <section id="restaurantes" className="py-20 bg-card/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Seus Restaurantes{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Favoritos
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Trabalhamos com as maiores redes do Brasil para oferecer opções saudáveis 
            e deliciosas em todos os lugares que você já ama comer.
          </p>
        </div>

        {/* Restaurant Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {restaurants.map((restaurant, index) => (
            <div
              key={index}
              className="group relative bg-card backdrop-blur-sm rounded-2xl border border-border hover:border-primary/50 transition-all duration-500 hover:transform hover:scale-105 overflow-hidden h-full flex flex-col"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative p-6 flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={restaurant.logo} 
                      alt={restaurant.name}
                      className="w-12 h-12 object-contain"
                    />
                    <div>
                      <h3 className="font-bold text-foreground">{restaurant.name}</h3>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{restaurant.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-foreground">{restaurant.dishes}</div>
                    <div className="text-xs text-muted-foreground">pratos</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4">{restaurant.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-2 bg-background/50 rounded-lg">
                    <div className="text-lg font-bold text-primary">{restaurant.healthyOptions}</div>
                    <div className="text-xs text-muted-foreground">Opções Saudáveis</div>
                  </div>
                  <div className="text-center p-2 bg-background/50 rounded-lg">
                    <div className="text-lg font-bold text-secondary">95%</div>
                    <div className="text-xs text-muted-foreground">Compatibilidade</div>
                  </div>
                </div>

                {/* Meals Section */}
                <div className="border-t border-border pt-4 mb-4">
                  <div className="mb-3">
                    <span className="text-xs text-muted-foreground font-semibold">REFEIÇÕES EQUILIBRADAS</span>
                  </div>
                  
                  <div className="space-y-3">
                    {restaurant.meals.map((meal, mealIndex) => (
                      <div key={mealIndex} className="bg-background/30 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-foreground text-sm">{meal.name}</h4>
                          <div className={`px-2 py-1 rounded-full text-xs font-bold shadow-md transition-colors ${
                            (() => {
                              const rating = restaurant.name === "McDonald's" && meal.name.includes("Hamburguer Duplo") ? 85 : 
                                            restaurant.name === "McDonald's" && meal.name.includes("McChicken") ? 70 :
                                            Math.min(100, Math.round((parseInt(meal.protein) / (parseInt(meal.calories) / 100)) * 100));
                              
                              if (rating <= 69) return "bg-gray-500 text-white hover:bg-gray-600";
                              if (rating >= 90) return "bg-green-500 text-white hover:bg-green-600";
                              if (rating >= 80) return "bg-orange-500 text-white hover:bg-orange-600";
                              if (rating >= 70) return "bg-yellow-300 text-black hover:bg-yellow-400";
                              return "bg-gray-500 text-white hover:bg-gray-600";
                            })()
                          }`}>
                            {restaurant.name === "McDonald's" && meal.name.includes("Hamburguer Duplo") ? "85" : 
                             restaurant.name === "McDonald's" && meal.name.includes("McChicken") ? "70" :
                             Math.min(100, Math.round((parseInt(meal.protein) / (parseInt(meal.calories) / 100)) * 100))}/100
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{meal.description}</p>
                        
                        <div className="grid grid-cols-4 gap-2 text-xs">
                          <div className="text-center">
                            <div className="font-bold text-foreground">{meal.calories.split(' ')[0]}</div>
                            <div className="text-muted-foreground">KCAL</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-primary">{meal.protein}</div>
                            <div className="text-muted-foreground">Proteína</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-orange-500">{meal.carbs}</div>
                            <div className="text-muted-foreground">Carbs</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-yellow-500">{meal.fat}</div>
                            <div className="text-muted-foreground">Gordura</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center space-x-2 mt-auto">
                  <button className="flex-1 bg-primary hover:bg-primary/80 text-white py-2 px-4 rounded-lg font-medium text-sm transition-colors">
                    Ver Menu Completo
                  </button>
                  <button 
                    onClick={() => openLocationModal(restaurant.name)}
                    className="p-2 border border-border hover:border-primary rounded-lg transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">50.000+</div>
            <div className="text-muted-foreground">Restaurantes</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-secondary mb-2">1M+</div>
            <div className="text-muted-foreground">Pratos Analisados</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent mb-2">97%</div>
            <div className="text-muted-foreground">Precisão IA</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">24h</div>
            <div className="text-muted-foreground">Suporte</div>
          </div>
        </div>
      </div>

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeLocationModal}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">📍 Localizações</h3>
                <button 
                  onClick={closeLocationModal}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-white/90 mt-2">{selectedRestaurant}</p>
            </div>

            {/* Location Options */}
            <div className="p-6 space-y-4">
              {/* Location 01 */}
              <div className="group cursor-pointer">
                <button
                  onClick={() => handleLocationClick("https://share.google/1cIktumgGA0NXayKd")}
                  className="w-full text-left p-4 border border-border rounded-xl hover:border-red-500/50 transition-all duration-300 hover:shadow-lg group-hover:bg-gradient-to-r group-hover:from-red-500/5 group-hover:to-orange-500/5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">Localização 01</h4>
                      <p className="text-muted-foreground text-sm">Av Tiradentes</p>
                    </div>
                                      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    VER
                  </div>
                </div>
              </button>
            </div>

            {/* Location 02 */}
            <div className="group cursor-pointer">
              <button
                onClick={() => handleLocationClick("https://share.google/6KlHsZrKJH8WuYHdL")}
                className="w-full text-left p-4 border border-border rounded-xl hover:border-red-500/50 transition-all duration-300 hover:shadow-lg group-hover:bg-gradient-to-r group-hover:from-red-500/5 group-hover:to-orange-500/5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">Localização 02</h4>
                    <p className="text-muted-foreground text-sm">Av Castro Alves</p>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    VER
                  </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6">
              <button
                onClick={closeLocationModal}
                className="w-full bg-muted hover:bg-muted/80 text-foreground py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RestaurantShowcase;