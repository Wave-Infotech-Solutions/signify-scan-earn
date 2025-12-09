// Sample data for Signify Retailer/Installer App

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'retailer' | 'installer';
  avatar?: string;
  totalPoints: number;
  pendingPoints: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  joinedDate: string;
  scansThisMonth: number;
}

export interface Scan {
  id: string;
  productName: string;
  productCode: string;
  points: number;
  timestamp: string;
  status: 'completed' | 'pending';
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  uploadedBy: User;
  uploadDate: string;
  totalAmount: number;
  estimatedPoints: number;
  status: 'pending' | 'approved' | 'rejected';
  imageUrl: string;
  products: string[];
  notes?: string;
}

export interface PointsTransaction {
  id: string;
  type: 'scan' | 'invoice' | 'bonus' | 'redemption';
  description: string;
  points: number;
  timestamp: string;
  status: 'completed' | 'pending';
}

export interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  points: number;
  image?: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalScans: number;
  pendingInvoices: number;
  pointsDistributed: number;
  weeklyGrowth: number;
}

// Current logged-in user (mobile app)
export const currentUser: User = {
  id: 'u1',
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@electricals.com',
  phone: '+91 98765 43210',
  type: 'retailer',
  totalPoints: 12450,
  pendingPoints: 850,
  tier: 'Gold',
  joinedDate: '2023-06-15',
  scansThisMonth: 47,
};

// Sample users for admin panel
export const sampleUsers: User[] = [
  currentUser,
  {
    id: 'u2',
    name: 'Amit Sharma',
    email: 'amit.s@installer.com',
    phone: '+91 87654 32109',
    type: 'installer',
    totalPoints: 8920,
    pendingPoints: 320,
    tier: 'Silver',
    joinedDate: '2023-09-22',
    scansThisMonth: 32,
  },
  {
    id: 'u3',
    name: 'Priya Patel',
    email: 'priya.p@lightingworld.com',
    phone: '+91 76543 21098',
    type: 'retailer',
    totalPoints: 24780,
    pendingPoints: 1200,
    tier: 'Platinum',
    joinedDate: '2022-11-08',
    scansThisMonth: 89,
  },
  {
    id: 'u4',
    name: 'Suresh Reddy',
    email: 'suresh.r@proinstall.com',
    phone: '+91 65432 10987',
    type: 'installer',
    totalPoints: 5640,
    pendingPoints: 0,
    tier: 'Bronze',
    joinedDate: '2024-01-15',
    scansThisMonth: 18,
  },
  {
    id: 'u5',
    name: 'Meera Joshi',
    email: 'meera.j@brightlights.com',
    phone: '+91 54321 09876',
    type: 'retailer',
    totalPoints: 15320,
    pendingPoints: 560,
    tier: 'Gold',
    joinedDate: '2023-03-20',
    scansThisMonth: 56,
  },
];

// Recent scans for mobile app
export const recentScans: Scan[] = [
  {
    id: 's1',
    productName: 'Philips LED Tube 20W',
    productCode: 'PHI-LED-T20W',
    points: 25,
    timestamp: '2024-01-15T10:30:00Z',
    status: 'completed',
  },
  {
    id: 's2',
    productName: 'Philips Smart Bulb E27',
    productCode: 'PHI-SMT-E27',
    points: 40,
    timestamp: '2024-01-15T09:15:00Z',
    status: 'completed',
  },
  {
    id: 's3',
    productName: 'Philips Panel Light 18W',
    productCode: 'PHI-PNL-18W',
    points: 35,
    timestamp: '2024-01-14T16:45:00Z',
    status: 'completed',
  },
  {
    id: 's4',
    productName: 'Philips Street Light 50W',
    productCode: 'PHI-STR-50W',
    points: 75,
    timestamp: '2024-01-14T14:20:00Z',
    status: 'pending',
  },
  {
    id: 's5',
    productName: 'Philips Downlight 12W',
    productCode: 'PHI-DWN-12W',
    points: 30,
    timestamp: '2024-01-13T11:00:00Z',
    status: 'completed',
  },
];

// Pending invoices for admin
export const pendingInvoices: Invoice[] = [
  {
    id: 'inv1',
    invoiceNumber: 'INV-2024-0156',
    uploadedBy: sampleUsers[0],
    uploadDate: '2024-01-15T08:30:00Z',
    totalAmount: 45600,
    estimatedPoints: 456,
    status: 'pending',
    imageUrl: '/placeholder.svg',
    products: ['Philips LED Tube 20W x10', 'Philips Panel Light 18W x5'],
    notes: 'Bulk purchase for commercial project',
  },
  {
    id: 'inv2',
    invoiceNumber: 'INV-2024-0157',
    uploadedBy: sampleUsers[1],
    uploadDate: '2024-01-14T15:45:00Z',
    totalAmount: 28900,
    estimatedPoints: 289,
    status: 'pending',
    imageUrl: '/placeholder.svg',
    products: ['Philips Smart Bulb E27 x20'],
  },
  {
    id: 'inv3',
    invoiceNumber: 'INV-2024-0158',
    uploadedBy: sampleUsers[2],
    uploadDate: '2024-01-14T12:20:00Z',
    totalAmount: 125000,
    estimatedPoints: 1250,
    status: 'pending',
    imageUrl: '/placeholder.svg',
    products: ['Philips Street Light 50W x15', 'Philips Industrial Light 100W x8'],
    notes: 'Municipal street lighting project',
  },
  {
    id: 'inv4',
    invoiceNumber: 'INV-2024-0155',
    uploadedBy: sampleUsers[4],
    uploadDate: '2024-01-13T09:00:00Z',
    totalAmount: 18500,
    estimatedPoints: 185,
    status: 'approved',
    imageUrl: '/placeholder.svg',
    products: ['Philips Downlight 12W x25'],
  },
];

// Points history for mobile app
export const pointsHistory: PointsTransaction[] = [
  {
    id: 'pt1',
    type: 'scan',
    description: 'Scanned Philips LED Tube 20W',
    points: 25,
    timestamp: '2024-01-15T10:30:00Z',
    status: 'completed',
  },
  {
    id: 'pt2',
    type: 'scan',
    description: 'Scanned Philips Smart Bulb E27',
    points: 40,
    timestamp: '2024-01-15T09:15:00Z',
    status: 'completed',
  },
  {
    id: 'pt3',
    type: 'invoice',
    description: 'Invoice INV-2024-0150 approved',
    points: 350,
    timestamp: '2024-01-14T18:00:00Z',
    status: 'completed',
  },
  {
    id: 'pt4',
    type: 'bonus',
    description: 'Weekly scan bonus',
    points: 100,
    timestamp: '2024-01-14T00:00:00Z',
    status: 'completed',
  },
  {
    id: 'pt5',
    type: 'redemption',
    description: 'Redeemed Amazon Gift Card',
    points: -500,
    timestamp: '2024-01-12T14:30:00Z',
    status: 'completed',
  },
  {
    id: 'pt6',
    type: 'invoice',
    description: 'Invoice INV-2024-0156 submitted',
    points: 456,
    timestamp: '2024-01-15T08:30:00Z',
    status: 'pending',
  },
];

// Dashboard stats for admin
export const dashboardStats: DashboardStats = {
  totalUsers: 2847,
  activeUsers: 1923,
  totalScans: 45892,
  pendingInvoices: 23,
  pointsDistributed: 892450,
  weeklyGrowth: 12.5,
};

// Sample products
export const products: Product[] = [
  { id: 'p1', name: 'Philips LED Tube 20W', code: 'PHI-LED-T20W', category: 'LED Tubes', points: 25 },
  { id: 'p2', name: 'Philips Smart Bulb E27', code: 'PHI-SMT-E27', category: 'Smart Lighting', points: 40 },
  { id: 'p3', name: 'Philips Panel Light 18W', code: 'PHI-PNL-18W', category: 'Panel Lights', points: 35 },
  { id: 'p4', name: 'Philips Street Light 50W', code: 'PHI-STR-50W', category: 'Outdoor', points: 75 },
  { id: 'p5', name: 'Philips Downlight 12W', code: 'PHI-DWN-12W', category: 'Downlights', points: 30 },
  { id: 'p6', name: 'Philips Industrial Light 100W', code: 'PHI-IND-100W', category: 'Industrial', points: 120 },
];

// Monthly stats for charts
export const monthlyStats = [
  { month: 'Aug', scans: 3200, invoices: 145, points: 64000 },
  { month: 'Sep', scans: 3800, invoices: 178, points: 76000 },
  { month: 'Oct', scans: 4100, invoices: 189, points: 82000 },
  { month: 'Nov', scans: 4500, invoices: 201, points: 90000 },
  { month: 'Dec', scans: 5200, invoices: 234, points: 104000 },
  { month: 'Jan', scans: 5800, invoices: 256, points: 116000 },
];

// User type distribution
export const userTypeDistribution = [
  { type: 'Retailers', count: 1654, percentage: 58 },
  { type: 'Installers', count: 1193, percentage: 42 },
];

// Tier distribution
export const tierDistribution = [
  { tier: 'Platinum', count: 124, color: '#7C3AED' },
  { tier: 'Gold', count: 458, color: '#F59E0B' },
  { tier: 'Silver', count: 892, color: '#94A3B8' },
  { tier: 'Bronze', count: 1373, color: '#D97706' },
];
