import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Shield, Eye, CreditCard, Users } from "lucide-react";

interface DisclaimerModalProps {
  open: boolean;
  onAccept: () => void;
  onClose?: () => void;
}

export const DisclaimerModal = ({ open, onAccept, onClose }: DisclaimerModalProps) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      // If no onClose provided, treat X click as acceptance
      onAccept();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent 
        className="max-w-3xl max-h-[85vh] flex flex-col border-2 border-destructive/20"
        aria-labelledby="disclaimer-title"
        aria-describedby="disclaimer-content"
      >
        <DialogHeader className="bg-gradient-to-r from-destructive/5 to-destructive/10 -m-6 p-6 mb-0">
          <DialogTitle id="disclaimer-title" className="flex items-center gap-3 text-2xl font-bold text-destructive">
            <div className="flex items-center justify-center w-10 h-10 bg-destructive/20 rounded-full">
              <AlertTriangle className="h-6 w-6" aria-hidden="true" />
            </div>
            Important Safety Notice
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Please read the following security information carefully before using DwellMerge
          </p>
        </DialogHeader>
        
        <ScrollArea className="flex-1 min-h-0">
          <div id="disclaimer-content" className="space-y-6 p-6">
            
            {/* Critical Warning Section */}
            <div className="bg-gradient-to-r from-destructive/10 to-destructive/5 border-l-4 border-destructive rounded-r-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 bg-destructive rounded-full flex-shrink-0 mt-1">
                  <CreditCard className="h-4 w-4 text-destructive-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-3 text-destructive">
                    Critical Payment Security
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-background/80 rounded-lg p-4 border">
                      <h4 className="font-semibold mb-2 text-destructive">
                        NEVER Make Payments Without Physical Inspection
                      </h4>
                      <ul className="space-y-2 text-foreground">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                          <span>ALWAYS visit the property in person before making any payment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                          <span>NEVER send money, deposits, or fees to anyone you haven't met in person</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                          <span>NEVER wire money or use gift cards, cryptocurrency, or cash apps</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                          <span>VERIFY landlord identity by checking official documents</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Red Flags Section */}
            <div className="bg-muted/50 rounded-lg p-6 border">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 bg-amber-500 rounded-full flex-shrink-0 mt-1">
                  <Eye className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-3 text-amber-700">
                    Red Flags to Watch For
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Payment requests before viewing</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Prices significantly below market rate</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Landlords claiming to be out of town</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Pressure to act immediately</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Email/text communication only</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Specific payment methods required</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Liability */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full flex-shrink-0 mt-1">
                  <Shield className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-3 text-primary">
                    DwellMerge Platform Liability
                  </h4>
                  <div className="bg-muted/30 rounded-lg p-4 border">
                    <p className="font-medium mb-3 text-sm">
                      DwellMerge operates as a marketplace platform only:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                          <span>Does NOT verify user identities</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                          <span>Does NOT guarantee listing accuracy</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                          <span>Is NOT responsible for transactions</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                          <span>Is NOT liable for financial losses</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                          <span>Does NOT process payments</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                          <span>Recommends independent verification</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Guidelines */}
            <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full flex-shrink-0 mt-1">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-3 text-green-700 dark:text-green-400">
                    Your Safety Guidelines
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Trust your instincts always</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Research properties independently</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Meet in public, bring someone</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Report suspicious activity</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Use secure payment methods</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Verify all documentation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Notice */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="font-semibold text-center text-primary">
                Remember: Legitimate landlords will ALWAYS allow in-person property viewing before requesting payment.
              </p>
            </div>
          </div>
        </ScrollArea>
        
        <div className="flex justify-center pt-6 border-t bg-muted/20 -m-6 mt-0 p-6">
          <Button 
            onClick={onAccept}
            className="min-w-[200px] font-semibold shadow-md hover:shadow-lg transition-shadow"
            autoFocus
          >
            I Understand and Accept
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};