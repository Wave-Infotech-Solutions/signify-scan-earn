import React from 'react';
import { Users, QrCode, FileText, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatCard } from '@/components/admin/StatCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  dashboardStats, 
  pendingInvoices, 
  monthlyStats,
  userTypeDistribution,
  tierDistribution,
  sampleUsers
} from '@/data/sampleData';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

const AdminDashboard: React.FC = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">Export Report</Button>
            <Button variant="default">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Users"
            value={dashboardStats.totalUsers}
            change={8.2}
            icon={Users}
            iconColor="bg-primary/10 text-primary"
          />
          <StatCard
            title="Total Scans"
            value={dashboardStats.totalScans}
            change={12.5}
            icon={QrCode}
            iconColor="bg-secondary/10 text-secondary"
          />
          <StatCard
            title="Pending Invoices"
            value={dashboardStats.pendingInvoices}
            change={-5}
            icon={FileText}
            iconColor="bg-warning/10 text-warning"
          />
          <StatCard
            title="Points Distributed"
            value={dashboardStats.pointsDistributed}
            change={15.3}
            icon={Award}
            iconColor="bg-success/10 text-success"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Chart */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-semibold text-foreground">Activity Overview</h2>
                <p className="text-sm text-muted-foreground">Scans and invoices over time</p>
              </div>
              <select className="px-3 py-1.5 rounded-lg border border-input bg-background text-sm">
                <option>Last 6 months</option>
                <option>Last 12 months</option>
                <option>This year</option>
              </select>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyStats}>
                  <defs>
                    <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorInvoices" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="scans" 
                    stroke="hsl(var(--secondary))" 
                    fillOpacity={1} 
                    fill="url(#colorScans)" 
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="invoices" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorInvoices)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User Distribution */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-semibold text-foreground mb-6">User Distribution</h2>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userTypeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    <Cell fill="hsl(var(--primary))" />
                    <Cell fill="hsl(var(--secondary))" />
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {userTypeDistribution.map((item, index) => (
                <div key={item.type} className="flex items-center gap-2">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    index === 0 ? "bg-primary" : "bg-secondary"
                  )} />
                  <span className="text-sm text-muted-foreground">
                    {item.type} ({item.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Invoices */}
          <div className="bg-card rounded-xl border border-border">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-foreground">Pending Invoices</h2>
                <p className="text-sm text-muted-foreground">{pendingInvoices.filter(i => i.status === 'pending').length} awaiting review</p>
              </div>
              <Link to="/admin/invoices">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="divide-y divide-border">
              {pendingInvoices.filter(i => i.status === 'pending').slice(0, 4).map((invoice) => (
                <div key={invoice.id} className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-muted-foreground">{invoice.uploadedBy.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">₹{invoice.totalAmount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(invoice.uploadDate)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Users */}
          <div className="bg-card rounded-xl border border-border">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-foreground">Top Performers</h2>
                <p className="text-sm text-muted-foreground">This month's leaders</p>
              </div>
              <Link to="/admin/users">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="divide-y divide-border">
              {sampleUsers.slice(0, 4).map((user, index) => (
                <div key={user.id} className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-medium">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{user.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{user.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{user.totalPoints.toLocaleString()} pts</p>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      user.tier === 'Platinum' && "bg-violet-100 text-violet-700",
                      user.tier === 'Gold' && "bg-amber-100 text-amber-700",
                      user.tier === 'Silver' && "bg-slate-100 text-slate-700",
                      user.tier === 'Bronze' && "bg-orange-100 text-orange-700",
                    )}>
                      {user.tier}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
