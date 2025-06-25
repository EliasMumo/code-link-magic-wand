
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
    <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 rounded-2xl p-8 mb-8 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-blue-300/20 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-300/20 to-blue-200/20 rounded-full blur-3xl translate-y-24 -translate-x-24"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <Star className="h-4 w-4" />
            Welcome to RentHub
          </div>
          
          {userMode === 'renter' ? (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Find Your Perfect
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700"> Home</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Discover amazing rental properties that match your lifestyle and budget. 
                Your dream home is just a search away.
              </p>
              <div className="flex justify-center">
                <Button 
                  onClick={onSearchClick} 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Start Searching
                </Button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                List Your Property
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700"> Today</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Connect with quality tenants and maximize your rental income. 
                List your property with confidence and ease.
              </p>
              <div className="flex justify-center">
                <Button 
                  onClick={onAddPropertyClick} 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Property
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Home className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quality Properties</h3>
            <p className="text-gray-600 text-sm">Verified listings with detailed information and photos</p>
          </div>
          
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure Platform</h3>
            <p className="text-gray-600 text-sm">Safe and secure transactions with verified users</p>
          </div>
          
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Community Focused</h3>
            <p className="text-gray-600 text-sm">Connect with neighbors and build lasting relationships</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
