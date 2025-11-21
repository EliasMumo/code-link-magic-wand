import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Users, Eye, MessageCircle, TrendingUp } from 'lucide-react';
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from '@/components/ScrollReveal';

interface StatsSectionProps {
  propertiesCount: number;
  availablePropertiesCount: number;
  totalViews: number;
  totalInquiries: number;
}

const StatsSection = ({ propertiesCount, availablePropertiesCount, totalViews, totalInquiries }: StatsSectionProps) => {
  const stats = [
    {
      title: 'Total Properties',
      value: propertiesCount,
      icon: Home,
      color: 'from-primary to-primary/80',
      bgColor: 'bg-primary/5',
      textColor: 'text-primary'
    },
    {
      title: 'Available Properties',
      value: availablePropertiesCount,
      icon: Users,
      color: 'from-primary to-primary/80',
      bgColor: 'bg-primary/5',
      textColor: 'text-primary'
    },
    {
      title: 'Total Views',
      value: totalViews,
      icon: Eye,
      color: 'from-primary to-primary/80',
      bgColor: 'bg-primary/5',
      textColor: 'text-primary'
    },
    {
      title: 'Total Inquiries',
      value: totalInquiries,
      icon: MessageCircle,
      color: 'from-primary to-primary/80',
      bgColor: 'bg-primary/5',
      textColor: 'text-primary'
    }
  ];

  return (
    <div className="mb-8">
      <ScrollReveal variant="fadeUp">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Platform Statistics</h2>
            <p className="text-muted-foreground">Real-time insights into our rental marketplace</p>
          </div>
          <div className="flex items-center text-primary">
            <TrendingUp className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Live Data</span>
          </div>
        </div>
      </ScrollReveal>
      
      <ScrollRevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <ScrollRevealItem key={index}>
              <Card className={`${stat.bgColor} border-border/50 shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-semibold ${stat.textColor} mb-1`}>
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {stat.value.toLocaleString()}
                      </p>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-elegant`}>
                      <IconComponent className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className={`w-full bg-border/30 rounded-full h-2 overflow-hidden`}>
                      <div 
                        className={`bg-gradient-to-r ${stat.color} h-2 rounded-full transition-all duration-1000`}
                        style={{ width: `${Math.min((stat.value / Math.max(...stats.map(s => s.value))) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollRevealItem>
          );
        })}
      </ScrollRevealStagger>
    </div>
  );
};

export default StatsSection;
