import React from 'react';
import Navigation from '@/components/Navigation';
import PropertyGrid from '@/components/PropertyGrid';
import SimpleSearch from '@/components/SimpleSearch';
import PropertyDetail from '@/components/PropertyDetail';
import AddPropertyForm from '@/components/AddPropertyForm';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import FeaturedProperties from '@/components/FeaturedProperties';
import LandlordDashboard from '@/components/LandlordDashboard';
import AdminDashboard from '@/components/AdminDashboard';
import FeatureHighlights from '@/components/FeatureHighlights';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { Home } from 'lucide-react';
import { useIndexLogic } from '@/hooks/useIndexLogic';

const Index = () => {
  const {
    userMode,
    currentView,
    selectedProperty,
    searchFilters,
    authLoading,
    propertiesLoading,
    userRole,
    user,
    properties,
    featuredProperties,
    landlordProperties,
    isSmartSearchActive,
    propertiesCount,
    availablePropertiesCount,
    totalViews,
    totalInquiries,
    setCurrentView,
    setSearchFilters,
    handlePropertyClick,
    handleAddProperty,
    handleSearch,
    handleSmartSearchResults,
    handleToggleFavorite,
    handleAddPropertyClick,
    handleAdminClick,
    isFavorite
  } = useIndexLogic();

  // Debug logging
  console.log('Index component render - authLoading:', authLoading, 'user:', user, 'currentView:', currentView);
  
  if (authLoading) {
    console.log('Showing auth loading state');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Home className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading DwellMerge...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('No user authenticated, redirecting should happen via useIndexLogic');
    return null;
  }

  const handleBackFromSearch = () => {
    setCurrentView('home');
  };

  // Get user's display name
  const userName = user?.user_metadata?.first_name && user?.user_metadata?.last_name 
    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
    : user?.user_metadata?.first_name || null;

  const renderContent = () => {
    switch (currentView) {
      case 'detail':
        return (
          <PropertyDetail 
            property={selectedProperty} 
            onBack={() => setCurrentView('home')}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite(selectedProperty?.id)}
          />
        );
      case 'search':
        return (
          <div>
            <SimpleSearch 
              filters={searchFilters}
              onFiltersChange={setSearchFilters}
              onSearch={handleSearch}
            />
            <PropertyGrid 
              properties={properties}
              onPropertyClick={handlePropertyClick}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={isFavorite}
              loading={propertiesLoading}
            />
          </div>
        );
      case 'add-property':
        return (
          <AddPropertyForm 
            onBack={() => setCurrentView('home')}
            onSubmit={handleAddProperty}
          />
        );
      case 'admin':
        return (
          <AdminDashboard 
            onClose={() => setCurrentView('home')}
          />
        );
      default:
        return (
          <div>
            <HeroSection 
              userMode={userMode}
              onSearchClick={() => setCurrentView('search')}
              onAddPropertyClick={handleAddPropertyClick}
            />

            <StatsSection 
              propertiesCount={propertiesCount}
              availablePropertiesCount={availablePropertiesCount}
              totalViews={totalViews}
              totalInquiries={totalInquiries}
            />

            {userMode === 'renter' && (
              <FeaturedProperties 
                properties={featuredProperties}
                onPropertyClick={handlePropertyClick}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={isFavorite}
                onViewAllClick={() => setCurrentView('search')}
                loading={propertiesLoading}
              />
            )}

            {userMode === 'landlord' && userRole === 'landlord' && (
              <LandlordDashboard 
                properties={landlordProperties}
                onPropertyClick={handlePropertyClick}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={isFavorite}
                onAddPropertyClick={handleAddPropertyClick}
                loading={propertiesLoading}
              />
            )}

            {/* Enhanced landing page sections */}
            <FeatureHighlights />
            <TestimonialsSection />
            <CTASection onGetStarted={() => setCurrentView('search')} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation 
        userMode={userMode}
        onModeChange={() => {}} // Disabled since mode is now based on actual role
        onSearchClick={() => setCurrentView('search')}
        onAddPropertyClick={handleAddPropertyClick}
        onAdminClick={handleAdminClick}
        userRole={userRole}
        currentView={currentView}
        onBackClick={handleBackFromSearch}
        userName={userName}
      />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {renderContent()}
      </main>

      {currentView === 'home' && <Footer />}
    </div>
  );
};

export default Index;
