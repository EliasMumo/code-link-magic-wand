import React from 'react';
import { Search, MapPin, MessageCircle, Heart, TrendingUp, Shield } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description: "AI-powered search that understands your preferences and finds perfect matches"
  },
  {
    icon: MapPin,
    title: "Location Intelligence",
    description: "Detailed neighborhood insights, commute times, and local amenities"
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Verified listings and secure communication for peace of mind"
  },
  {
    icon: MessageCircle,
    title: "Direct Messaging",
    description: "Connect directly with landlords and tenants through our secure platform"
  },
  {
    icon: Heart,
    title: "Save Favorites",
    description: "Bookmark properties you love and get notified of similar listings"
  },
  {
    icon: TrendingUp,
    title: "Market Analytics",
    description: "Real-time market data and trends to make informed decisions"
  }
];

const FeatureHighlights = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Powerful Features for
            <span className="text-transparent bg-clip-text bg-gradient-primary"> Everyone</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're searching for your next home or listing your property, 
            we have the tools to make your experience seamless
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/20 shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;