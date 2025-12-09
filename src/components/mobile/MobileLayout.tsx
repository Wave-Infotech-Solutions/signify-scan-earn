import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, QrCode, Upload, History, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { icon: Home, label: 'Home', path: '/app' },
  { icon: QrCode, label: 'Scan', path: '/app/scan' },
  { icon: Upload, label: 'Invoice', path: '/app/invoice' },
  { icon: History, label: 'History', path: '/app/history' },
  { icon: User, label: 'Profile', path: '/app/profile' },
];

export const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative shadow-2xl">
      {/* Phone frame simulation */}
      <div className="flex-1 overflow-auto pb-20">
        {children}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card border-t border-border shadow-lg z-50">
        <div className="flex items-center justify-around py-2 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200",
                  isActive 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive && "scale-110")} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
