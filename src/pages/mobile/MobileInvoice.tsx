import React, { useState } from 'react';
import { Upload, Camera, FileText, CheckCircle2, X, Image } from 'lucide-react';
import { MobileLayout } from '@/components/mobile/MobileLayout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MobileInvoice: React.FC = () => {
  const [step, setStep] = useState<'upload' | 'preview' | 'success'>('upload');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleUpload = () => {
    // Simulate upload
    setUploadedImage('/placeholder.svg');
    setStep('preview');
  };

  const handleSubmit = () => {
    // Simulate submission
    setTimeout(() => {
      setStep('success');
    }, 1000);
  };

  const resetUpload = () => {
    setStep('upload');
    setUploadedImage(null);
  };

  return (
    <MobileLayout>
      <div className="p-5 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-foreground">Upload Invoice</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Can't scan? Upload your purchase invoice to earn points
          </p>
        </div>

        {step === 'upload' && (
          <div className="space-y-6 animate-fade-in">
            {/* Upload Area */}
            <div 
              className="border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center min-h-[240px] bg-muted/30 hover:border-primary/50 transition-colors cursor-pointer"
              onClick={handleUpload}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <p className="font-medium text-foreground text-center">
                Tap to upload invoice
              </p>
              <p className="text-sm text-muted-foreground text-center mt-1">
                JPG, PNG or PDF up to 10MB
              </p>
            </div>

            {/* Alternative options */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="mobileOutline" 
                className="h-auto py-4 flex-col gap-2"
                onClick={handleUpload}
              >
                <Camera className="w-6 h-6" />
                <span>Take Photo</span>
              </Button>
              <Button 
                variant="mobileOutline" 
                className="h-auto py-4 flex-col gap-2"
                onClick={handleUpload}
              >
                <Image className="w-6 h-6" />
                <span>Gallery</span>
              </Button>
            </div>

            {/* Tips */}
            <div className="bg-muted rounded-xl p-4 space-y-2">
              <p className="font-medium text-foreground text-sm">Tips for approval</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span>Ensure invoice is clearly visible</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span>Include all Philips products in frame</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span>Invoice date should be within 30 days</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {step === 'preview' && (
          <div className="space-y-6 animate-fade-in">
            {/* Preview */}
            <div className="relative rounded-2xl overflow-hidden bg-muted">
              <img 
                src={uploadedImage || ''} 
                alt="Invoice preview"
                className="w-full aspect-[3/4] object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm hover:bg-card"
                onClick={resetUpload}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Invoice details form */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Invoice Number (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., INV-2024-0156"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Notes (Optional)
                </label>
                <textarea
                  placeholder="Any additional information..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                variant="mobile" 
                size="xl" 
                className="w-full"
                onClick={handleSubmit}
              >
                Submit for Review
              </Button>
              <Button 
                variant="mobileGhost" 
                size="lg" 
                className="w-full"
                onClick={resetUpload}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center justify-center min-h-[400px] animate-scale-in">
            <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-12 h-12 text-success" />
            </div>
            <h2 className="text-xl font-bold text-foreground text-center">
              Invoice Submitted!
            </h2>
            <p className="text-muted-foreground text-center mt-2 max-w-[250px]">
              Your invoice is under review. Points will be credited within 24-48 hours.
            </p>
            
            <div className="bg-muted rounded-xl p-4 mt-6 w-full">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Estimated Points</span>
                <span className="font-semibold text-foreground">~350 pts</span>
              </div>
            </div>

            <Button 
              variant="mobile" 
              size="xl" 
              className="w-full mt-6"
              onClick={resetUpload}
            >
              Upload Another
            </Button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default MobileInvoice;
