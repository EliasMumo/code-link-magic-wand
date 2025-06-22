
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
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
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Property Management</h1>
              <p className="text-gray-600">Manage your listed properties with ease</p>
            </div>
            <Button 
              onClick={() => navigate('/?view=add-property')}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Property
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Building2 className="h-8 w-8 mr-2" />
                <h3 className="text-3xl font-bold">{landlordProperties.length}</h3>
              </div>
              <p className="text-blue-100">Total Properties</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8 mr-2" />
                <h3 className="text-3xl font-bold">
                  {landlordProperties.filter(p => p.is_available).length}
                </h3>
              </div>
              <p className="text-purple-100">Available</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Eye className="h-8 w-8 mr-2" />
                <h3 className="text-3xl font-bold">
                  {landlordProperties.reduce((sum, p) => sum + (p.view_count || 0), 0)}
                </h3>
              </div>
              <p className="text-indigo-100">Total Views</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-violet-500 to-violet-600 text-white border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <MessageCircle className="h-8 w-8 mr-2" />
                <h3 className="text-3xl font-bold">
                  {landlordProperties.reduce((sum, p) => sum + (p.inquiry_count || 0), 0)}
                </h3>
              </div>
              <p className="text-violet-100">Total Inquiries</p>
            </CardContent>
          </Card>
        </div>

        {/* Properties List */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            <CardTitle className="text-gray-900">Your Properties</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {landlordProperties.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="h-12 w-12 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-6 text-lg">You haven't listed any properties yet.</p>
                <Button 
                  onClick={() => navigate('/?view=add-property')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
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
                          <h3 className="font-semibold text-xl text-gray-900">{property.title}</h3>
                          <Badge 
                            variant={property.is_available ? "default" : "secondary"}
                            className={property.is_available ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"}
                          >
                            {property.is_available ? "Available" : "Unavailable"}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3 text-lg">{property.location}</p>
                        <div className="flex items-center gap-6 text-sm">
                          <span className="flex items-center gap-2 text-gray-600">
                            <Eye className="h-4 w-4 text-purple-500" />
                            {property.view_count || 0} views
                          </span>
                          <span className="flex items-center gap-2 text-gray-600">
                            <MessageCircle className="h-4 w-4 text-blue-500" />
                            {property.inquiry_count || 0} inquiries
                          </span>
                          <span className="font-semibold text-2xl text-blue-600">
                            ${property.price}/month
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-white/50 border-blue-200 text-blue-700 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-white/50 border-purple-200 text-purple-700 hover:bg-purple-50"
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
