import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Trash2, Mail, Phone, Calendar, Building, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  services: string[];
  project_title: string;
  project_description: string;
  budget: string;
  timeline: string;
  existing_website: string | null;
  additional_info: string | null;
  status: string;
  created_at: string;
}

export default function AdminQuoteRequests() {
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<QuoteRequest | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch quote requests',
        variant: 'destructive',
      });
    } else {
      setRequests(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this quote request?')) return;

    const { error } = await supabase.from('quote_requests').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete quote request',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Quote request deleted successfully',
      });
      fetchRequests();
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('quote_requests')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update status',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Status updated successfully',
      });
      fetchRequests();
      setSelectedRequest(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'reviewed':
        return 'bg-blue-500/20 text-blue-400';
      case 'contacted':
        return 'bg-green-500/20 text-green-400';
      case 'closed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Quote Requests</h2>
        <p className="text-muted-foreground">Manage project quote requests</p>
      </div>

      {requests.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-12 rounded-xl text-center"
        >
          <DollarSign className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">No quote requests yet</h3>
          <p className="text-muted-foreground">Quote requests will appear here when submitted</p>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          {requests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-6 rounded-xl"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display font-semibold text-foreground">{request.project_title}</h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {request.email}
                    </span>
                    {request.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {request.phone}
                      </span>
                    )}
                    {request.company && (
                      <span className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {request.company}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {request.services.map((service) => (
                      <span key={service} className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary">
                        {service}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(request.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedRequest(request)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(request.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedRequest?.project_title}</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedRequest.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedRequest.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedRequest.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Company</p>
                  <p className="font-medium">{selectedRequest.company || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Budget</p>
                  <p className="font-medium">{selectedRequest.budget}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Timeline</p>
                  <p className="font-medium">{selectedRequest.timeline}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Services</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedRequest.services.map((service) => (
                    <span key={service} className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Project Description</p>
                <p className="mt-1">{selectedRequest.project_description}</p>
              </div>
              {selectedRequest.existing_website && (
                <div>
                  <p className="text-sm text-muted-foreground">Existing Website</p>
                  <a href={selectedRequest.existing_website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {selectedRequest.existing_website}
                  </a>
                </div>
              )}
              {selectedRequest.additional_info && (
                <div>
                  <p className="text-sm text-muted-foreground">Additional Info</p>
                  <p className="mt-1">{selectedRequest.additional_info}</p>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => handleUpdateStatus(selectedRequest.id, 'reviewed')}>
                  Mark Reviewed
                </Button>
                <Button variant="outline" onClick={() => handleUpdateStatus(selectedRequest.id, 'contacted')}>
                  Mark Contacted
                </Button>
                <Button variant="outline" onClick={() => handleUpdateStatus(selectedRequest.id, 'closed')}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
