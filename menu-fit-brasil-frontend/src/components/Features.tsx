
import React from "react";
import { Target, Camera, MapPin, Brain, Shield, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Target,
      title: "Personalização Inteligente",
      description: "Nossa IA analisa seus objetivos, preferências e restrições alimentares para criar recomendações perfeitas para você.",
      gradient: "from-red-500 to-orange-500",
    },
     
    {
      icon: MapPin,
      title: "Restaurantes Próximos",
      description: "Encontre os melhores pratos em restaurantes próximos a você, com avaliações baseadas no seu perfil nutricional.",
      gradient: "from-orange-500 to-yellow-500",
    },
    
    {
      icon: Shield,
      title: "Restrições Alimentares",
      description: "Filtre automaticamente por alergias, intolerâncias e preferências dietéticas como vegano, sem glúten e muito mais.",
      gradient: "from-red-500 to-yellow-500",
    },

  ];

  return (
    <section id="recursos" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Recursos que Fazem a{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Diferença
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tecnologia de ponta para transformar a forma como você come fora de casa, 
            sempre alinhada com seus objetivos de saúde e bem-estar.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border hover:border-red-500/50 transition-all duration-500 hover:transform hover:scale-105"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className={`relative inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-4 relative">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed relative">
                {feature.description}
              </p>

              {/* Hover effect arrow */}
              <div className="relative mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`w-8 h-0.5 bg-gradient-to-r ${feature.gradient} rounded-full`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-card/50 backdrop-blur-sm rounded-full border border-red-500/20 mb-6">
            <span className="text-sm font-medium text-foreground">
              ✨ E muito mais recursos chegando em breve
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
