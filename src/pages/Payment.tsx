
import { useState } from "react";
import { ArrowLeft, Upload, Check, Copy, CheckCircle, Wallet, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Payment = () => {
  const [paymentData, setPaymentData] = useState({
    email: "",
    amount: "",
    screenshot: null as string | null,
    message: "",
    transactionId: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Binance Pay wallet address
  const binanceWallet = "binancepay:5088888888888888";
  const binancePayId = "508-888-8888";

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setPaymentData(prev => ({ ...prev, screenshot: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Copied! 📋",
        description: `${type} has been copied to clipboard.`,
      });
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Please copy manually.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentData.email || !paymentData.amount || !paymentData.screenshot) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and upload payment screenshot.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Store payment data in localStorage
    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    const newPayment = {
      id: Date.now(),
      ...paymentData,
      method: "binance",
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    payments.push(newPayment);
    localStorage.setItem('payments', JSON.stringify(payments));

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Payment Submitted Successfully! 🎉",
      description: "Your payment is being verified. You'll receive confirmation within 24 hours.",
    });

    setPaymentData({ 
      email: "", 
      amount: "", 
      screenshot: null, 
      message: "",
      transactionId: ""
    });
    setIsSubmitting(false);
  };

  const generateQRCode = () => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(binancePayId)}`;
  };

  return (
    <div className="min-h-screen pt-16 relative">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&h=1080&fit=crop')"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 to-yellow-900/20" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Binance Pay Payment
          </h1>
          <p className="text-gray-300 text-lg">
            Quick and secure payments with Binance Pay
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-slate-600">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-4">
                <Wallet className="h-6 w-6 text-black" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Payment Details</h2>
                <p className="text-gray-400 text-sm">Fill in your payment information</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={paymentData.email}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Payment Amount (USD) *
                </label>
                <input
                  type="number"
                  value={paymentData.amount}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, amount: e.target.value }))}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="100"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Transaction ID (Optional)
                </label>
                <input
                  type="text"
                  value={paymentData.transactionId}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, transactionId: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="Enter Binance transaction ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload Payment Screenshot *
                </label>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-yellow-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleScreenshotUpload}
                    required
                    className="hidden"
                    id="screenshot-upload"
                  />
                  <label htmlFor="screenshot-upload" className="cursor-pointer">
                    <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-400 mb-1">Click to upload payment screenshot</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </label>
                  {paymentData.screenshot && (
                    <div className="mt-4">
                      <img src={paymentData.screenshot} alt="Payment screenshot" className="max-w-full h-40 object-cover rounded mx-auto border border-slate-600" />
                      <p className="text-sm text-green-400 mt-2 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Screenshot uploaded successfully
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Additional Message (Optional)
                </label>
                <textarea
                  value={paymentData.message}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 resize-none transition-colors"
                  rows={3}
                  placeholder="Any additional information..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 py-3 disabled:opacity-50 text-black font-semibold"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                    Processing Payment...
                  </div>
                ) : (
                  <>
                    Submit Payment <Check className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Binance Pay Instructions */}
          <div className="bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-slate-600">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-4">
                <Wallet className="h-6 w-6 text-black" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Binance Pay</h2>
                <p className="text-gray-400 text-sm">Scan QR or use Pay ID</p>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <div className="bg-white p-4 rounded-xl inline-block mb-4 shadow-lg">
                <img 
                  src={generateQRCode()}
                  alt="Binance Pay QR Code"
                  className="w-48 h-48 mx-auto"
                />
              </div>
              <p className="text-sm text-gray-400 mb-2">Scan with Binance app</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-300">Binance Pay ID</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(binancePayId, "Pay ID")}
                    className="border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-black"
                  >
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <code className="text-lg font-mono text-yellow-400 break-all">
                  {binancePayId}
                </code>
              </div>

              {paymentData.amount && (
                <div className="bg-yellow-900/20 border border-yellow-600/50 p-4 rounded-lg">
                  <p className="text-yellow-300 font-semibold text-center">
                    Amount: ${paymentData.amount} USD
                  </p>
                </div>
              )}
            </div>

            <div className="bg-blue-900/20 border border-blue-600/50 p-4 rounded-lg mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-300">
                  <p className="font-medium mb-2">Payment Instructions:</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>Open Binance app and go to Pay</li>
                    <li>Scan QR code or enter Pay ID: <span className="font-mono text-yellow-400">{binancePayId}</span></li>
                    <li>Send exact amount in USD</li>
                    <li>Take screenshot of successful payment</li>
                    <li>Upload screenshot and submit form</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-sm">
                <div className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                <p className="text-gray-300">Send payment via Binance Pay</p>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <div className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
                <p className="text-gray-300">Take screenshot of confirmation</p>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <div className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
                <p className="text-gray-300">Upload screenshot and submit form</p>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <div className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">4</div>
                <p className="text-gray-300">Receive confirmation within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
