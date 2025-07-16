import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TermsAndConditions } from "@/components/TermsAndConditions";

interface TermsAcceptanceModalProps {
  open: boolean;
  onAccept: () => void;
  version?: string;
}

export const TermsAcceptanceModal = ({ open, onAccept, version }: TermsAcceptanceModalProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleAccept = () => {
    if (isChecked) {
      onAccept();
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Updated Terms and Conditions {version && `(Version ${version})`}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Our terms and conditions have been updated. Please review and accept them to continue using DwellMerge.
          </p>
        </DialogHeader>
        
        <div className="flex-1 min-h-0 mb-6">
          <TermsAndConditions />
        </div>
        
        <div className="pt-4 border-t bg-white">
          <div className="flex items-center justify-between gap-4">
            {/* Checkbox and label on the left */}
            <div className="flex items-center space-x-3">
              <Checkbox 
                id="terms-acceptance-checkbox"
                checked={isChecked}
                onCheckedChange={(checked) => {
                  console.log('Checkbox changed:', checked);
                  setIsChecked(checked === true);
                }}
                className="h-5 w-5 border-2 border-blue-600 rounded data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[state=checked]:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                aria-describedby="terms-acceptance-label"
              />
              <label 
                htmlFor="terms-acceptance-checkbox" 
                id="terms-acceptance-label"
                className="text-sm font-medium text-gray-900 cursor-pointer select-none"
              >
                I have read and agree to the Terms and Conditions
              </label>
            </div>
            
            {/* Continue button on the right */}
            <Button 
              onClick={handleAccept}
              disabled={!isChecked}
              className="min-w-[140px] bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-200"
              size="lg"
              aria-label={isChecked ? "Accept terms and continue" : "Please check the agreement box to continue"}
            >
              {isChecked ? "Accept & Continue" : "Continue"}
            </Button>
          </div>
          
          {/* Additional instruction if not checked */}
          {!isChecked && (
            <p className="text-xs text-red-600 mt-2 text-center animate-fade-in">
              Please check the box above to accept the terms and conditions
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};