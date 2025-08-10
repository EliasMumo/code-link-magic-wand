import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Tenant",
    content: "DwellMerge made finding my perfect apartment so easy. The search filters are amazing and I found exactly what I was looking for in just days!",
    rating: 5,
    image: "SJ"
  },
  {
    name: "Michael Chen",
    role: "Landlord",
    content: "As a property owner, DwellMerge has been invaluable. I've connected with quality tenants and the platform makes management effortless.",
    rating: 5,
    image: "MC"
  },
  {
    name: "Emma Rodriguez",
    role: "Tenant",
    content: "The platform is so user-friendly and the property details are comprehensive. I felt confident in my rental decision thanks to DwellMerge.",
    rating: 5,
    image: "ER"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied users who have found their perfect rental match
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name} 
              className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mr-4">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <Quote className="h-6 w-6 text-primary/30 mb-4" />
                <p className="text-muted-foreground leading-relaxed italic">
                  "{testimonial.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;