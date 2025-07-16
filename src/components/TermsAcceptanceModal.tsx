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
        
        <div className="flex-1 min-h-0">
          <TermsAndConditions />
        </div>
        
        <div className="space-y-6 pt-4 border-t">
          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <Checkbox 
              id="terms-agreement"
              checked={isChecked}
              onCheckedChange={(checked) => setIsChecked(checked === true)}
              aria-describedby="terms-agreement-text"
              className="mt-1 h-5 w-5 border-2 border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <label 
              htmlFor="terms-agreement" 
              id="terms-agreement-text"
              className="text-sm leading-6 cursor-pointer font-medium text-gray-900 flex-1"
            >
              <span className="block">
                I have read and agree to the{" "}
                <span className="font-semibold text-blue-600">Terms and Conditions</span>{" "}
                above
              </span>
              <span className="text-xs text-gray-600 mt-1 block">
                You must accept these terms to continue using DwellMerge
              </span>
            </label>
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleAccept}
              disabled={!isChecked}
              className="min-w-[140px] bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              size="lg"
            >
              {isChecked ? "Accept & Continue" : "Please Check Above"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};