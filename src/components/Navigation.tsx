import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Home, Search, Plus, Menu, User, LogOut, Building2, Settings, BarChart3, Calculator, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
  userMode: 'renter' | 'landlord';
  onModeChange: (mode: 'renter' | 'landlord') => void;
  onSearchClick: () => void;
  onAddPropertyClick: () => void;
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
  userRole,
  currentView,
  onBackClick,
  userName 
}: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
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
              <span className="ml-2 text-xl font-bold text-gray-900">RentEase</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={onSearchClick}
              className="flex items-center"
            >
              <Search className="h-4 w-4 mr-2" />
              Search Properties
            </Button>

            <Button 
              variant="ghost" 
              onClick={() => handleNavigation('/rent-calculator')}
              className="flex items-center"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Rent Calculator
            </Button>

            {userRole === 'landlord' && (
              <>
                <Button 
                  variant="ghost" 
                  onClick={onAddPropertyClick}
                  className="flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </Button>

                <Button 
                  variant="ghost" 
                  onClick={() => handleNavigation('/properties')}
                  className="flex items-center"
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  My Properties
                </Button>

                <Button 
                  variant="ghost" 
                  onClick={() => handleNavigation('/analytics')}
                  className="flex items-center"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </>
            )}

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {userName || 'User'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white border shadow-lg">
                <DropdownMenuItem onClick={() => handleNavigation('/settings')}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
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
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
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
