import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X } from "lucide-react";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserData {
  email: string;
  birthDate: string;
  password: string;
  goal: 'lose' | 'gain' | '';
  weightGoal: number;
  favoriteRestaurants: string[];
  allergies: string[];
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    email: '',
    birthDate: '',
    password: '',
    goal: '',
    weightGoal: 0,
    favoriteRestaurants: [],
    allergies: []
  });
  const [errors, setErrors] = useState<string[]>([]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const validateStep1 = () => {
    const newErrors: string[] = [];
    
    if (!userData.email || !validateEmail(userData.email)) {
      newErrors.push('Por favor, insira um e-mail válido');
    }
    
    if (!userData.birthDate) {
      newErrors.push('Por favor, insira sua data de nascimento');
    } else {
      const age = calculateAge(userData.birthDate);
      if (age < 18) {
        newErrors.push('Você deve ter pelo menos 18 anos para se cadastrar');
      }
    }
    
    if (!userData.password || userData.password.length < 6) {
      newErrors.push('A senha deve ter pelo menos 6 caracteres');
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const validateStep2 = () => {
    const newErrors: string[] = [];
    
    if (!userData.goal) {
      newErrors.push('Por favor, selecione sua meta');
    }
    
    if (userData.goal && userData.weightGoal <= 0) {
      newErrors.push('Por favor, insira uma meta de peso válida');
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const validateStep3 = () => {
    const newErrors: string[] = [];
    
    if (userData.favoriteRestaurants.length === 0) {
      newErrors.push('Por favor, selecione pelo menos um restaurante favorito');
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      setErrors([]);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      setErrors([]);
    } else if (step === 3 && validateStep3()) {
      setStep(4);
      setErrors([]);
    }
  };

  const handleSubmit = () => {
    // Aqui você pode implementar a lógica para salvar os dados do usuário
    console.log('Dados do usuário:', userData);
    alert('Cadastro realizado com sucesso!');
    onClose();
    // Reset form
    setStep(1);
    setUserData({
      email: '',
      birthDate: '',
      password: '',
      goal: '',
      weightGoal: 0,
      favoriteRestaurants: [],
      allergies: []
    });
  };

  const handleRestaurantChange = (restaurant: string, checked: boolean) => {
    if (checked) {
      setUserData(prev => ({
        ...prev,
        favoriteRestaurants: [...prev.favoriteRestaurants, restaurant]
      }));
    } else {
      setUserData(prev => ({
        ...prev,
        favoriteRestaurants: prev.favoriteRestaurants.filter(r => r !== restaurant)
      }));
    }
  };

  const handleAllergyChange = (allergy: string, checked: boolean) => {
    if (checked) {
      setUserData(prev => ({
        ...prev,
        allergies: [...prev.allergies, allergy]
      }));
    } else {
      setUserData(prev => ({
        ...prev,
        allergies: prev.allergies.filter(a => a !== allergy)
      }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {step === 1 && 'Crie sua conta'}
            {step === 2 && 'Qual é sua meta?'}
            {step === 3 && 'Restaurantes favoritos'}
            {step === 4 && 'Alergias alimentares'}
          </DialogTitle>
        </DialogHeader>

        {errors.length > 0 && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1">
                {errors.map((error, index) => (
                  <li key={index} className="text-red-600">{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {/* Step 1: Cadastro básico */}
          {step === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={userData.email}
                  onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthDate">Data de nascimento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={userData.birthDate}
                  onChange={(e) => setUserData(prev => ({ ...prev, birthDate: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={userData.password}
                  onChange={(e) => setUserData(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>
            </>
          )}

          {/* Step 2: Meta de peso */}
          {step === 2 && (
            <>
              <div className="space-y-4">
                <Label>Qual é sua meta?</Label>
                <RadioGroup
                  value={userData.goal}
                  onValueChange={(value) => setUserData(prev => ({ ...prev, goal: value as 'lose' | 'gain' }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lose" id="lose" />
                    <Label htmlFor="lose">Perder peso</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gain" id="gain" />
                    <Label htmlFor="gain">Ganhar peso</Label>
                  </div>
                </RadioGroup>

                {userData.goal && (
                  <div className="space-y-2">
                    <Label htmlFor="weightGoal">
                      {userData.goal === 'lose' ? 'Meta de peso à perder (kg):' : 'Meta de peso à ganhar (kg):'}
                    </Label>
                    <Input
                      id="weightGoal"
                      type="number"
                      placeholder="Ex: 5"
                      value={userData.weightGoal || ''}
                      onChange={(e) => setUserData(prev => ({ ...prev, weightGoal: Number(e.target.value) }))}
                    />
                  </div>
                )}
              </div>
            </>
          )}

          {/* Step 3: Restaurantes favoritos */}
          {step === 3 && (
            <div className="space-y-4">
              <Label>Quais são seus restaurantes favoritos?</Label>
              <div className="space-y-3">
                {['McDonald\'s', 'Burger King', 'Subway'].map((restaurant) => (
                  <div key={restaurant} className="flex items-center space-x-2">
                    <Checkbox
                      id={restaurant}
                      checked={userData.favoriteRestaurants.includes(restaurant)}
                      onCheckedChange={(checked) => handleRestaurantChange(restaurant, checked as boolean)}
                    />
                    <Label htmlFor={restaurant}>{restaurant}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Alergias */}
          {step === 4 && (
            <div className="space-y-4">
              <Label>Você possui alguma alergia alimentar?</Label>
              <div className="space-y-3">
                {['Glúten', 'Lactose', 'Amendoim', 'Frutos do mar', 'Ovos', 'Soja', 'Nozes'].map((allergy) => (
                  <div key={allergy} className="flex items-center space-x-2">
                    <Checkbox
                      id={allergy}
                      checked={userData.allergies.includes(allergy)}
                      onCheckedChange={(checked) => handleAllergyChange(allergy, checked as boolean)}
                    />
                    <Label htmlFor={allergy}>{allergy}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between pt-4">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Voltar
            </Button>
          )}
          
          <div className="flex-1" />
          
          {step < 4 ? (
            <Button onClick={handleNext}>
              Próximo
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
              Finalizar Cadastro
            </Button>
          )}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center space-x-2 pt-2">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`w-2 h-2 rounded-full ${
                stepNumber <= step ? 'bg-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
