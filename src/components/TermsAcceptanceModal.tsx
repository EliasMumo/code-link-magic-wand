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
        
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="terms-agreement"
              checked={isChecked}
              onCheckedChange={(checked) => setIsChecked(checked === true)}
              aria-describedby="terms-agreement-text"
            />
            <label 
              htmlFor="terms-agreement" 
              id="terms-agreement-text"
              className="text-sm leading-5 cursor-pointer"
            >
              I have read and agree to the Terms and Conditions above
            </label>
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleAccept}
              disabled={!isChecked}
              className="min-w-[120px]"
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};