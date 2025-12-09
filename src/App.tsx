import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Mobile App Pages
import MobileHome from "./pages/mobile/MobileHome";
import MobileScan from "./pages/mobile/MobileScan";
import MobileInvoice from "./pages/mobile/MobileInvoice";
import MobileHistory from "./pages/mobile/MobileHistory";
import MobileProfile from "./pages/mobile/MobileProfile";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminInvoices from "./pages/admin/AdminInvoices";
import AdminUsers from "./pages/admin/AdminUsers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Mobile App Routes */}
          <Route path="/app" element={<MobileHome />} />
          <Route path="/app/scan" element={<MobileScan />} />
          <Route path="/app/invoice" element={<MobileInvoice />} />
          <Route path="/app/history" element={<MobileHistory />} />
          <Route path="/app/profile" element={<MobileProfile />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/invoices" element={<AdminInvoices />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
