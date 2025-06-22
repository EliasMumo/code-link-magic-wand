
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, User, Calendar } from 'lucide-react';
import { useReviews, Review } from '@/hooks/useReviews';
import { useAuth } from '@/hooks/useAuth';

interface PropertyReviewsProps {
  propertyId: string;
}

const PropertyReviews = ({ propertyId }: PropertyReviewsProps) => {
  const { user } = useAuth();
  const { reviews, loading, fetchReviewsForProperty, addReview, getAverageRating } = useReviews();
  const [showAddReview, setShowAddReview] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  useEffect(() => {
    fetchReviewsForProperty(propertyId);
  }, [propertyId]);

  const handleSubmitReview = async () => {
    if (newRating === 0) return;

    const success = await addReview(propertyId, newRating, newComment);
    if (success) {
      setShowAddReview(false);
      setNewRating(0);
      setNewComment('');
      fetchReviewsForProperty(propertyId);
    }
  };

  const renderStars = (rating: number, interactive = false, onStarClick?: (star: number) => void) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= (interactive ? (hoveredStar || rating) : rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onStarClick?.(star)}
            onMouseEnter={() => interactive && setHoveredStar(star)}
            onMouseLeave={() => interactive && setHoveredStar(0)}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const averageRating = getAverageRating(reviews);
  const userHasReviewed = user && reviews.some(review => review.tenant_id === user.id);

  if (loading) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">Loading reviews...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Reviews & Ratings</CardTitle>
            {reviews.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                {renderStars(Math.round(averageRating))}
                <span className="font-semibold text-lg">{averageRating}</span>
                <span className="text-gray-500">({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
              </div>
            )}
          </div>
          {user && !userHasReviewed && (
            <Button onClick={() => setShowAddReview(!showAddReview)}>
              Write Review
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Add Review Form */}
        {showAddReview && (
          <div className="border rounded-lg p-4 mb-6 bg-gray-50">
            <h3 className="font-semibold mb-3">Write a Review</h3>
            
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Rating</label>
              {renderStars(newRating, true, setNewRating)}
            </div>
            
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Comment (optional)</label>
              <Textarea
                placeholder="Share your experience with this property..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleSubmitReview} 
                disabled={newRating === 0}
              >
                Submit Review
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAddReview(false);
                  setNewRating(0);
                  setNewComment('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No reviews yet</p>
            <p className="text-sm text-gray-400 mt-1">Be the first to review this property</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <User className="h-8 w-8 bg-gray-200 rounded-full p-2" />
                    <div>
                      <p className="font-medium">Anonymous User</p>
                      <div className="flex items-center gap-2">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-500">
                          <Calendar className="h-3 w-3 inline mr-1" />
                          {formatDate(review.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {review.comment && (
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyReviews;
