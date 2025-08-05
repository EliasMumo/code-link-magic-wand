
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useProperties } from '@/hooks/useProperties';
import { useFavorites } from '@/hooks/useFavorites';
import { useNavigate } from 'react-router-dom';

export const useIndexLogic = () => {
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const { properties, loading: propertiesLoading, userRole, addProperty, incrementPropertyViews } = useProperties();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const navigate = useNavigate();
  
  const [userMode, setUserMode] = useState<'renter' | 'landlord'>('renter');
  
  // Parse URL to set initial view
  const urlParams = new URLSearchParams(window.location.search);
  const viewParam = urlParams.get('view');
  const initialView = (viewParam === 'add-property' || viewParam === 'search' || viewParam === 'detail') ? viewParam : 'home';
  
  const [currentView, setCurrentView] = useState<'home' | 'search' | 'detail' | 'add-property'>(initialView as any);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    bedrooms: 'any',
    propertyType: 'any'
  });
  const [smartSearchResults, setSmartSearchResults] = useState<any[]>([]);
  const [isSmartSearchActive, setIsSmartSearchActive] = useState(false);

  useEffect(() => {
    console.log('useIndexLogic auth effect - authLoading:', authLoading, 'user:', user);
    if (!authLoading && !user) {
      console.log('Navigating to /auth');
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  // Set user mode based on actual user role
  useEffect(() => {
    if (userRole === 'landlord') {
      setUserMode('landlord');
    } else {
      setUserMode('renter');
    }
  }, [userRole]);

  const handlePropertyClick = (property: any) => {
    setSelectedProperty(property);
    setCurrentView('detail');
    incrementPropertyViews(property.id);
  };

  const handleAddProperty = async (propertyData: any) => {
    const newProperty = await addProperty(propertyData);
    if (newProperty) {
      setCurrentView('home');
    }
  };

  const handleSearch = () => {
    setIsSmartSearchActive(false);
    setSmartSearchResults([]);
    toast({
      title: "Search Updated!",
      description: "Showing properties matching your criteria.",
    });
  };

  const handleSmartSearchResults = (rankedProperties: any[], insights: string) => {
    setSmartSearchResults(rankedProperties);
    setIsSmartSearchActive(true);
    toast({
      title: "Smart Search Complete!",
      description: insights,
    });
  };

  const handleToggleFavorite = (propertyId: string) => {
    if (isFavorite(propertyId)) {
      removeFromFavorites(propertyId);
    } else {
      addToFavorites(propertyId);
    }
  };

  const handleAddPropertyClick = () => {
    if (userRole !== 'landlord') {
      toast({
        title: "Access Denied",
        description: "Only landlords can list properties",
        variant: "destructive",
      });
      return;
    }
    setCurrentView('add-property');
  };

  // Filter available properties based on search criteria
  const availableProperties = properties.filter(p => p.is_available);
  
  // Apply search filters
  const filteredProperties = availableProperties.filter(property => {
    // Location filter
    if (searchFilters.location) {
      const searchTerm = searchFilters.location.toLowerCase();
      const locationMatch = 
        property.location?.toLowerCase().includes(searchTerm) ||
        property.city?.toLowerCase().includes(searchTerm) ||
        property.state?.toLowerCase().includes(searchTerm) ||
        property.street_address?.toLowerCase().includes(searchTerm) ||
        property.title?.toLowerCase().includes(searchTerm) ||
        property.description?.toLowerCase().includes(searchTerm);
      if (!locationMatch) return false;
    }
    
    // Property type filter
    if (searchFilters.propertyType && searchFilters.propertyType !== 'any') {
      if (property.property_type?.toLowerCase() !== searchFilters.propertyType.toLowerCase()) {
        return false;
      }
    }
    
    // Bedrooms filter
    if (searchFilters.bedrooms && searchFilters.bedrooms !== 'any') {
      const bedroomCount = parseInt(searchFilters.bedrooms);
      if (bedroomCount === 4) {
        // 4+ bedrooms
        if (property.bedrooms < 4) return false;
      } else {
        if (property.bedrooms !== bedroomCount) return false;
      }
    }
    
    return true;
  });
    
  const displayProperties = isSmartSearchActive ? smartSearchResults : filteredProperties;
  const featuredProperties = availableProperties.slice(0, 3);
  const landlordProperties = properties.filter(p => p.landlord_id === user?.id).slice(0, 6);

  // Calculate statistics
  const totalViews = properties.reduce((sum, property) => sum + (property.view_count || 0), 0);
  const totalInquiries = properties.reduce((sum, property) => sum + (property.inquiry_count || 0), 0);

  return {
    // State
    userMode,
    currentView,
    selectedProperty,
    searchFilters,
    authLoading,
    propertiesLoading,
    userRole,
    user,
    properties: displayProperties,
    featuredProperties,
    landlordProperties,
    isSmartSearchActive,
    
    // Statistics
    propertiesCount: properties.length,
    availablePropertiesCount: filteredProperties.length,
    totalViews,
    totalInquiries,
    
    // Setters
    setCurrentView,
    setSearchFilters,
    
    // Handlers
    handlePropertyClick,
    handleAddProperty,
    handleSearch,
    handleSmartSearchResults,
    handleToggleFavorite,
    handleAddPropertyClick,
    isFavorite
  };
};
