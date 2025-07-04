
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Eye, MessageCircle, Edit, Trash2, Building2, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProperties } from '@/hooks/useProperties';
import { useAuth } from '@/hooks/useAuth';

const PropertyManagement = () => {
  const navigate = useNavigate();
  const { properties, loading } = useProperties();
  const { user } = useAuth();

  // Filter properties that belong to the current landlord
  const landlordProperties = properties.filter(p => p.landlord_id === user?.id);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Building2 className="h-8 w-8 text-primary-foreground" />
          </div>
          <p className="text-muted-foreground">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="mb-6 bg-white/50 backdrop-blur-sm border-white/20 hover:bg-white/70"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
              <Building2 className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Property Management</h1>
            <p className="text-muted-foreground">Manage your listed properties with ease</p>
          </div>
          <Button 
            onClick={() => navigate('/?view=add-property')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Property
          </Button>
        </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-primary text-primary-foreground border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Building2 className="h-8 w-8 mr-2" />
                <h3 className="text-3xl font-bold">{landlordProperties.length}</h3>
              </div>
              <p className="text-primary-foreground/80">Total Properties</p>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/90 text-primary-foreground border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8 mr-2" />
                <h3 className="text-3xl font-bold">
                  {landlordProperties.filter(p => p.is_available).length}
                </h3>
              </div>
              <p className="text-primary-foreground/80">Available</p>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/80 text-primary-foreground border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Eye className="h-8 w-8 mr-2" />
                <h3 className="text-3xl font-bold">
                  {landlordProperties.reduce((sum, p) => sum + (p.view_count || 0), 0)}
                </h3>
              </div>
              <p className="text-primary-foreground/80">Total Views</p>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/70 text-primary-foreground border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <MessageCircle className="h-8 w-8 mr-2" />
                <h3 className="text-3xl font-bold">
                  {landlordProperties.reduce((sum, p) => sum + (p.inquiry_count || 0), 0)}
                </h3>
              </div>
              <p className="text-primary-foreground/80">Total Inquiries</p>
            </CardContent>
          </Card>
        </div>

        {/* Properties List */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader className="bg-primary/10">
            <CardTitle className="text-foreground">Your Properties</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {landlordProperties.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="h-12 w-12 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-6 text-lg">You haven't listed any properties yet.</p>
                <Button 
                  onClick={() => navigate('/?view=add-property')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Property
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {landlordProperties.map((property) => (
                  <div key={property.id} className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-semibold text-xl text-foreground">{property.title}</h3>
                          <Badge 
                            variant={property.is_available ? "default" : "secondary"}
                          >
                            {property.is_available ? "Available" : "Unavailable"}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3 text-lg">{property.location}</p>
                        <div className="flex items-center gap-6 text-sm">
                          <span className="flex items-center gap-2 text-muted-foreground">
                            <Eye className="h-4 w-4 text-primary" />
                            {property.view_count || 0} views
                          </span>
                          <span className="flex items-center gap-2 text-muted-foreground">
                            <MessageCircle className="h-4 w-4 text-primary" />
                            {property.inquiry_count || 0} inquiries
                          </span>
                          <span className="font-semibold text-2xl text-primary">
                            ${property.price}/month
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-white/50 border-primary/20 text-primary hover:bg-primary/10"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-white/50 border-destructive/20 text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PropertyManagement;
