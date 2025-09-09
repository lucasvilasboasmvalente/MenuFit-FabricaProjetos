import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate subscription
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full border border-primary/20 mb-6">
            <Mail className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-foreground">Seja o primeiro a saber</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Entre na{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Lista de Espera
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Mais de 100.000 brasileiros já estão na lista. Seja notificado assim que o 
            MenuFit Brasil estiver disponível na App Store.
          </p>
        </div>

        {/* Subscription Form */}
        <div className="max-w-lg mx-auto">
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Digite seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 bg-card/50 backdrop-blur-sm border-border focus:border-primary text-foreground placeholder-muted-foreground"
                  required
                />
              </div>
              <Button
                type="submit"
                className="h-12 px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-medium"
              >
                Entrar na Lista
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          ) : (
            <div className="flex items-center justify-center space-x-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-green-500 font-medium">
                Obrigado! Você está na lista de espera ✨
              </span>
            </div>
          )}
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
          <div className="p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold text-lg">1°</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Acesso Antecipado</h3>
            <p className="text-muted-foreground text-sm">
              Seja um dos primeiros a usar o app antes do lançamento oficial.
            </p>
          </div>

          <div className="p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold">50%</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Desconto Exclusivo</h3>
            <p className="text-muted-foreground text-sm">
              50% de desconto no primeiro mês da assinatura premium.
            </p>
          </div>

          <div className="p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Dicas Exclusivas</h3>
            <p className="text-muted-foreground text-sm">
              Receba dicas de nutrição e novidades direto no seu e-mail.
            </p>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Junte-se a mais de 100.000 brasileiros que já estão esperando
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full border-2 border-background flex items-center justify-center text-white text-xs font-bold"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">+100.000 pessoas</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;