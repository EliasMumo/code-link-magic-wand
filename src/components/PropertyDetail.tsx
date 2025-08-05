
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin, Bed, Bath, Square, Calendar, ArrowLeft, Home, Heart, Star, Video, AlertTriangle } from 'lucide-react';
import { formatPrice } from '@/lib/currency';
import PropertyReviews from './PropertyReviews';
import Map from './Map';
import VideoPlayer from './VideoPlayer';

interface PropertyDetailProps {
  property: any;
  onBack: () => void;
  onToggleFavorite?: (propertyId: string) => void;
  isFavorite?: boolean;
}

const PropertyDetail = ({ property, onBack, onToggleFavorite, isFavorite }: PropertyDetailProps) => {

  const handleFavoriteClick = () => {
    onToggleFavorite?.(property.id);
  };

  // Use stored coordinates if available, otherwise fallback to geocoding or default
  const getCoordinatesForProperty = () => {
    // If property has stored coordinates, use them
    if (property.latitude && property.longitude) {
      return { lat: property.latitude, lng: property.longitude };
    }
    
    // Fallback to NYC center if no coordinates available
    return { lat: 40.7128, lng: -74.0060 };
  };

  const coordinates = getCoordinatesForProperty();

  return (
    <div className="max-w-6xl mx-auto">
      <Button 
        variant="outline" 
        onClick={onBack}
        className="mb-4 flex items-center"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to listings
      </Button>

      <Alert className="mb-6 border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <strong>Safety Warning:</strong> Never pay any rent, deposit, or fees before physically visiting the property and meeting the landlord in person. Verify the landlord's identity and ensure the property is legitimate before making any payments.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="h-64 rounded-t-lg overflow-hidden">
              {property.images && property.images.length > 0 ? (
                <img 
                  src={property.images[0]} 
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <Home className="h-24 w-24 text-blue-400" />
                </div>
              )}
            </div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {onToggleFavorite && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleFavoriteClick}
                      className="flex items-center gap-2"
                    >
                      <Heart 
                        className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                      />
                      {isFavorite ? 'Saved' : 'Save'}
                    </Button>
                  )}
                  <Badge variant={property.is_available ? 'default' : 'secondary'} className="text-sm">
                    {property.is_available ? 'Available' : 'Rented'}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{property.property_type}</span>
                </div>
              </div>
              
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="videos">
                    <Video className="h-4 w-4 mr-1" />
                    Videos
                  </TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="map">Location</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {property.description || `This beautiful ${property.property_type.toLowerCase()} offers comfortable living with modern amenities. Located in a desirable neighborhood with easy access to shopping, dining, and transportation. Perfect for professionals or families looking for a quality rental home.`}
                      </p>
                    </div>
                    
                    {property.amenities && property.amenities.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Amenities</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {property.amenities.map((amenity: string, index: number) => (
                            <span key={index} className="text-sm text-gray-600">• {amenity}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="videos" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4">Property Videos</h3>
                    {property.videos && property.videos.length > 0 ? (
                      <div className="grid gap-4">
                        {property.videos.map((videoUrl: string, index: number) => (
                          <div key={index} className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-700">Video {index + 1}</h4>
                            <VideoPlayer
                              videoUrl={videoUrl}
                              title={`${property.title} - Video ${index + 1}`}
                              className="w-full"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Video className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500 text-lg font-medium">No videos available</p>
                        <p className="text-gray-400 text-sm mt-1">The landlord hasn't uploaded any videos for this property yet.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-4">
                  <PropertyReviews propertyId={property.id} />
                </TabsContent>
                
                <TabsContent value="map" className="mt-4">
                  <div className="space-y-4">
                    <Map
                      latitude={coordinates.lat}
                      longitude={coordinates.lng}
                      zoom={14}
                      markers={[{
                        latitude: coordinates.lat,
                        longitude: coordinates.lng,
                        title: property.title,
                        price: property.price,
                      }]}
                      className="w-full h-80"
                    />
                    <div className="text-center">
                      <p className="text-sm text-gray-600 flex items-center justify-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {property.location}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">
                {formatPrice(property.price, property.currency || 'USD')}/month
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm">Available Now</span>
              </div>
              
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  );
};

export default PropertyDetail;
