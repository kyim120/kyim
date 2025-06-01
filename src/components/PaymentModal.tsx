
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Copy, CheckCircle, Wallet, AlertCircle, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    price: string;
  };
}

const PaymentModal = ({ isOpen, onClose, project }: PaymentModalProps) => {
  const [copied, setCopied] = useState(false);
  const [paymentStep, setPaymentStep] = useState("payment");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const binancePayId = "508-888-8888";
  const priceInUSD = parseInt(project.price.replace('$', ''));

  const generateQRCode = () => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(binancePayId)}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(binancePayId);
      setCopied(true);
      toast({
        title: "Pay ID Copied! 📋",
        description: "Binance Pay ID has been copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Please copy the Pay ID manually.",
        variant: "destructive"
      });
    }
  };

  const handlePaymentSent = async () => {
    setIsProcessing(true);
    setPaymentStep("processing");
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setPaymentStep("redirect");
    setIsProcessing(false);
  };

  const handleClose = () => {
    setPaymentStep("payment");
    setCopied(false);
    setIsProcessing(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-900/95 backdrop-blur-sm border-slate-700 max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Wallet className="h-5 w-5 text-yellow-400" />
            {paymentStep === "redirect" ? "Complete Payment" : `Purchase ${project.title}`}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {paymentStep === "redirect" 
              ? "Complete your payment on our secure payment page"
              : "Pay securely with Binance Pay"
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {paymentStep === "payment" && (
            <>
              <div className="text-center p-4 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg border border-yellow-700/50">
                <div className="text-3xl font-bold text-white mb-2">{project.price}</div>
                <Badge className="bg-yellow-900/50 text-yellow-400 border-yellow-700">Binance Pay</Badge>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700">
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-yellow-400" />
                  Payment Preview
                </h3>
                
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-lg inline-block mb-4 shadow-lg">
                      <img 
                        src={generateQRCode()} 
                        alt={`Binance Pay QR Code for ${project.title}`}
                        className="w-32 h-32"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mb-2">Scan with Binance app</p>
                  </div>

                  <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-300">Binance Pay ID</p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={copyToClipboard}
                        className="border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-black"
                      >
                        {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <code className="text-sm text-yellow-400 font-mono break-all">
                      {binancePayId}
                    </code>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-700/50 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-blue-300">
                        <p className="font-medium mb-1">Quick Payment:</p>
                        <p>For complete payment processing with screenshot upload, use our secure payment page.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={handleClose}
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Link to="/payment" className="flex-1">
                  <Button 
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold"
                    onClick={handleClose}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Complete Payment
                  </Button>
                </Link>
              </div>
            </>
          )}

          {paymentStep === "processing" && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Processing Payment...</h3>
              <p className="text-gray-400">Please wait while we verify your transaction</p>
            </div>
          )}

          {paymentStep === "redirect" && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <ExternalLink className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Complete Your Payment</h3>
              <p className="text-gray-400 mb-6">Click below to go to our secure payment page where you can upload your payment screenshot and complete the process.</p>
              
              <Link to="/payment">
                <Button 
                  onClick={handleClose}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Go to Payment Page
                </Button>
              </Link>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
