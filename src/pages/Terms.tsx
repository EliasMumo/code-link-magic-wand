import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { TermsAndConditions } from '@/components/TermsAndConditions';

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <Home className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            Terms and Conditions
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            DwellMerge Terms of Service and Privacy Policy
          </p>
        </div>

        {/* Navigation */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/auth')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign Up
          </Button>
        </div>

        {/* Terms Content */}
        <Card>
          <CardHeader>
            <CardTitle>Legal Agreement</CardTitle>
          </CardHeader>
          <CardContent>
            <TermsAndConditions />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;