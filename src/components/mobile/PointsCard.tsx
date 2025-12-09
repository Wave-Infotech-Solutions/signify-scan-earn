import React from 'react';
import { TrendingUp, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PointsCardProps {
  totalPoints: number;
  pendingPoints: number;
  tier: string;
  className?: string;
}

export const PointsCard: React.FC<PointsCardProps> = ({
  totalPoints,
  pendingPoints,
  tier,
  className,
}) => {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'from-violet-500 to-purple-600';
      case 'Gold': return 'from-amber-400 to-orange-500';
      case 'Silver': return 'from-slate-400 to-slate-500';
      default: return 'from-orange-600 to-amber-700';
    }
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 text-primary-foreground bg-gradient-primary",
        className
      )}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium opacity-90">Total Points</span>
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r",
            getTierColor(tier)
          )}>
            <Star className="w-3 h-3" />
            {tier}
          </div>
        </div>
        
        <div className="mb-4">
          <span className="text-4xl font-bold tracking-tight">
            {totalPoints.toLocaleString()}
          </span>
        </div>
        
        {pendingPoints > 0 && (
          <div className="flex items-center gap-2 text-sm opacity-90">
            <TrendingUp className="w-4 h-4" />
            <span>+{pendingPoints.toLocaleString()} pending</span>
          </div>
        )}
      </div>
    </div>
  );
};
