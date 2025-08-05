import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Home, Search, Plus, Menu, User, LogOut, Building2, Settings, BarChart3, Calculator, ArrowLeft, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
  userMode: 'renter' | 'landlord';
  onModeChange: (mode: 'renter' | 'landlord') => void;
  onSearchClick: () => void;
  onAddPropertyClick: () => void;
  onAdminClick?: () => void;
  userRole?: string;
  currentView?: string;
  onBackClick?: () => void;
  userName?: string | null;
}

const Navigation = ({ 
  userMode, 
  onModeChange, 
  onSearchClick, 
  onAddPropertyClick, 
  onAdminClick,
  userRole,
  currentView,
  onBackClick,
  userName 
}: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  // Debug logging
  console.log('Navigation component - userRole:', userRole, 'userName:', userName);

  const handleSignOut = async () => {
    try {
      await signOut();
      // Add a small delay to ensure state is cleared
      setTimeout(() => {
        navigate('/auth');
      }, 100);
    } catch (error) {
      console.error('Error during sign out:', error);
      // Even if sign out fails, redirect to auth page
      navigate('/auth');
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            {currentView && currentView !== 'home' && onBackClick && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBackClick}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div className="flex items-center">
              <Home className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">DwellMerge</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Button 
              variant="ghost" 
              onClick={onSearchClick}
              className="flex items-center px-3"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>

            {userRole === 'admin' && onAdminClick && (
              <Button variant="outline" onClick={onAdminClick}>
                <Shield className="h-4 w-4 mr-2" />
                Admin Panel
              </Button>
            )}
            {userRole === 'landlord' && (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => handleNavigation('/properties')}
                  className="flex items-center px-3"
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  Manage Properties
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={onAddPropertyClick}
                  className="flex items-center px-3"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </Button>
              </>
            )}

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center px-3">
                  <User className="h-4 w-4 mr-2" />
                  {userName || 'User'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white border shadow-lg">
                <DropdownMenuItem onClick={() => handleNavigation('/rent-calculator')}>
                  <Calculator className="h-4 w-4 mr-2" />
                  Rent Calculator
                </DropdownMenuItem>
                {userRole === 'landlord' && (
                  <>
                    <DropdownMenuItem onClick={() => handleNavigation('/properties')}>
                      <Building2 className="h-4 w-4 mr-2" />
                      My Properties
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigation('/analytics')}>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigation('/settings')}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Logout Button */}
            <Button 
              variant="outline" 
              onClick={handleSignOut}
              className="border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 px-3 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Mobile Menu Button and Logout */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Logout Button - More Prominent */}
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSignOut}
              className="border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="ml-1 text-xs">Out</span>
            </Button>
            
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white border shadow-lg">
                <DropdownMenuItem onClick={onSearchClick}>
                  <Search className="h-4 w-4 mr-2" />
                  Search Properties
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation('/rent-calculator')}>
                  <Calculator className="h-4 w-4 mr-2" />
                  Rent Calculator
                </DropdownMenuItem>
                {userRole === 'landlord' && (
                  <>
                    <DropdownMenuItem onClick={onAddPropertyClick}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Property
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigation('/properties')}>
                      <Building2 className="h-4 w-4 mr-2" />
                      My Properties
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigation('/analytics')}>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigation('/settings')}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
