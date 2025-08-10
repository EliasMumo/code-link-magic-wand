
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Plus, Home, Users, Shield, Star } from 'lucide-react';

interface HeroSectionProps {
  userMode: 'renter' | 'landlord';
  onSearchClick: () => void;
  onAddPropertyClick: () => void;
}

const HeroSection = ({ userMode, onSearchClick, onAddPropertyClick }: HeroSectionProps) => {
  return (
    <div className="relative bg-gradient-accent rounded-3xl p-12 mb-12 overflow-hidden shadow-elegant animate-fade-in">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -translate-y-40 translate-x-40"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-32 -translate-x-32"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-2 bg-gradient-primary opacity-20 blur-xl -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6 shadow-soft">
            <Star className="h-4 w-4 fill-current" />
            Welcome to DwellMerge
          </div>
          
          {userMode === 'renter' ? (
            <>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                Find Your Perfect
                <span className="text-transparent bg-clip-text bg-gradient-primary"> Home</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
                Discover amazing rental properties that match your lifestyle and budget. 
                Your dream home is just a search away.
              </p>
              <div className="flex justify-center animate-scale-in">
                <Button 
                  onClick={onSearchClick} 
                  size="lg" 
                  className="bg-gradient-primary hover:shadow-elegant text-primary-foreground px-10 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Search className="h-5 w-5 mr-3" />
                  Start Searching
                </Button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                List Your Property
                <span className="text-transparent bg-clip-text bg-gradient-primary"> Today</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
                Connect with quality tenants and maximize your rental income. 
                List your property with confidence and ease.
              </p>
              <div className="flex justify-center animate-scale-in">
                <Button 
                  onClick={onAddPropertyClick} 
                  size="lg" 
                  className="bg-gradient-primary hover:shadow-elegant text-primary-foreground px-10 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Plus className="h-5 w-5 mr-3" />
                  Add Property
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-8 bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-105 animate-fade-in">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft">
              <Home className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Quality Properties</h3>
            <p className="text-muted-foreground leading-relaxed">Verified listings with detailed information and high-quality photos</p>
          </div>
          
          <div className="text-center p-8 bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-105 animate-fade-in" style={{animationDelay: '0.1s'}}>
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Secure Platform</h3>
            <p className="text-muted-foreground leading-relaxed">Safe and secure transactions with verified users and properties</p>
          </div>
          
          <div className="text-center p-8 bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-105 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft">
              <Users className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Community Focused</h3>
            <p className="text-muted-foreground leading-relaxed">Connect with neighbors and build lasting relationships</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
