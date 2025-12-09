import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Mail, Phone, Award, QrCode } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { sampleUsers } from '@/data/sampleData';

const AdminUsers: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState<'all' | 'retailer' | 'installer'>('all');
  const [tierFilter, setTierFilter] = useState<string>('all');

  const filteredUsers = sampleUsers.filter(user => {
    if (typeFilter !== 'all' && user.type !== typeFilter) return false;
    if (tierFilter !== 'all' && user.tier !== tierFilter) return false;
    return true;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getTierStyle = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'bg-violet-100 text-violet-700 border-violet-200';
      case 'Gold': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Silver': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-orange-100 text-orange-700 border-orange-200';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">User Management</h1>
            <p className="text-muted-foreground">Manage retailers and installers</p>
          </div>
          <Button variant="default">
            Export Users
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-2">
            <select 
              className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
            >
              <option value="all">All Types</option>
              <option value="retailer">Retailers</option>
              <option value="installer">Installers</option>
            </select>
            <select 
              className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
            >
              <option value="all">All Tiers</option>
              <option value="Platinum">Platinum</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Bronze">Bronze</option>
            </select>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <div 
              key={user.id}
              className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{user.name}</h3>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full border",
                      getTierStyle(user.tier)
                    )}>
                      {user.tier}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="iconSm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{user.phone}</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-border">
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">{user.totalPoints.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total Points</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">{user.scansThisMonth}</p>
                  <p className="text-xs text-muted-foreground">Scans</p>
                </div>
                <div className="text-center">
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full capitalize",
                    user.type === 'retailer' ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                  )}>
                    {user.type}
                  </span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground pt-2">
                Member since {formatDate(user.joinedDate)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
