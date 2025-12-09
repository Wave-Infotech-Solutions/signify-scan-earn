import React from 'react';
import { CheckCircle2, Clock, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Scan } from '@/data/sampleData';

interface ScanItemProps {
  scan: Scan;
}

export const ScanItem: React.FC<ScanItemProps> = ({ scan }) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/20 transition-colors animate-fade-in">
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center",
        scan.status === 'completed' 
          ? "bg-success/10 text-success" 
          : "bg-warning/10 text-warning"
      )}>
        {scan.status === 'completed' ? (
          <CheckCircle2 className="w-5 h-5" />
        ) : (
          <Clock className="w-5 h-5" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">{scan.productName}</p>
        <p className="text-sm text-muted-foreground">{formatTime(scan.timestamp)}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <span className={cn(
          "font-semibold",
          scan.status === 'completed' ? "text-success" : "text-warning"
        )}>
          +{scan.points}
        </span>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </div>
    </div>
  );
};
