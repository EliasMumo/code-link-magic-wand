import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Plus, Home, Users, Shield, Star } from 'lucide-react';
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from '@/components/ScrollReveal';

interface HeroSectionProps {
  userMode: 'renter' | 'landlord';
  onSearchClick: () => void;
  onAddPropertyClick: () => void;
}

const HeroSection = ({ userMode, onSearchClick, onAddPropertyClick }: HeroSectionProps) => {
  return (
    <div className="relative rounded-3xl p-16 mb-12 overflow-hidden shadow-elegant" style={{ background: 'var(--gradient-hero)' }}>
      {/* Sophisticated background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      {/* Elegant decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl translate-y-40 -translate-x-40" style={{ background: 'var(--gradient-gold)', opacity: 0.08 }}></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-2xl"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/5"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-12">
          <ScrollReveal variant="fadeDown" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold mb-8" style={{ 
              background: 'var(--gradient-gold)',
              boxShadow: 'var(--shadow-gold)',
              color: 'hsl(var(--primary-foreground))'
            }}>
              <Star className="h-4 w-4 fill-current" />
              Premium Property Solutions
            </div>
          </ScrollReveal>
          
          {userMode === 'renter' ? (
            <>
              <ScrollReveal variant="fadeUp" delay={0.2}>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 leading-[1.1] tracking-tight">
                  Find Your Perfect
                  <span className="block mt-2 text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-gold)' }}> Home</span>
                </h1>
              </ScrollReveal>
              <ScrollReveal variant="fadeUp" delay={0.3}>
                <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                  Discover exceptional rental properties that match your lifestyle and budget. 
                  Your dream home awaits.
                </p>
              </ScrollReveal>
              <ScrollReveal variant="scale" delay={0.4}>
                <div className="flex justify-center">
                  <Button 
                    onClick={onSearchClick} 
                    size="lg" 
                    className="px-12 py-6 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 border-0"
                    style={{
                      background: 'var(--gradient-gold)',
                      boxShadow: 'var(--shadow-gold)',
                      color: 'hsl(var(--primary-foreground))'
                    }}
                  >
                    <Search className="h-6 w-6 mr-3" />
                    Start Searching
                  </Button>
                </div>
              </ScrollReveal>
            </>
          ) : (
            <>
              <ScrollReveal variant="fadeUp" delay={0.2}>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 leading-[1.1] tracking-tight">
                  List Your Property
                  <span className="block mt-2 text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-gold)' }}> Today</span>
                </h1>
              </ScrollReveal>
              <ScrollReveal variant="fadeUp" delay={0.3}>
                <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                  Connect with quality tenants and maximize your rental income. 
                  List your property with confidence and ease.
                </p>
              </ScrollReveal>
              <ScrollReveal variant="scale" delay={0.4}>
                <div className="flex justify-center">
                  <Button 
                    onClick={onAddPropertyClick} 
                    size="lg" 
                    className="px-12 py-6 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 border-0"
                    style={{
                      background: 'var(--gradient-gold)',
                      boxShadow: 'var(--shadow-gold)',
                      color: 'hsl(var(--primary-foreground))'
                    }}
                  >
                    <Plus className="h-6 w-6 mr-3" />
                    Add Property
                  </Button>
                </div>
              </ScrollReveal>
            </>
          )}
        </div>

        {/* Feature highlights */}
        <ScrollRevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20" staggerDelay={0.15}>
          <ScrollRevealItem>
            <div className="text-center p-10 bg-card/60 backdrop-blur-md rounded-3xl border border-border/30 shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-105 hover:border-border/50">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ 
                background: 'var(--gradient-gold)',
                boxShadow: 'var(--shadow-gold)'
              }}>
                <Home className="h-10 w-10" style={{ color: 'hsl(var(--primary-foreground))' }} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">Quality Properties</h3>
              <p className="text-muted-foreground leading-relaxed font-light">Verified listings with detailed information and high-quality photos</p>
            </div>
          </ScrollRevealItem>
          
          <ScrollRevealItem>
            <div className="text-center p-10 bg-card/60 backdrop-blur-md rounded-3xl border border-border/30 shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-105 hover:border-border/50">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ 
                background: 'var(--gradient-gold)',
                boxShadow: 'var(--shadow-gold)'
              }}>
                <Shield className="h-10 w-10" style={{ color: 'hsl(var(--primary-foreground))' }} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">Secure Platform</h3>
              <p className="text-muted-foreground leading-relaxed font-light">Safe and secure transactions with verified users and properties</p>
            </div>
          </ScrollRevealItem>
          
          <ScrollRevealItem>
            <div className="text-center p-10 bg-card/60 backdrop-blur-md rounded-3xl border border-border/30 shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-105 hover:border-border/50">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ 
                background: 'var(--gradient-gold)',
                boxShadow: 'var(--shadow-gold)'
              }}>
                <Users className="h-10 w-10" style={{ color: 'hsl(var(--primary-foreground))' }} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">Community Focused</h3>
              <p className="text-muted-foreground leading-relaxed font-light">Connect with neighbors and build lasting relationships</p>
            </div>
          </ScrollRevealItem>
        </ScrollRevealStagger>
      </div>
    </div>
  );
};

export default HeroSection;
