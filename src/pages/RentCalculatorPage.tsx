
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RentCalculator from '@/components/RentCalculator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const RentCalculatorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 space-y-4">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="bg-white/50 backdrop-blur-sm border-white/20 hover:bg-white/70"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink 
                  onClick={() => navigate('/')}
                  className="flex items-center cursor-pointer hover:text-primary"
                >
                  <Home className="h-4 w-4 mr-1" />
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center">
                  <Calculator className="h-4 w-4 mr-1" />
                  Rent Calculator
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <RentCalculator />
      </div>
    </div>
  );
};

export default RentCalculatorPage;
