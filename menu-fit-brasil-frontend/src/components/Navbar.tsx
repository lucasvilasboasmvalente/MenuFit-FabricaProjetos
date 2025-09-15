
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Download, Utensils } from "lucide-react";
import SignupModal from "./SignupModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 relative">
          {/* Logo - Moved ULTRA EXTREMELY to the right */}
          <div className="flex items-center space-x-2 ml-40">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              MenuFit Brasil
            </span>
          </div>

          {/* Desktop Navigation - Absolutely centered */}
          <div className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-8">
              <a href="#inicio" className="text-foreground hover:text-primary transition-colors duration-200">
                Início
              </a>
              <a href="#recursos" className="text-foreground hover:text-primary transition-colors duration-200">
                Recursos
              </a>
              <a href="#restaurantes" className="text-foreground hover:text-primary transition-colors duration-200">
                Restaurantes
              </a>
              <a href="#sobre" className="text-foreground hover:text-primary transition-colors duration-200">
                Sobre
              </a>
            </div>
          </div>

          {/* Signup Button - EXTREMELY to the left */}
          <div className="hidden md:flex items-center ml-auto mr-48">
            <Button 
              size="sm"
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-5 py-2 text-sm font-medium rounded-full"
              onClick={() => setIsSignupModalOpen(true)}
            >
              Crie sua conta
            </Button>
          </div>

          {/* Mobile menu button - Right side */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              <a
                href="#inicio"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </a>
              <a
                href="#recursos"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Recursos
              </a>
              <a
                href="#restaurantes"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Restaurantes
              </a>
              <a
                href="#sobre"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </a>
              <Button 
                size="sm"
                className="mx-3 my-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-4 py-2 text-sm font-medium rounded-full w-fit"
                onClick={() => {
                  setIsSignupModalOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                Crie sua conta
              </Button>
          
            </div>
          </div>
        )}
      </div>

      {/* Signup Modal */}
      <SignupModal 
        isOpen={isSignupModalOpen} 
        onClose={() => setIsSignupModalOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;
