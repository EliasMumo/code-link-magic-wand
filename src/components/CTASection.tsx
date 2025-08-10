import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Home } from 'lucide-react';

interface CTASectionProps {
  onGetStarted: () => void;
}

const CTASection = ({ onGetStarted }: CTASectionProps) => {
  return (
    <section className="py-24 bg-gradient-primary relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-y-40 -translate-x-40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-8 leading-tight">
            Ready to Find Your
            <br />
            <span className="text-white/90">Perfect Match?</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 leading-relaxed">
            Join thousands of satisfied users who have found their ideal rental properties 
            through DwellMerge. Start your journey today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-white hover:bg-white/90 text-primary px-10 py-4 text-lg font-semibold rounded-xl shadow-elegant hover:shadow-soft transition-all duration-300 hover:scale-105"
            >
              Get Started Now
              <ArrowRight className="h-5 w-5 ml-3" />
            </Button>
            
            <div className="flex items-center gap-8 text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="text-sm font-medium">10,000+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                <span className="text-sm font-medium">5,000+ Properties</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">99%</div>
              <div className="text-primary-foreground/80">Satisfaction Rate</div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">24/7</div>
              <div className="text-primary-foreground/80">Customer Support</div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">Free</div>
              <div className="text-primary-foreground/80">For Renters</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;