import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Gift, QrCode, FileText, Filter } from 'lucide-react';
import { MobileLayout } from '@/components/mobile/MobileLayout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { pointsHistory } from '@/data/sampleData';

const MobileHistory: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'scan' | 'invoice' | 'bonus' | 'redemption'>('all');

  const filteredHistory = filter === 'all' 
    ? pointsHistory 
    : pointsHistory.filter(item => item.type === filter);

  const getIcon = (type: string) => {
    switch (type) {
      case 'scan': return QrCode;
      case 'invoice': return FileText;
      case 'bonus': return Gift;
      case 'redemption': return ArrowDownLeft;
      default: return ArrowUpRight;
    }
  };

  const getIconStyle = (type: string) => {
    switch (type) {
      case 'scan': return 'bg-secondary/10 text-secondary';
      case 'invoice': return 'bg-primary/10 text-primary';
      case 'bonus': return 'bg-warning/10 text-warning';
      case 'redemption': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'scan', label: 'Scans' },
    { id: 'invoice', label: 'Invoices' },
    { id: 'bonus', label: 'Bonus' },
    { id: 'redemption', label: 'Redeemed' },
  ] as const;

  return (
    <MobileLayout>
      <div className="p-5 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Points History</h1>
          <Button variant="ghost" size="icon">
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-success/10 rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Earned</p>
            <p className="text-xl font-bold text-success">+12,950</p>
          </div>
          <div className="bg-destructive/10 rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Redeemed</p>
            <p className="text-xl font-bold text-destructive">-500</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
          {filters.map((f) => (
            <Button
              key={f.id}
              variant={filter === f.id ? 'default' : 'outline'}
              size="sm"
              className="rounded-full shrink-0"
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </Button>
          ))}
        </div>

        {/* History List */}
        <div className="space-y-3">
          {filteredHistory.map((item, index) => {
            const Icon = getIcon(item.type);
            const isNegative = item.points < 0;

            return (
              <div 
                key={item.id}
                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                  getIconStyle(item.type)
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{item.description}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs text-muted-foreground">{formatDate(item.timestamp)}</p>
                    {item.status === 'pending' && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-warning/10 text-warning">
                        Pending
                      </span>
                    )}
                  </div>
                </div>
                
                <span className={cn(
                  "font-semibold shrink-0",
                  isNegative ? "text-destructive" : "text-success"
                )}>
                  {isNegative ? '' : '+'}{item.points}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </MobileLayout>
  );
};

export default MobileHistory;
