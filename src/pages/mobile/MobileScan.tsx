import React, { useState } from 'react';
import { Camera, Flashlight, ImagePlus, X, CheckCircle2 } from 'lucide-react';
import { MobileLayout } from '@/components/mobile/MobileLayout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MobileScan: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning
    setTimeout(() => {
      setIsScanning(false);
      setScanned(true);
    }, 2000);
  };

  const resetScan = () => {
    setScanned(false);
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full min-h-[calc(100vh-80px)]">
        {/* Header */}
        <div className="p-5 pb-0">
          <h1 className="text-xl font-bold text-foreground">Scan QR Code</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Point your camera at the product QR code
          </p>
        </div>

        {/* Scanner Area */}
        <div className="flex-1 flex items-center justify-center p-5">
          <div className="relative w-full max-w-[280px] aspect-square">
            {!scanned ? (
              <>
                {/* Scanner frame */}
                <div className="absolute inset-0 rounded-3xl border-4 border-primary/30 overflow-hidden">
                  {/* Simulated camera view */}
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    <Camera className="w-16 h-16 text-muted-foreground/50" />
                  </div>
                  
                  {/* Scanning animation */}
                  {isScanning && (
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute left-0 right-0 h-1 bg-gradient-accent animate-[scan_2s_ease-in-out_infinite]" />
                    </div>
                  )}
                </div>
                
                {/* Corner markers */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-secondary rounded-tl-3xl" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-secondary rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-secondary rounded-bl-3xl" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-secondary rounded-br-3xl" />
              </>
            ) : (
              /* Success state */
              <div className="absolute inset-0 rounded-3xl bg-success/10 border-4 border-success flex flex-col items-center justify-center animate-scale-in">
                <CheckCircle2 className="w-20 h-20 text-success mb-4" />
                <p className="text-lg font-semibold text-foreground">Scan Successful!</p>
                <p className="text-sm text-muted-foreground mt-1">Philips LED Tube 20W</p>
                <p className="text-2xl font-bold text-success mt-3">+25 Points</p>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="p-5 space-y-4">
          {!scanned ? (
            <>
              {/* Action buttons */}
              <div className="flex items-center justify-center gap-6">
                <Button
                  variant="mobileGhost"
                  size="iconLg"
                  className={cn(
                    "rounded-full",
                    flashOn && "bg-warning/20 text-warning"
                  )}
                  onClick={() => setFlashOn(!flashOn)}
                >
                  <Flashlight className="w-6 h-6" />
                </Button>
                
                <Button
                  variant="accent"
                  size="xl"
                  className="rounded-full w-20 h-20 shadow-glow"
                  onClick={handleScan}
                  disabled={isScanning}
                >
                  <Camera className="w-8 h-8" />
                </Button>
                
                <Button
                  variant="mobileGhost"
                  size="iconLg"
                  className="rounded-full"
                >
                  <ImagePlus className="w-6 h-6" />
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                {isScanning ? 'Scanning...' : 'Tap to scan or upload from gallery'}
              </p>
            </>
          ) : (
            <div className="space-y-3">
              <Button 
                variant="mobile" 
                size="xl" 
                className="w-full"
                onClick={resetScan}
              >
                Scan Another
              </Button>
              <Button 
                variant="mobileOutline" 
                size="xl" 
                className="w-full"
              >
                View Details
              </Button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { top: 0; opacity: 1; }
          50% { top: calc(100% - 4px); opacity: 0.5; }
        }
      `}</style>
    </MobileLayout>
  );
};

export default MobileScan;
