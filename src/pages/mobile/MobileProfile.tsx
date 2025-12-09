import React from 'react';
import { 
  User, Mail, Phone, Calendar, Award, Settings, 
  HelpCircle, LogOut, ChevronRight, Star, Shield 
} from 'lucide-react';
import { MobileLayout } from '@/components/mobile/MobileLayout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { currentUser } from '@/data/sampleData';

const MobileProfile: React.FC = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
    });
  };

  const getTierProgress = () => {
    const tiers = ['Bronze', 'Silver', 'Gold', 'Platinum'];
    const currentIndex = tiers.indexOf(currentUser.tier);
    return ((currentIndex + 1) / tiers.length) * 100;
  };

  const menuItems = [
    { icon: Award, label: 'Rewards Catalog', badge: '12 new' },
    { icon: Shield, label: 'Account Security' },
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help & Support' },
  ];

  return (
    <MobileLayout>
      <div className="p-5 space-y-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4 animate-fade-in">
          <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">{currentUser.name}</h1>
            <p className="text-sm text-muted-foreground capitalize">{currentUser.type}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 text-warning fill-warning" />
              <span className="text-sm font-medium text-foreground">{currentUser.tier} Member</span>
            </div>
          </div>
        </div>

        {/* Tier Progress */}
        <div className="bg-card rounded-2xl p-5 border border-border animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Tier Progress</span>
            <span className="text-sm font-medium text-foreground">{currentUser.tier} → Platinum</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-accent rounded-full transition-all duration-500"
              style={{ width: `${getTierProgress()}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Earn 5,000 more points to reach Platinum tier
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-foreground">Contact Information</h2>
          </div>
          <div className="divide-y divide-border">
            <div className="flex items-center gap-4 p-4">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground">{currentUser.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-foreground">{currentUser.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="text-foreground">{formatDate(currentUser.joinedDate)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden animate-slide-up" style={{ animationDelay: '0.15s' }}>
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              className={cn(
                "flex items-center gap-4 p-4 w-full hover:bg-muted/50 transition-colors",
                index !== menuItems.length - 1 && "border-b border-border"
              )}
            >
              <item.icon className="w-5 h-5 text-muted-foreground" />
              <span className="flex-1 text-left text-foreground">{item.label}</span>
              {item.badge && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                  {item.badge}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <Button 
          variant="outline" 
          className="w-full text-destructive hover:text-destructive hover:bg-destructive/5 animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </MobileLayout>
  );
};

export default MobileProfile;
