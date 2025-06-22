import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Users, Eye, MessageCircle, TrendingUp } from 'lucide-react';

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
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Available Properties',
      value: availablePropertiesCount,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Total Views',
      value: totalViews,
      icon: Eye,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Total Inquiries',
      value: totalInquiries,
      icon: MessageCircle,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Platform Statistics</h2>
          <p className="text-gray-600">Real-time insights into our rental marketplace</p>
        </div>
        <div className="flex items-center text-blue-600">
          <TrendingUp className="h-5 w-5 mr-2" />
          <span className="text-sm font-medium">Live Data</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className={`${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${stat.textColor} mb-1`}>
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value.toLocaleString()}
                    </p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <div className={`w-full bg-white/50 rounded-full h-2`}>
                    <div 
                      className={`bg-gradient-to-r ${stat.color} h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${Math.min((stat.value / Math.max(...stats.map(s => s.value))) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StatsSection;
