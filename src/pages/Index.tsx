import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Monitor, ArrowRight, QrCode, FileText, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16 animate-fade-in">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-xl">S</span>
              </div>
              <span className="text-3xl font-bold text-foreground">Signify</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Rewards Program
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Earn points by scanning Philips products or uploading invoices. 
              Track your rewards and redeem exclusive benefits.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                { icon: QrCode, label: 'QR Scanning' },
                { icon: FileText, label: 'Invoice Upload' },
                { icon: Award, label: 'Earn Points' },
                { icon: Users, label: 'For Retailers & Installers' },
              ].map((feature) => (
                <div 
                  key={feature.label}
                  className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border"
                >
                  <feature.icon className="w-4 h-4 text-secondary" />
                  <span className="text-sm text-foreground">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* App Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Mobile App Card */}
            <Link to="/app" className="group">
              <div className="bg-card rounded-2xl border border-border p-8 hover:border-secondary/50 hover:shadow-lg transition-all duration-300 h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-accent flex items-center justify-center mb-6 shadow-glow group-hover:scale-105 transition-transform">
                  <Smartphone className="w-8 h-8 text-accent-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Mobile App</h2>
                <p className="text-muted-foreground mb-6">
                  For retailers and installers. Scan products, upload invoices, and track your points on the go.
                </p>
                <div className="flex items-center text-secondary font-medium group-hover:gap-3 gap-2 transition-all">
                  Open App <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Admin Panel Card */}
            <Link to="/admin" className="group">
              <div className="bg-card rounded-2xl border border-border p-8 hover:border-primary/50 hover:shadow-lg transition-all duration-300 h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <Monitor className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Admin Panel</h2>
                <p className="text-muted-foreground mb-6">
                  Manage users, approve invoices, view analytics, and oversee the entire rewards program.
                </p>
                <div className="flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all">
                  Open Dashboard <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>

          {/* Footer note */}
          <p className="text-center text-sm text-muted-foreground mt-12">
            Demo application for Signify Retailer & Installer Rewards Program
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
