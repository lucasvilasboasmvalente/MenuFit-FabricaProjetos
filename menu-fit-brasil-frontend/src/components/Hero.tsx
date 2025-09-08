
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Star, Users, CheckCircle } from "lucide-react";
import SignupModal from "./SignupModal";

const Hero = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  // Logos dos restaurantes brasileiros
  const restaurantLogos = [
    { name: "McDonald's", logo: "https://logos-world.net/wp-content/uploads/2020/04/McDonalds-Logo.png" },
    { name: "Burger King", logo: "https://logos-world.net/wp-content/uploads/2020/04/Burger-King-Logo.png" },
    { name: "Subway", logo: "https://logos-world.net/wp-content/uploads/2023/01/Subway-Symbol.png" },
    { name: "KFC", logo: "https://logos-world.net/wp-content/uploads/2020/04/KFC-Logo.png" },
  ];

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background with restaurant logos pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 md:grid-cols-12 gap-8 transform rotate-12 scale-150">
          {Array.from({ length: 96 }).map((_, i) => {
            const logo = restaurantLogos[i % restaurantLogos.length];
            return (
              <div key={i} className="w-16 h-16 flex items-center justify-center">
                <img 
                  src={logo.logo} 
                  alt={logo.name}
                  className="w-12 h-12 object-contain filter grayscale opacity-30"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 pt-10">
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            O melhor <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">guia</span> Para 
            <br />
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Comer Fora
            </span> com Saúde
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Descubra exatamente o que pedir em qualquer restaurante do Brasil — 
            personalizado para seus objetivos, seus gostos e seu corpo.
          </p>

          {/* Phone mockup */}
          <div className="relative mx-auto w-80 h-96 md:w-96 md:h-[500px] mt-12">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[3rem] blur-xl"></div>
            <div className="relative bg-black rounded-[3rem] p-2 shadow-2xl">
              <div className="bg-background rounded-[2.5rem] h-full flex flex-col">
                {/* Status bar */}
                <div className="flex justify-between items-center px-6 py-3 text-xs text-foreground">
                  <span>9:41</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-2 bg-foreground rounded-sm"></div>
                    <div className="w-6 h-2 bg-foreground rounded-sm"></div>
                    <div className="w-6 h-2 bg-foreground rounded-sm"></div>
                  </div>
                </div>

                {/* App header */}
                <div className="px-6 py-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-foreground">MenuFit Brasil</h2>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-primary text-white rounded-full text-sm">Pratos</button>
                      <button className="px-3 py-1 bg-card text-foreground rounded-full text-sm">Locais</button>
                    </div>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Buscar restaurante..." 
                    className="w-full mt-3 p-2 bg-card rounded-lg text-foreground placeholder-muted-foreground"
                  />
                </div>

                {/* Featured meal */}
                <div className="flex-1 p-6">
                  <div className="bg-card rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <img src={restaurantLogos[0].logo} alt="McDonald's" className="w-16 h-8 object-contain" />
                      <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        97
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-bold text-foreground">Big Mac</h3>
                      <p className="text-sm text-muted-foreground">Rico em proteína, se encaixa perfeitamente nas suas macros.</p>
                      
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div className="text-center">
                          <div className="font-bold text-foreground">542</div>
                          <div className="text-muted-foreground">KCAL</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-foreground">25g</div>
                          <div className="text-muted-foreground">Proteína</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-foreground">45g</div>
                          <div className="text-muted-foreground">Carbs</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-foreground">31g</div>
                          <div className="text-muted-foreground">Gordura</div>
                        </div>
                      </div>
                      
                      <button className="w-full bg-primary text-white py-2 rounded-lg font-medium mt-4">
                        Pedir Agora
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setIsSignupModalOpen(true)}
            >
              Crie sua conta
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold rounded-full backdrop-blur-sm"
            >
              Saiba mais
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 mt-16 max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-primary/10">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold text-foreground">Personalizado</h3>
                <p className="text-sm text-muted-foreground">Para seus objetivos únicos</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-primary/10">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold text-foreground">Todos os Restaurantes</h3>
                <p className="text-sm text-muted-foreground">Mais de 50.000 no Brasil</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-primary/10">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold text-foreground">Macros Perfeitas</h3>
                <p className="text-sm text-muted-foreground">Sempre no seu objetivo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      <SignupModal 
        isOpen={isSignupModalOpen} 
        onClose={() => setIsSignupModalOpen(false)} 
      />
    </section>
  );
};

export default Hero;
