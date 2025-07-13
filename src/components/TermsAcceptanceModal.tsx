import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TermsAndConditions } from "@/components/TermsAndConditions";

interface TermsAcceptanceModalProps {
  open: boolean;
  onAccept: () => void;
  version?: string;
}

export const TermsAcceptanceModal = ({ open, onAccept, version }: TermsAcceptanceModalProps) => {
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
        
        <div className="flex justify-end pt-4 border-t">
          <Button 
            onClick={onAccept}
            className="min-w-[120px]"
          >
            I Accept
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};