import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle } from "lucide-react";

interface DisclaimerModalProps {
  open: boolean;
  onAccept: () => void;
}

export const DisclaimerModal = ({ open, onAccept }: DisclaimerModalProps) => {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent 
        className="max-w-2xl max-h-[80vh] flex flex-col"
        aria-labelledby="disclaimer-title"
        aria-describedby="disclaimer-content"
      >
        <DialogHeader>
          <DialogTitle id="disclaimer-title" className="flex items-center gap-2 text-xl font-bold text-destructive">
            <AlertTriangle className="h-6 w-6" aria-hidden="true" />
            Important Safety Notice
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 min-h-0">
          <div id="disclaimer-content" className="space-y-4 p-4 text-sm">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-3 text-destructive">
                🚨 FRAUD PREVENTION WARNING 🚨
              </h3>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-2 text-destructive">
                    NEVER Make Payments Without Physical Inspection
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-foreground">
                    <li>ALWAYS visit the property in person before making any payment</li>
                    <li>NEVER send money, deposits, or fees to anyone you haven't met in person</li>
                    <li>NEVER wire money or use gift cards, cryptocurrency, or cash apps for rental payments</li>
                    <li>VERIFY the identity of landlords/property managers by checking official documents</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-destructive">
                    Red Flags to Watch For
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-foreground">
                    <li>Requests for payment before viewing the property</li>
                    <li>Prices significantly below market rate</li>
                    <li>Landlords who claim to be out of town/country</li>
                    <li>Pressure to act quickly or "secure" the property immediately</li>
                    <li>Communication only through email or text (no phone calls)</li>
                    <li>Requests to use specific payment methods only</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-destructive">
                    DwellMerge Liability Disclaimer
                  </h4>
                  <div className="bg-muted p-3 rounded border text-foreground">
                    <p className="font-medium mb-2">
                      DwellMerge acts solely as a marketplace platform and:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Does NOT verify the identity or legitimacy of users or listings</li>
                      <li>Does NOT guarantee the accuracy of property information</li>
                      <li>Is NOT responsible for any transactions between users</li>
                      <li>Is NOT liable for financial losses from fraudulent activity</li>
                      <li>Does NOT process payments or handle money transfers</li>
                      <li>Strongly recommends users conduct their own due diligence</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-destructive">
                    Your Safety is YOUR Responsibility
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-foreground">
                    <li>Trust your instincts - if something feels wrong, it probably is</li>
                    <li>Research properties and landlords independently</li>
                    <li>Meet in public places and bring someone with you when viewing properties</li>
                    <li>Report suspicious activity to local authorities and DwellMerge</li>
                    <li>Use secure, traceable payment methods for legitimate transactions</li>
                  </ul>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded p-3">
                  <p className="font-semibold text-primary">
                    Remember: Legitimate landlords will ALWAYS allow you to view the property in person before requesting any payment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        
        <div className="flex justify-center pt-4 border-t">
          <Button 
            onClick={onAccept}
            className="min-w-[200px] font-semibold"
            autoFocus
          >
            I Understand and Accept
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};