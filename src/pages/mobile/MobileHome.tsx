import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Upload, Bell, ChevronRight, Zap } from 'lucide-react';
import { MobileLayout } from '@/components/mobile/MobileLayout';
import { PointsCard } from '@/components/mobile/PointsCard';
import { ScanItem } from '@/components/mobile/ScanItem';
import { Button } from '@/components/ui/button';
import { currentUser, recentScans } from '@/data/sampleData';

const MobileHome: React.FC = () => {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <MobileLayout>
      <div className="p-5 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <p className="text-muted-foreground text-sm">{greeting()}</p>
            <h1 className="text-xl font-bold text-foreground">{currentUser.name}</h1>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>
        </div>

        {/* Points Card */}
        <PointsCard
          totalPoints={currentUser.totalPoints}
          pendingPoints={currentUser.pendingPoints}
          tier={currentUser.tier}
          className="animate-slide-up"
        />

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Link to="/app/scan">
            <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-secondary/50 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow">
                <QrCode className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Scan QR</p>
                <p className="text-xs text-muted-foreground">Earn points</p>
              </div>
            </div>
          </Link>
          
          <Link to="/app/invoice">
            <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-secondary/50 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <Upload className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Upload</p>
                <p className="text-xs text-muted-foreground">Invoice</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <div className="p-3 bg-card rounded-xl border border-border text-center">
            <p className="text-2xl font-bold text-foreground">{currentUser.scansThisMonth}</p>
            <p className="text-xs text-muted-foreground">Scans this month</p>
          </div>
          <div className="p-3 bg-card rounded-xl border border-border text-center">
            <div className="flex items-center justify-center gap-1">
              <Zap className="w-4 h-4 text-warning" />
              <p className="text-2xl font-bold text-foreground">5</p>
            </div>
            <p className="text-xs text-muted-foreground">Day streak</p>
          </div>
          <div className="p-3 bg-card rounded-xl border border-border text-center">
            <p className="text-2xl font-bold text-foreground">3</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
        </div>

        {/* Recent Scans */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Recent Scans</h2>
            <Link to="/app/history" className="text-sm text-secondary flex items-center gap-1 hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-2">
            {recentScans.slice(0, 3).map((scan, index) => (
              <div key={scan.id} style={{ animationDelay: `${0.25 + index * 0.05}s` }}>
                <ScanItem scan={scan} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default MobileHome;
