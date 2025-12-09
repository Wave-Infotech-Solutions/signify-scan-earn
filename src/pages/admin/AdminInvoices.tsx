import React, { useState } from 'react';
import { FileText, Check, X, Eye, Filter, Search, Download } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { pendingInvoices } from '@/data/sampleData';
import type { Invoice } from '@/data/sampleData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const AdminInvoices: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const filteredInvoices = filter === 'all' 
    ? pendingInvoices 
    : pendingInvoices.filter(inv => inv.status === filter);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success/10 text-success';
      case 'rejected': return 'bg-destructive/10 text-destructive';
      default: return 'bg-warning/10 text-warning';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Invoice Management</h1>
            <p className="text-muted-foreground">Review and approve uploaded invoices</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search invoices..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
              <Button
                key={f}
                variant={filter === f ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(f)}
                className="capitalize"
              >
                {f}
              </Button>
            ))}
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Invoice</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Uploaded By</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Est. Points</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="font-medium text-foreground">{invoice.invoiceNumber}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-foreground">{invoice.uploadedBy.name}</p>
                        <p className="text-sm text-muted-foreground capitalize">{invoice.uploadedBy.type}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-sm">
                      {formatDate(invoice.uploadDate)}
                    </td>
                    <td className="py-3 px-4 font-medium text-foreground">
                      ₹{invoice.totalAmount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-medium text-secondary">
                      +{invoice.estimatedPoints}
                    </td>
                    <td className="py-3 px-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium capitalize",
                        getStatusStyle(invoice.status)
                      )}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="iconSm"
                          onClick={() => setSelectedInvoice(invoice)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {invoice.status === 'pending' && (
                          <>
                            <Button variant="ghost" size="iconSm" className="text-success hover:text-success">
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="iconSm" className="text-destructive hover:text-destructive">
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invoice Detail Modal */}
        <Dialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Invoice Details</DialogTitle>
            </DialogHeader>
            {selectedInvoice && (
              <div className="space-y-6">
                {/* Invoice Image */}
                <div className="aspect-[4/3] rounded-lg bg-muted overflow-hidden">
                  <img 
                    src={selectedInvoice.imageUrl} 
                    alt="Invoice"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Invoice Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Invoice Number</p>
                    <p className="font-medium text-foreground">{selectedInvoice.invoiceNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Uploaded By</p>
                    <p className="font-medium text-foreground">{selectedInvoice.uploadedBy.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="font-medium text-foreground">₹{selectedInvoice.totalAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Points</p>
                    <p className="font-medium text-secondary">+{selectedInvoice.estimatedPoints}</p>
                  </div>
                </div>

                {/* Products */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Products</p>
                  <div className="space-y-1">
                    {selectedInvoice.products.map((product, index) => (
                      <p key={index} className="text-foreground">{product}</p>
                    ))}
                  </div>
                </div>

                {selectedInvoice.notes && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Notes</p>
                    <p className="text-foreground">{selectedInvoice.notes}</p>
                  </div>
                )}

                {/* Actions */}
                {selectedInvoice.status === 'pending' && (
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <Button variant="outline" className="flex-1 text-destructive border-destructive hover:bg-destructive/10">
                      <X className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button variant="default" className="flex-1 bg-success hover:bg-success/90">
                      <Check className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminInvoices;
